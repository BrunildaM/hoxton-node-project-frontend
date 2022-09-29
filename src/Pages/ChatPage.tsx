import { useEffect, useState } from "react";
import { Message, User } from "../types";
import "./ChatPage.css";
import io from "socket.io-client";

type Props = {
  currentUser: User | null;
  sendMessage: (data: any) => void;
};

export default function ChatPage({ sendMessage, currentUser }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socket = io("ws://localhost:4555");
    setSocket(socket);
    console.log(socket);
    socket.on("message", (messages) => {
      setMessages(messages);
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/users")
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
              <img className="contact-avatar" src="" />
              <span className="contact-notification">
                {/* {user.messages?.[messages.length - 1].content} */}
              </span>
            </li>
          </ul>
        </div>
        <div className="conversation">
          <div className="conversation-messages">
            <div className="contact-messages">
              <ul>
                <li className="contact-message-content">
                  {messages.map((msg) => msg.content)}
                </li>
              </ul>
            </div>
            <div className="my-messages">
              <ul>
                <li className="my-message-content">
                  {messages.map((msg) => msg.content)}
                </li>
              </ul>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //@ts-ignore
              if (e.target.message.value) {
                socket.emit("message", {
                  //@ts-ignore
                  content: e.target.message.value,
                  user: currentUser,
                });
                //@ts-ignore
                e.target.message.value = "";
              }
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
