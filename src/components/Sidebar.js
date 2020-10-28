import React, { useEffect, useState } from 'react'
import SidebarChat from "./SidebarChat"
import { Avatar, IconButton } from "@material-ui/core"
import "./Sidebar.css"
import SearchIcon from "@material-ui/icons/Search"
import RateReviewIcon from '@material-ui/icons/RateReview';
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import db, { auth } from "../firebase"
import firebase from "firebase"

function Sidebar() {
    const user = useSelector(selectUser)
    const [chats, setChats] = useState([])
    useEffect(() => {

        const downloadChatName = firebase.database().ref("chats");
        downloadChatName.on("value", (snapshot) => {
            const allName = snapshot.val()
            const nameList = [];
            for (let id in allName) {
                nameList.push({ id, ...allName[id] });
            }

            setChats(nameList)

        })
    }, [])

    const addChat = () => {
        const chatName = prompt("Please enter a chat name");

        if (chatName) {
            const uploadMessage = firebase.database().ref("chats");
            const addChatName = {
                chatName: chatName,
            }

            uploadMessage.push(addChatName);

        } else {
            window.location.reload()
        }

    }

    return (
        <div className='sidebar'>

            <div className="sidebar__header">
                <Avatar onClick={() => auth.signOut()} src={user.photo} className='sidebar__avatar' />
                <div className="sidebar__input">
                    <SearchIcon />
                    <input placeholder="search" />
                </div>
                <IconButton variant='outlined' className="sidebar__inputButton"><RateReviewIcon onClick={addChat} /></IconButton>
            </div>
            <div className="sidebar__chat">
                {chats.map((chat) => (
                    <SidebarChat key={chat.id} id={chat.id} chatName={chat.chatName} />
                ))}


            </div>
        </div>
    )
}

export default Sidebar