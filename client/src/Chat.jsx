import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Chat from './Login';
// import { useParams, useLocation } from 'react-router-dom';
// import io from 'socket.io-client';
import io from 'socket.io-client';
import { useContext } from 'react';
import EmailContext from './UserContext';


 function Chat () {
    const { email , room } = useContext(EmailContext);
    const socket = io.connect("http://localhost:3000");

    const[currentMessage , setCurrentMessage] = useState("")
   

      const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room:room,
        author: email,
        message: currentMessage,
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      };

      try {
        await socket.emit('send_message', messageData);
        setCurrentMessage(''); 
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(()=>{
    socket.on("recive_message" , (data)=>{
        console.log(data);
    })
  } , [socket])
  

   
  return (
    <div className='chat-window'>
        <div>
            <p>live chate</p>
        </div>
        <div></div>
        <div>
            <input
            onChange={(event)=>{
                setCurrentMessage(event.target.value)
            }}
             type='text'
              placeholder='hiii'
              ></input>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat;
