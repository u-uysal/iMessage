import React from 'react'
import SidebarChat from "./SidebarChat"
import { Avatar, IconButton } from "@material-ui/core"
import "./Sidebar.css"
import SearchIcon from "@material-ui/icons/Search"
import RateReviewIcon from '@material-ui/icons/RateReview';
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

function Sidebar() {
    const user = useSelector(selectUser)
    console.log(user.photo)
    return (
        <div className='sidebar'>

            <div className="sidebar__header">
                <Avatar src={user.photo} className='sidebar__avatar' />
                <div className="sidebar__input">
                    <SearchIcon />
                    <input placeholder="search" />
                </div>
                <IconButton variant='outlined' className="sidebar__inputButton"><RateReviewIcon /></IconButton>
            </div>
            <div className="sidebar__chat">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar