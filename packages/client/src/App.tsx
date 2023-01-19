import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/UserPage";

import "./index.scss";

import storeUser from "./stores/userStore";
import storeChat from "./stores/chatStore";
import storeFriend from "./stores/friendStore";

import {
  IMessage
} from "./interfaces/chatStore.interface";

import notificationSound from "./assets/Not.mp3";
import { IUser } from "./interfaces/userStore.interface";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import FriendsPage from "./pages/FriendsPage";
import SettingsPage from "./pages/SettingsPage";
import { trpc } from "./utils/trpc";
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const App = () => {
  const userStore = storeUser();
  const chatStore = storeChat();
  const friendStore = storeFriend();

  const audioPlayer = new Audio(notificationSound);

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/trpc',
          // optional
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    }),
  );

  useEffect(() => {
    const socket = userStore.socket;
    if (socket) {
      socket.on("messageReceived", (mess: IMessage) => {
        chatStore.receiveMessage(mess);
        if (mess.senderId !== userStore.id) audioPlayer.play();
      });

      socket.on("cancelFriendRequest", (user: any) => {
        friendStore.removeFriendRequest(user.friendId)
      });

      socket.on("gotFriendRequest", (user: IUser) => {
        friendStore.addFriendRequest(user)
      });

      socket.on("acceptFriendship", (user: IUser) => {
        friendStore.addFriend(user)

      });

      socket.on("removeFriendship", (user: string) => {
        friendStore.removeFriend(user)
      });

    }
    return () => {
      userStore.socket?.off('messageReceived');
      userStore.socket?.off('gotFriendRequest');
      userStore.socket?.off('cancelFriendRequest');
    };
  })

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/chats" element={<ChatPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider >
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
