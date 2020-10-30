import React, { useState, useEffect } from 'react'
import Message from "./Message"
import firebase from "firebase"
import "./Chat.css"
import { useSelector } from 'react-redux'
import { selectChatName, selectChatID } from '../features/chatSlice'
import { selectUser, userSlice } from '../features/userSlice'

function Chat() {
    const user = useSelector(selectUser)

    const [input, setInput] = useState("")

    const [messages, setMessages] = useState([])

    const channelName = useSelector(selectChatName)
    const chatId = useSelector(selectChatID)



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


    const onKeyPress = (e) => {
        if (e.which === 13) {
            e.preventDefault();
            sendMessage();
        }
    };


    const sendMessage = (e) => {


        //firebase
        const uploadMessage = firebase.database().ref("chats").child(chatId);

        const messageTo = {
            /* timestamp: firebase.fieldValue.serverTimestamp(), */
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

    const arr = messages
    return (
        <div className="chat">
            {/* CHat Header */}
            <div className="chat__header">
                <h4>To: <span className="chat__name">{channelName}</span></h4>
                <strong>Details</strong>
            </div>

            {/* CHat Messages */}
            <div className="chat__messages">
                {messages.filter(item => item.message !== undefined).map((item) => (


                    < Message key={item.id} item={item} />
                ))}
            </div>


            {/* CHat Input */}

            <div className="chat__input">
                <form>
                    <input type="text" onKeyPress={onKeyPress} placeholder="Send messages" onChange={inputHandler} value={input} />
                    <button onClick={sendMessage}>Send</button>
                </form>

            </div>
        </div>
    )
}

export default Chat