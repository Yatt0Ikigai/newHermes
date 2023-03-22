import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import ProfilePage from "./pages/UserPage/UserPage";

import "./index.scss";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { trpc } from "./utils/trpc";
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { io } from "socket.io-client";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/trpc',
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SocketWraper />
      </QueryClientProvider>
    </trpc.Provider >
  );
};


const socket = io('http://localhost:8000', {
  withCredentials: true,
});

export { socket };

const SocketWraper = () => {
  const { data } = trpc.users.getSelfInfo.useQuery()
  useEffect(() => {
    if (data?.status === "success") {
      socket.emit('handshake');
    }
  }, [data])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />}>
          <Route path="/profile/:userId/info" />
          <Route path="/profile/:userId/friends" />
          <Route path="/profile/:userId/pictures" />
        </Route>
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}


ReactDOM.render(<App />, document.getElementById("app"));
