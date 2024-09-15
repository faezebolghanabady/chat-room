import React, { useEffect, useState } from 'react'
import ChateListe from './ChateListe'
import InputText from './inputText'
import { Navigate } from 'react-router-dom';
import io from 'socket.io-client';

const Chat = () => {
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [chats , setChats ] = useState([])
  useEffect(()=>{
    const socket = io('http://localhost:3000');
    socket.on('chat' , (chats)=>{
      setChats(chats)
    })
  },[])

  const sendToSocket = (chat) => {
    socket.emit('chat' ,chat)
  }

  const addMessage = (chat) =>{
    const newChat ={
      ...chat,
      email:localStorage.getItem('email')
    };
    setChats([...chats , newChat])
    sendToSocket([...chats , newChat])
  }

  const logout = () => {
    localStorage.removeItem("email")
    setEmail('')
  }
  return (
    <div>
      {email?(
           <div>
           <div>
             <h4>
               username : ali
             </h4>
             <p onClick={logout}>
               <strong>logout</strong>
             </p>
             <ChateListe chats={chats} />
             <InputText addMessage={addMessage}/>
           </div>
         </div>
      ):
      Navigate('/login')
    }
     
    </div>
  )
}

export default Chat