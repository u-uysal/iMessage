import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from "react-redux"
import { selectUser } from '../features/userSlice'
import "./Message.css"

function Message({ item }) {

    const user = useSelector(selectUser)

    const isUser = user.email === item.email
    const styleForName = isUser ? "own" : "guest";
    return (
        <div className={`message user-${styleForName}`}>
            {isUser ? null : <Avatar src={item.photo} />}
            <p>{item.message}</p>
            <small>timestamp</small>
        </div>
    )
}

export default Message
