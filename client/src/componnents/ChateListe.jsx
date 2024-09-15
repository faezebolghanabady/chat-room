import React from 'react'

function ChateListe({ chats }) {
    const email = localStorage.getItem('email')
    function SendChate({ message, email }) {
        return (
            <div>
                <p className='border'>
                    <strong>{email}</strong>
                    {message}
                </p>
            </div>
        )
    }

    function ReciverChate({ message, email }) {
        return (
            <div>
                <p>
                    <strong>{email}</strong>
                    {message}
                </p>
            </div>
        )
    }
    return (
        <div>
            {
                chats.map((chat, index) => {
                    if (chat.email === email) {
                        return <SendChate
                            key={index}
                            message={chat.message}
                            email={chat.email}
                        />
                    }
                    return <ReciverChate
                        key={index}
                        message={chat.message}
                        email={chat.email}
                    />
                })
            }

            <ReciverChate />
        </div>
    )
}

export default ChateListe