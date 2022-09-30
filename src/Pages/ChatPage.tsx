import { useEffect, useState } from "react";
import { Message, User } from "../types";
import "./ChatPage.css";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

type Room = {
  id: number;
  messages: Message[];
  participant: User;
  user: User;
};

type Props = {
  currentUser: User | null;
  logOut: () => void;
};

export default function ChatPage({ logOut, currentUser }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [socket, setSocket] = useState<any>(null);

  const params = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUser === null) navigate("/");
  // }, [currentUser, navigate]);

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

  // useEffect(() => {
  //   if (currentUser === null) return;

  //   fetch(`http://localhost:5000/rooms/${currentUser.id}`)
  //     .then((resp) => resp.json())
  //     .then((conversations) => setRooms(conversations));
  // }, [currentUser]);

  // const usersWithNoConv = users.filter((user) => {
  //   if (currentUser && user.id === currentUser.id) return false;

  //   for (const room of rooms) {
  //     if (room.user.id === user.id) return false;
  //     if (room.participant.id === user.id) return false;
  //   }
  //   return true;
  // });

  

  function createRoom (participantId: number) {
    if (currentUser === null) return <h1>Not signed in...</h1>

    fetch(`http://localhost:5000/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: currentUser.id,
        participantId: participantId
      })
    })
      .then(resp => resp.json())
      .then(newRoom => {
        setRooms([...rooms, newRoom])
      })
  }



  return (
    <div className="chat-page">
      <header className="chat-header">
          <img
              className="logo"
              src="https://play-lh.googleusercontent.com/jI-MNIYkb1QXGrgNoSiuRn8PdBRrqd-cW3krfuhoSr0HH-w-Gu40C0BFwlNfYekhMC4"
              alt=""
            />
           <h1>HiApp</h1>     
           <aside>
        <header className='panel'>
          <img
            className='avatar'
            width='50'
            height='50'
            src={currentUser?.avatar}
            alt=''
          />
          <h3>{currentUser?.firstName}</h3>
          <button onClick={() => logOut()}>LOG OUT</button>
        </header>
          <form>
            <input
              type="text"
              name=""
              id=""
              placeholder="search conversation"
            />
          </form> 


          <ul>
         
          {rooms.map(room => {
             const friendId =
             currentUser?.id === room.user.id
               ? room.participant.id
               : room.user.id
               

           const friend = users.find(user => user.id === friendId)
          

            return (
              <li key={room.id}>
                <button
                  className='chat-button'
                  onClick={() => navigate(`/chat-page/${room.id}`)}
                >
                  <img
                    className='avatar'
                    height='50'
                    width='50'
                    alt=''
                    src={friend?.avatar}
                  />
                  <div>
                    <h3>
                      {friend?.firstName} {friend?.lastName}
                    </h3>
                    <p>{room.messages[messages.length -1].content}</p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>


          </aside>
             
      </header>
      <main className="chat-main">
        {/* <div className="contacts-msg-list">
          <h3>CHATS</h3>
          <ul className="contacts-list">
            <li className="contact-item">
              <img className="contact-avatar" src="" />
              <span className="contact-notification">
                {user.messages?.[messages.length - 1].content}
              </span>
            </li>
          </ul>
        </div> */}

        {params.roomId ? (
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
        ) : null}
      </main>
    </div>
  );
}
