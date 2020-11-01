import React, { useState, useEffect } from 'react'
import "./SidebarChat.css"
import { useDispatch } from "react-redux"

import firebase from "firebase"

import { setChat } from "../features/chatSlice"
import { Avatar } from "@material-ui/core"

function SidebarChat({ id, chatName }) {
    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([])

    useEffect(() => {
        if (id) {
            const downloadMessage = firebase.database().ref("chats").child(id);
            downloadMessage.on("value", (snapshot) => {
                const allMessages = snapshot.val()
                const messageList = [];
                for (let id in allMessages) {
                    messageList.push({ id, ...allMessages[id] });
                }
                const lastMessageIndex = messageList.length - 2
                const lastMessage = messageList[lastMessageIndex]

                setChatInfo(lastMessage)
            })
        }
    }, [id])
    return (
        <div onClick={() => {
            dispatch(setChat({
                chatId: id,
                chatName: chatName
            }))
        }} className="sidebarChat">
            <Avatar src={chatInfo.photo} />
            <div className="sidebarChat__info">
                <h3>{chatName}</h3>
                <p>{chatInfo.message}</p>
                <small>timestamp</small>
            </div>
        </div>
    )
}

export default SidebarChat