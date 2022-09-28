import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import ChatPage from "./Pages/ChatPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import { User } from "./types";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function token(id: number) {}
  function signIn(data: any) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
  }
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate replace to="/Sign-In" />} />
        {currentUser && (
          <Route
            path="/chat-page"
            element={<ChatPage currentUser={currentUser} />}
          />
        )}{" "}
        (
        <>
          <Route path="/Sign-Up" element={<SignUpPage signIn={signIn} />} />
          <Route path="/Sign-In" element={<SignInPage signIn={signIn} />} />
        </>
        )
      </Routes>
    </div>
  );
}

export default App;
