import React, { useState, useEffect } from 'react'
import "./SidebarChat.css"
import { useDispatch } from "react-redux"
import { AiFillDelete } from "react-icons/ai";
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

    const handleClick = (e) => {
        const targetId = e.target.id;
        const deleteMessage = firebase.database().ref("chats").child(targetId);
        deleteMessage.remove();
    }
    const updateHandler = (e) => {
        const targetId = e.target.id;
        const newName = prompt("New Name", chatName)
        const getOldName = firebase.database().ref("chats").child(targetId);
        getOldName.update({
            chatName: newName
        })

    }
    return (
        <div onClick={() => {
            dispatch(setChat({
                chatId: id,
                chatName: chatName
            }))
        }} className="sidebarChat">
            <Avatar src={chatInfo ? chatInfo.photo : null} />
            <div className="sidebarChat__info">
                <h3 >{chatName}
                    <span id={id} onClick={handleClick} className="sidebarChat__delete">Delete</span>
                    <span id={id} onClick={updateHandler} className="sidebarChat__delete">Update</span>
                </h3>
                <p>{chatInfo ? chatInfo.message : ""}</p>
                <small>timestamp</small>
            </div>
        </div>
    )
}

export default SidebarChat