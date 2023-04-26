import React, { useEffect, useState, useRef } from 'react'
import { getUser } from '../../api/UserRequests'
import {addMessage, getMessages} from "../../api/MessageRequests"
import {format} from "timeago.js"
import InputEmoji from "react-input-emoji"
import profileImg from '../../img/defaultProfile.png'
import { useInfoContext } from '../../context/Context'

import "./ChatBox.css"

export const ChatBox = ({setSendMessage, receivedMessage}) => {
  const {currentChat, currentUser, exit, setModal, setUser} = useInfoContext()
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  
  const imageRef = useRef()
  const scroll = useRef()

  useEffect(()=> {
    // fetching data for header
    const getUserData = async () => {
      const userId = currentChat?.members?.find(id => id!==currentUser._id)
      try {
        const {data} = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error);
        if(error.response.data.message === "jwt expired") {
          exit()
        }
      }
    }

    if(currentChat) getUserData()
    // eslint-disable-next-line
  }, [currentChat, currentUser._id])

  // fetch messages

  useEffect(()=> {
    const fetchMessages = async () => {
      try {
        const {data} = await getMessages(currentChat._id)
        setMessages(data)
      } catch (error) {
        console.log(error);
        if(error.response.data.message === "jwt expired") {
          exit()
        }
      }
    }

    if(currentChat) fetchMessages()
    // eslint-disable-next-line
  }, [currentChat])

  // handle change
  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  // Always scroll to last Message
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  // Send Message
  const handleSend = async(e) => {
    e.preventDefault()
    const message = {
      senderId: currentUser._id,
      text: newMessage,
      chatId: currentChat._id,
      createdAt:new Date().getTime(),
    }

    if(newMessage === '') {
      return
    }
    const receivedId = currentChat?.members?.find(id => id!==currentUser._id)

    setSendMessage({...message, receivedId})

    try {
      const {data} = await addMessage(message)
      setMessages([...messages, data])
      setNewMessage('')
    } catch (error) {
      console.log(error);
      if(error.response.data.message === "jwt expired") {
        exit()
      }
    }
  }

  // Recevie message from parent component
  useEffect(() => {
    if(currentChat && receivedMessage !== null && receivedMessage.chatId === currentChat._id) {
      setMessages([...messages, receivedMessage])
    }
    // eslint-disable-next-line
  }, [receivedMessage])

  const openModal = () => {
    setUser(userData)
    setModal(true)
  }

  return (
    <div className="chatbox-container">
      {
        currentChat ? (
          <>
            {/* chat header */}
            <div className="chat-header">
              <div onClick={openModal} className="user-info">
                <div>
                  <img src={userData?.profilePicture ? userData.profilePicture : profileImg} alt="profile" className="user-image"/>
                </div>
                <div className="name">
                  <span>{userData?.firstname} {userData?.lastname}</span>
                </div>
              </div>
              <hr/>
            </div>

            {/* chat body */}
            <div className="chat-body">
              {
                messages.map((message, i) => (                    
                  <div ref={scroll} key={i} className={message.senderId === currentUser._id ? "message own" : "message"}>
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>                    
                ))
              }
            </div>

            {/* chat sender */}
            <div className="chat-sender">
              <div onClick={()=> imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange}/>
              <button className="send-button button" onClick={handleSend}>
                Send
              </button>
              <input type="file" name='messageFile' style={{display: 'none'}} ref={imageRef}/>
            </div>
          </>
        ) : (
          <span className='chatbox-empty-message'>Tap on a chat to start conversation...</span>
        )
      }
            
    </div>   
  )
}
