import { SetStateAction, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { Message, Room, User } from '../types'
import RoomPage from './RoomPage'


type Props = {
    currentUser: User | null
    users: User []
    modal: string
    setModal: React.Dispatch<React.SetStateAction<string>>
    logOut: () => void
}


function Main ({currentUser, users, modal, setModal, logOut}: Props) {
  const [rooms, setRooms] = useState<Room[]>([])
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [socket, setSocket] = useState<any>(null);
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser === null) navigate('/')
  }, [currentUser, navigate])

  useEffect(() => {
    if (currentUser === null) return

    fetch(`http://localhost:5000/rooms`,
    {
        headers: {
            Authorization: localStorage.token
        }
    }
    )
      .then(resp => resp.json())
      .then(rooms => {
          if(rooms.error) return
          setRooms(rooms)
        
        })
  }, [currentUser])

//   useEffect(() => {
//     const socket = io("ws://localhost:4555");
//     setSocket(socket);
//     console.log(socket);
//     socket.on("message", (messages: SetStateAction<Message[]>) => {
//       setMessages(messages);
//     });
//   }, []);

  const usersWithNoConversation = users.filter(user => {
    
    if (currentUser && user.id === currentUser.id) return false
    for (const room of rooms) {
      if (room.userId === user.id) return false
      if (room.participantId === user.id) return false
    }
    return true
  })


console.log("rooms:", rooms)
  function createRoom (participantId : number) {
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
        setModal('')
      })
  }

  if (currentUser === null) return <h1>Please sign in...</h1>

  return (
    <div className='main-wrapper'>
      <aside>
        <header className='panel'>
          <img
            className='avatar'
            width='50'
            height='50'
            src={currentUser.avatar}
            alt=''
          />
          <h3>{currentUser.firstName}</h3>
          <button onClick={() => logOut()}>LOG OUT</button>
        </header>

      
        <form className='aside__search-container'>
          <input
            type='search'
            name='messagesSearch'
            placeholder='Search chats'
          />
        </form>

        <ul>
          <li>
            <button
              className='chat-button'
              onClick={() => {
                setModal('start-chat')
              }}
            >
              <div>
                <h3>+ New Room</h3>
              </div>
            </button>
          </li>

          {rooms.map(room => {
            const participantId =
              currentUser.id === room.userId
                ? room.participantId
                : room.userId

            const participant = users.find(user => user.id === participantId)

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
                          src= "https://www.freeiconspng.com/thumbs/live-chat-icon/live-chat-icon-27.png"
                        />
                        <div>
                          <h3>
                            Contact
                          </h3>
                          <p>CLick to check messages</p>
                        </div>
                    
                   
                
                </button>
              </li>
            )
          })}
        </ul>
      </aside>

  

      {params.roomId ? (
        <RoomPage currentUser={currentUser} />
      ) : null}

      {modal === 'start-chat' ? (
        <div className='modal-wrapper'>
          <div className='modal'>
            <button className='close-modal' onClick={() => setModal('')}>
              X
            </button>
            <h1>Start chat</h1>
            
            {usersWithNoConversation.length > 0 ? (
              <ul>
                {usersWithNoConversation.map(user => (
                  <li key={user.id}>
                    <button
                      className='chat-button'
                      onClick={() => {
                        createRoom(user.id)
                      }}
                    >
                      <img
                        className='avatar'
                        height='50'
                        width='50'
                        alt=''
                        src={user.avatar}
                      />
                      <div>
                        <h3>
                          {user.firstName} {user.lastName}
                        </h3>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Make new friends</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Main

