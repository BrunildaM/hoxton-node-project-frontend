import { useEffect, useState } from "react";
import { User } from "../types";
import "./ChatPage.css";

export default function ChatPage(currentUser: User) {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((resp) => resp.json())
      .then((usersFromServer) => setUsers(usersFromServer));
  }, []);

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div>
          <h1>HiApp</h1>

          <form action="">
            <input
              type="text"
              name=""
              id=""
              placeholder="search conversation"
            />
          </form>
        </div>
      </header>
      <main className="chat-main">
        <div className="contacts-msg-list">
          <h3>CHATS</h3>
          <ul className="contacts-list">
            <li className="contact-item">
              <img
                className="contact-avatar"
                src="https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?w=2000"
                alt=""
              />
              <span className="contact-message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. commodi
                fugiat non praesentium magni sequi? Rerum!
              </span>
            </li>
          </ul>
        </div>
        <div className="conversation">
          <div className="conversation-messsages">
            <ul>
              <li></li>
            </ul>
          </div>
          <form className="conversation-form" action="">
            <input type="text" placeholder="Say Hi" />
          </form>
        </div>
      </main>
    </div>
  );
}
