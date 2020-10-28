import { Avatar } from '@material-ui/core'
import React from 'react'
import "./Message.css"

function Message({ id, contents }) {
    return (
        <div className="message">
            <Avatar />
            <p>message</p>
            <small>timestamp</small>
        </div>
    )
}

export default Message
