import React, { useState } from 'react'
import io from 'socket.io-client';

function Chat({email }) {
  const socket = io.connect("http://localhost:3000");
  const [currentMessage , setCurrentMessage] = useState('');

const sendMessage = async () => {
  if (currentMessage !== '') {
    const messageData = {
      author: email,
      message: currentMessage,
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };

    await socket.emit('send_message', messageData);
    
  }
};

  // const sendMessage = async () => {
  //   if (currentMessage !== '') {
  //     const messageData = {
  //       author : email,
  //       message : currentMessage,
  //       time: new Date().getHours() + ":" + new Date().getMinutes()
  //     };

  //     await socket.emit("send_message" , messageData ) ;
      
  //   }
  // }


  return (
    <div>
      <div>
        <p>live chate</p>
      </div>
      <div></div>
      <div>
        <input type='text' placeholder='hey...' 
        onChange={(event)=>{setCurrentMessage(event.target.value)
        }}></input>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat

























// import React, { useEffect, useState } from 'react'
// import ChateListe from './ChateListe'
// import InputText from './inputText'
// import { Navigate } from 'react-router-dom';
// import io from 'socket.io-client';


// const Chat = () => {
//   const [email, setEmail] = useState(localStorage.getItem('email'));
//   const [chats, setChats] = useState([])
//   const socket = io.connect("http://localhost:3000");


//   useEffect(() => {
    
//     socket.on('connection', (chats) => {
//       setChats(chats)
//     });
//     return () => socket.disconnect();
//   }, [])

//   const sendToSocket = (chat) => {
//     socket.emit('chat', chat)
//   }

//   const addMessage = (chat) => {
//     const newChat = {
//       ...chat,
//       email: localStorage.getItem('email')
//     };
//     setChats([...chats, newChat])
//     sendToSocket([...chats, newChat])
//   }

//   const logout = () => {
//     localStorage.removeItem("email")
//     setEmail('')
//   }
//   return (
//     <div>
//       {email ? (
//         <div>
//           <div>
//             <h4>
//               username : ali
//             </h4>
//             <p onClick={logout}>
//               <strong>logout</strong>
//             </p>
//             <ChateListe chats={chats} />
//             <InputText addMessage={addMessage} />
//           </div>
//         </div>
//       ) :
//         Navigate('/login')
//       }
//     </div>
//   )
// }
// export default Chat



// // import React, { useState, useEffect } from 'react';
// // import io from 'socket.io-client';
// // const socket = io('');

// // function Chat() {
// //   const [messages, setMessages] = useState([]);
// //   const [message, setMessage] = useState('');

// //   useEffect(() => {
// //     socket.on('chat message', (msg) => {
// //       setMessages([...messages, msg]);
// //     });
// //   }, [messages]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     socket.emit('chat message', message);
// //     setMessage('');
// //   };

// //   return (
// //     <div>
// //       <ul>
// //         {messages.map((msg, index) => (
// //           <li key={index}>{msg}</li>
// //         ))}
// //       </ul>
// //       <form onSubmit={handleSubmit}>
// //         <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
// //         <button type="submit">Send</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Chat;