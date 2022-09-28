import { useEffect, useState } from "react";
import { Message, User } from "../types";
import "./ChatPage.css";

export default function ChatPage(currentUser: User, sendMessage: any) {
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
              <span className="contact-notification">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. commodi
                fugiat non praesentium magni sequi? Rerum!
              </span>
            </li>
          </ul>
        </div>
        <div className="conversation">
          <div className="conversation-messages">
            <div className="contact-messages">
              <ul>
                <li className="contact-message-content">sender messages</li>
              </ul>
            </div>
            <div className="my-messages">
              <ul>
                <li className="my-message-content">receiver messages</li>
              </ul>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetch("http://localhost:4000/post-message", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  // @ts-ignore
                  message: e.target.message.value,
                }),
              })
                .then((resp) => resp.json())
                .then((data) => {
                  // data = {user,token}
                  if (data.error) {
                    alert(data.error);
                  } else {
                    sendMessage(data);
                  }
                });
            }}
            className="conversation-form"
            action=""
          >
            <button>Send</button>
            <input type="text" placeholder="Say Hi" name="message" />
          </form>
        </div>
      </main>
    </div>
  );
}
