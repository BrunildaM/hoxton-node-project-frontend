import { Message } from "../types"

type Props = {
    message: Message
    outgoing: any
}


function MessageData ({ message, outgoing }: Props) {
    return (
      <li className={outgoing ? 'outgoing' : 'incoming'}>
        <p>{message.content}</p>
      </li>
    )
  }
  
  export default MessageData