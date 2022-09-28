import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import ChatPage from "./Pages/ChatPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  function token(id:number){


  }
  function signIn(data: any) {
    fetch(`http://localhost:4000/users`)
      .then((resp) => resp.json())
      .then((usersFromServer) => {
        setCurrentUser(usersFromServer);
        const clonedUsers = structuredClone(users);
        const filteredUser = clonedUsers.find((user: any) => {
          user.email === data.email && user.password === data.password;
        });
        setCurrentUser(filteredUser);
        if (currentUser !== null && currentUser !== undefined) {
          localStorage.id = currentUser.id;
          navigate(`/chat-page`);
        }
      });
  }
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate replace to="/Sign-In" />} />
        {currentUser && <Route path="/chat-page" element={<ChatPage />} />} (
        <>
          <Route path="/Sign-Up" element={<SignUpPage signIn={signIn}/>} />
          <Route path="/Sign-In" element={<SignInPage />} />
        </>
        )
      </Routes>
    </div>
  );
}

export default App;
