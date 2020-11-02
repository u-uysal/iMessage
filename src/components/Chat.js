import React, { useState, useEffect } from 'react'
import Message from "./Message"
import firebase from "firebase"
import "./Chat.css"
import { useSelector } from 'react-redux'
import { selectChatName, selectChatID } from '../features/chatSlice'
import { selectUser } from '../features/userSlice'

function Chat() {
    const user = useSelector(selectUser)

    const [input, setInput] = useState("")

    const [messages, setMessages] = useState([])

    const channelName = useSelector(selectChatName)
    const chatId = useSelector(selectChatID)


    // retrieve all messages to display
    useEffect(() => {
        if (chatId) {
            const downloadMessage = firebase.database().ref("chats").child(chatId);
            downloadMessage.on("value", (snapshot) => {
                const allMessages = snapshot.val()
                const messageList = [];
                for (let id in allMessages) {
                    messageList.push({ id, ...allMessages[id] });
                }

                setMessages(messageList)

            })
        }
    }, [chatId])



    // when user hits the enter , message will be sent

    const onKeyPress = (e) => {
        if (e.which === 13) {
            e.preventDefault();
            sendMessage();
            window.scrollTo(0, document.body.scrollHeight);
        }
    };


    const sendMessage = (e) => {


        //message will be sent with this format
        const uploadMessage = firebase.database().ref("chats").child(chatId);

        const messageTo = {
            created: firebase.database.ServerValue.TIMESTAMP,
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        };
        uploadMessage.push(messageTo);
        setInput("")

    }

    const inputHandler = (e) => {
        setInput(e.target.value)
    }



    return (
        <div className="chat">
            {/* CHat Header */}
            <div className="chat__header">
                <h4>To: <span className="chat__name">{channelName}</span></h4>
                <strong>Details</strong>
            </div>

            {/* CHat Messages */}
            <div id="messages" className="chat__messages">
                {messages.filter(item => item.message !== undefined).map((item) => (


                    < Message key={item.id} item={item} />
                ))}
            </div>


            {/* CHat Input */}

            <div className="chat__input">
                <form >

                    {/* if user does not select any channel , not allowed to write anything */}
                    {channelName ?
                        <input type="text" onKeyPress={onKeyPress} placeholder="Send messages" onChange={inputHandler} value={input} /> :
                        <input type="text" onKeyPress={onKeyPress} placeholder="Send messages" onChange={inputHandler} disabled value={input} />}

                </form>

            </div>
        </div>
    )
}

export default Chat