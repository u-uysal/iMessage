import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from "react-redux"
import { selectUser } from '../features/userSlice'
import "./Message.css"

function Message({ item }) {

    const user = useSelector(selectUser)
    // decide who is writing message
    const isUser = user.email === item.email
    const styleForName = isUser ? "own" : "guest";


    //convert to miliseconds to formal date format
    function msToTime(duration) {

        if (duration) {
            let seconds = Math.floor((duration / 1000) % 60)
            let minutes = Math.floor((duration / (1000 * 60)) % 60)
            let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            return (hours + 1) + ":" + minutes + ":" + seconds;
        }
    }

    // specify when the message was sent
    const timestamp = item ? msToTime(item.created) : ""


    return (
        <div className={`message user-${styleForName}`}>
            {isUser ? null : <Avatar src={item.photo} />}
            <p>{item.message}</p>
            <small>{timestamp}</small>
        </div>
    )
}

export default Message
