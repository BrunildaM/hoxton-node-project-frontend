import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MessageData from '../components/MessageData'
import { Room, User } from '../types'



type Props = {
    currentUser: User
}

function RoomPage ({ currentUser }: Props) {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)

  const params = useParams()

  function createMessage (content: string) {


    fetch(`http://localhost:5000/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: currentUser.id,
        content: content,
        roomId: Number(params.roomId)
      })
    })
      .then(resp => resp.json())
      .then(newMessage => {
        const currentRoomCopy = JSON.parse(
          JSON.stringify(currentRoom)
        )
        currentRoomCopy.messages.push(newMessage)
        setCurrentRoom(currentRoomCopy)
      })
  }


  useEffect(() => {
    if (params.roomId) {
      fetch(`http://localhost:5000/rooms/${params.roomId}`)
        .then(resp => resp.json())
        .then(room => setCurrentRoom(room))
    }
  }, [params.roomId])

  if (currentRoom === null) return <h1>Loading...</h1>

  return (
    <main className='conversation'>
      <header className='panel'></header>

      <ul className='conversation__messages'>
        {currentRoom.messages.map(message => (
          <MessageData
            key={message.id}
            message={message}
            outgoing={message.userId === currentUser.id}
          />
        ))}
      </ul>

      <footer>
        <form
          className='panel conversation__message-box'
          onSubmit={e => {
            e.preventDefault()
            // @ts-ignore
            createMessage(e.target.text.value)
            // @ts-ignore
            e.target.reset()
          }}
        >
          <input
            type='text'
            placeholder='Type a message'
            name='text'
            required
            autoComplete='off'
          />
          <button type='submit'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <path
                fill='currentColor'
                d='M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z'
              ></path>
            </svg>
          </button>
        </form>
      </footer>
    </main>
  )
}

export default RoomPage