import React, { useState } from 'react'
import Message from "./Message"

import "./Chat.css"
import { useSelector } from 'react-redux'
import { selectChatName, selectChatID } from '../features/chatSlice'

function Chat() {

    const [input, setInput] = useState("")

    const [messages, setMessages] = useState([])

    const channelName = useSelector(selectChatName)
    const chatId = useSelector(selectChatID)

    const sendMessage = (e) => {
        e.preventDefault()

        //firebase

        setInput("")
    }

    const inputHandler = (e) => {
        setInput(e.target.value)
    }
    return (
        <div className="chat">
            {/* CHat Header */}
            <div className="chat__header">
                <h4>To: <span className="chat__name">{channelName}</span></h4>
                <strong>Details</strong>
            </div>

            {/* CHat Messages */}
            <div className="chat__messages">
                <Message />
            </div>


            {/* CHat Input */}

            <div className="chat__input">
                <form>
                    <input type="text" placeholder="Send messages" onChange={inputHandler} value={input} />
                    <button onClick={sendMessage}>Send</button>
                </form>

            </div>
        </div>
    )
}

export default Chat