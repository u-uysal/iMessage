import React, { useState, useEffect } from 'react'
import "./SidebarChat.css"
import { useDispatch } from "react-redux"
import firebase from "firebase"
import { setChat } from "../features/chatSlice"
import { Avatar } from "@material-ui/core"
import * as timeago from 'timeago.js';
function SidebarChat({ id, chatName }) {
    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([])


    // display content and time of the last message
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


    // delete individual channel
    const handleClick = (e) => {
        const targetId = e.target.id;
        const deleteMessage = firebase.database().ref("chats").child(targetId);
        deleteMessage.remove();
    }



    // rename individual channel
    const renameHandler = (e) => {
        const targetId = e.target.id;
        const newName = prompt("New Name", chatName)
        const getOldName = firebase.database().ref("chats").child(targetId);
        getOldName.update({
            chatName: newName
        })

    }


    // use timeago package to learn when tis message was sent
    const timestamp = chatInfo ? timeago.format(chatInfo.created) : ""


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
                    <div className="sidebarChat-hover">
                        <div className="tooltip "><span id={id} onClick={handleClick} className="sidebarChat__delete"></span><span class="tooltiptext">Delete</span></div>
                        <div className="tooltip "><span id={id} onClick={renameHandler} className="sidebarChat__rename"></span><span class="tooltiptext">Rename</span></div>
                    </div>


                </h3>
                <p>{chatInfo ? chatInfo.message : ""}</p>
                <small>{chatInfo ? timestamp : ""}</small>

            </div>
        </div>
    )
}

export default SidebarChat