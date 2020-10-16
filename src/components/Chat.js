import React, { useState } from 'react'
import { IconButton } from "@material-ui/core"
import MicNoneIcon from "@material-ui/icons/MicNone"
import "./Chat.css"

function Chat() {

    const [input, setInput] = useState("")
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
                <h4>To: <span className="chat__name">Channel Name</span></h4>
                <strong>Details</strong>
            </div>

            {/* CHat Messages */}

            <div className="chat_messages"></div>
            {/* CHat Input */}

            <div className="chat__input">
                <form>
                    <input type="text" placeholder="Send messages" onChange={inputHandler} value={input} />
                    <button onClick={sendMessage}>Send</button>
                </form>
                <IconButton>
                    <MicNoneIcon className="chat__mic" />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat