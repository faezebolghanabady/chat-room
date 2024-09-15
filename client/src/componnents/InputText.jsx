import React, { useState } from 'react'

function InputText({ addMessage }) {
    const [message, setMessage] = useState();
    const sendMessage = () => {
        addMessage({message})
        setMessage("")
    }
    return (
        <div>
            <textarea
             name='message'
             id='message' 
             rows="6" 
            placeholder='Input message ...' 
            onChange={(e)=>setMessage(e.target.value)}></textarea>
            <button onClick={()=>sendMessage}>send</button>
        </div>
    )
}

export default InputText