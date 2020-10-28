import React from 'react'
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core"

function SidebarChat({ id, chatName }) {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h3>{chatName}</h3>
                <p>Last Message sent</p>
                <small>timestamp</small>
            </div>
        </div>
    )
}

export default SidebarChat