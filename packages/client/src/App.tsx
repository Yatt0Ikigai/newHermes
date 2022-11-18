import React, { useEffect } from "react";
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

const App = () => {
  const storeUser = userStore();
  const storeChat = chatStore();

  useEffect(() => {
    if (storeUser.socket)
      storeUser.socket.on("messageReceived", (mess: IMessage) => {
        const chat = storeUser.findChat(mess.chatId);
        storeChat.receivedMessage(mess);
        storeChat.openChat(chat);
      })
    return () => {
      storeUser.socket?.off('messageReceived');
    };
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/:userId" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
};
ReactDOM.render(<App />, document.getElementById("app"));
