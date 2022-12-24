import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/UserPage";

import "./index.scss";
import userStore from "./stores/userStore";
import chatStore from "./stores/chatStore";

import {
  IMessage
} from "./interfaces/chatStore.interface";

import notificationSound from "./assets/Not.mp3";
import { IUser } from "./interfaces/userStore.interface";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  const storeUser = userStore();
  const storeChat = chatStore();

  const audioPlayer = new Audio(notificationSound);

  useEffect(() => {
    if (storeUser.socket) {
      storeUser.socket.on("messageReceived", (mess: IMessage) => {
        const chat = storeUser.findChat(mess.chatId);
        storeChat.receivedMessage(mess);
        storeChat.openChat(chat);

        if (mess.senderId !== storeUser.id) audioPlayer.play();
      });

      storeUser.socket.on("cancelFriendRequest", (user: any) => {
        storeUser.removeFriendRequest(user.friendId)
      });

      storeUser.socket.on("gotFriendRequest", (user: IUser) => {
        storeUser.addFriendRequest(user)
      });

      storeUser.socket.on("acceptFriendship", (user: IUser) => {
        storeUser.addFriend(user)

      });

      storeUser.socket.on("removeFriendship", (user: string) => {
        storeUser.removeFriend(user)
      });

    }
    return () => {
      storeUser.socket?.off('messageReceived');
      storeUser.socket?.off('gotFriendRequest');
      storeUser.socket?.off('cancelFriendRequest');
    };
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/:userId" element={<ProfilePage />} />
        <Route path="/chats" element={<ChatPage/>} />
      </Routes>
    </BrowserRouter>
  )
};
ReactDOM.render(<App />, document.getElementById("app"));
