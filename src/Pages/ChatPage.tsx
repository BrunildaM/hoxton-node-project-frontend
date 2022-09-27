import "./ChatPage.css";
export default function ChatPage() {
  return (
    <div className="chat-page">
      <header className="chat-header">
        <div>
          <h1>Hi App</h1>
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
          <ul>
            <li>
              <img src="" alt="" />
              <span></span>
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
