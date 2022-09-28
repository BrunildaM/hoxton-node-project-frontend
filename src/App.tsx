import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import ChatPage from "./Pages/ChatPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import { User } from "./types";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  function signIn(data: any) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
  }

  function sendMessage(data: any) {
    setCurrentUser(data.user.messages);
  }
  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:4000/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            console.log(data);
          } else {
            signIn(data.token);
          }
        });
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate replace to="/Sign-In" />} />
        <Route
          path="/chat-page"
          element={
            <ChatPage currentUser={currentUser} sendMessage={sendMessage} />
          }
        />
        <Route path="/Sign-Up" element={<SignUpPage signIn={signIn} />} />
        <Route path="/Sign-In" element={<SignInPage signIn={signIn} />} />
      </Routes>
    </div>
  );
}

export default App;
