import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import ChatPage from "./Pages/ChatPage";
import { LogIn } from "./Pages/LogIn";
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
      fetch("http://localhost:5000/validate", {
        headers: {
          "Authorization": localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            console.log(data);
          } else {
            signIn(data);
          }
        });
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate replace to="/LogIn" />} />
        
          <Route
            path="/chat-page"
            element={<ChatPage sendMessage={sendMessage} />}
          />
       
        
            <Route path="/LogIn" element={<LogIn signIn={signIn} />} />
        
        <Route path="/Sign-Up" element={<SignUpPage signIn={signIn} />} />
      </Routes>
    </div>
  );
}

export default App;
