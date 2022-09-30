import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import ChatPage from "./Pages/ChatPage";
import { LogIn } from "./Pages/LogIn";
import Main from "./Pages/Main";
import NotFound from "./Pages/NotFound";
import SignUpPage from "./Pages/SignUpPage";
import { User } from "./types";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [modal, setModal] = useState('')
  const [users, setUsers] = useState([])

  function signIn(data: any) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
  }

  function sendMessage(data: any) {
    setCurrentUser(data.user.messages);
  }

  function logOut () {
    setCurrentUser(null)
  }

  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:5000/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            // console.log(data);
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
          element={ <Main
            modal={modal}
            currentUser={currentUser}
            logOut={logOut}
            users={users}
            setModal={setModal}
          />
            // <ChatPage currentUser={currentUser} logOut={logOut} />
          }
        />
        <Route
          path="/chat-page/:roomId"
          element={
            <Main
              modal={modal}
              currentUser={currentUser}
              logOut={logOut}
              users={users}
              setModal={setModal}
            />
            // <ChatPage currentUser={currentUser} logOut={logOut} />
          }
        />
        <Route path="/LogIn" element={<LogIn signIn={signIn} />} />
        <Route path="/Sign-Up" element={<SignUpPage signIn={signIn} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
