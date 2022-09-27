import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import ChatPage from "./Pages/ChatPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate replace to="/Sign-In" />} />
        <Route path="/Sign-Up" element={<SignUpPage />} />
        <Route path="/Sign-In" element={<SignInPage />} />
        <Route path="/chat-page" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
