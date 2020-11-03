import React, { useEffect, useState } from 'react'
import SidebarChat from "./SidebarChat"
import { Avatar } from "@material-ui/core"
import "./Sidebar.css"
import SearchIcon from "@material-ui/icons/Search"
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from "../firebase"
import firebase from "firebase"

function Sidebar() {
    const user = useSelector(selectUser)
    const [chats, setChats] = useState([])
    const [query, setQuery] = useState("")

    //retrive all channels names
    useEffect(() => {

        const downloadChatName = firebase.database().ref("chats")
        downloadChatName.on("value", (snapshot) => {
            const allName = snapshot.val()
            const nameList = [];
            for (let id in allName) {
                nameList.push({ id, ...allName[id] });
            }

            setChats(nameList)

        })
    }, [])

    // add new channel
    const addChat = () => {
        const chatName = prompt("Please enter a chat name");

        if (chatName) {
            const uploadChatName = firebase.database().ref("chats")
            const addChatName = {
                chatName: chatName,
            }

            uploadChatName.push(addChatName);

        } else {
            window.location.reload()
        }

    }

    // search filter

    const searchArray = chats.filter(chat => chat.chatName.includes(query) === true)


    const handleChange = (event) => {
        setQuery(event.target.value)
    }
    return (
        <div className='sidebar'>

            <div className="sidebar__header">
                <Avatar onClick={() => auth.signOut()} src={user.photo} className='sidebar__avatar' />
                <div className="sidebar__input">
                    <SearchIcon />
                    <input value={query} onChange={handleChange} placeholder="search" />
                </div>
                <div className="tooltip-create"><span onClick={addChat} className="sidebar__create_channel"></span><span className="tooltip-createtext">Create New Channel</span></div>
                <div className="tooltip-create"><span onClick={() => auth.signOut()} className="sidebar__sign_out"></span><span className="tooltip-createtext">Sign Out</span></div>

            </div>
            <div className="sidebar__chat">
                {searchArray.length === 0 ? <p className="sidebar__noMatch">No match</p> : searchArray.map((chat) => (
                    <SidebarChat key={chat.id} id={chat.id} chatName={chat.chatName} />
                ))}


            </div>
        </div>
    )
}

export default Sidebar