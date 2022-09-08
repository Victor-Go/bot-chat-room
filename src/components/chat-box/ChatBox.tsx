import Chat, { ChatModel, MessageDirection } from '../chat/Chat'
import './ChatBox.scss'

function ChatBox() {
  // Mock data.
  let chats: ChatModel[] = [
    {
      message: 'Hello, this is a single chat from me.',
      sender: 'Victor',
      direction: MessageDirection.FROM_ME,
    },
    {
      message: 'Hello, this is a single chat from others.',
      sender: 'Lyn',
      direction: MessageDirection.FROM_OTHERS,
    }
  ]

  for (let i = 0; i < 100; i++) {
    chats.push(i % 2 ? chats[0] : chats[1])
  }

  return (
    <div className='chat-box'>
      <div className='chat-box__title'>Chat Room</div>
      <div className='chats'>
        {
          chats.map((chat, index) => (
            <Chat key={index} direction={chat.direction} sender={chat.sender} message={chat.message} />
          ))
        }
      </div>
      <div className='textbox'>
        <input type='text' />
        <div className='textbox__submit'>
          <svg className="textbox__submit_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2532" width="200" height="200"><path d="M1009.19461 5.118447a32.054274 32.054274 0 0 0-35.125341 0.255922l-959.708789 639.805859a31.830341 31.830341 0 0 0-14.043738 29.942914 31.830341 31.830341 0 0 0 19.929952 26.360002l250.292052 100.161607 117.692288 205.953506a31.990293 31.990293 0 0 0 27.415681 16.123108H415.998608c11.228593 0 21.657428-5.950194 27.415681-15.547283l66.443839-110.782384 310.14589 124.026365a31.734371 31.734371 0 0 0 27.543642-1.855437c8.445437-4.734563 14.23568-13.05204 15.867185-22.617137l159.951465-959.708788A32.054274 32.054274 0 0 0 1009.19461 5.118447zM100.446359 664.662317L841.821398 170.3803 302.784962 747.389214c-2.847136-1.695486-5.374369-3.934806-8.509418-5.182427l-193.829185-77.54447z m225.627536 105.216073l-0.223932-0.319903L931.842082 120.955298 415.230841 925.895049l-89.156946-156.016659z m480.750122 177.322194l-273.229092-109.278841a63.564712 63.564712 0 0 0-19.929952-3.806845L934.401305 181.896806l-127.577288 765.303778z" fill="#ffffff" p-id="2533"></path></svg>
        </div>
      </div>
    </div>
  )
}

export default ChatBox