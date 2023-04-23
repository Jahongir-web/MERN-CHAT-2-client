import React, { useEffect, useState } from 'react'
import Search from '../../components/Search/Search'
import "./Chat.css"
import io from 'socket.io-client';
import { userChats } from '../../api/ChatRequests';
import { Conversation } from '../../components/Conversation/Conversation';
import { ChatBox } from '../../components/ChatBox/ChatBox';
import { InfoModal } from '../../components/InfoModal/InfoModal';

const socket = io.connect('http://localhost:4001/');


export const Chat = ({currentUser, setCurrentUser}) => {

  const [onlineUsers, setOnlineUsers] = useState([])
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)
  const [modal, setModal] = useState(false)
  const [user, setUser] = useState(null)
  
  const exit = () => {
    localStorage.clear()
    setCurrentUser(null)
    setModal(false)
  }

  // Get the chat in the sections
  useEffect(()=> {
    const getChats = async () => {
      try {
        const {data} = await userChats()
        setChats(data);
      } catch (error) {
        console.log(error);
        if(error.response.data.message === "jwt expired") {
          exit()
        }
      }
    }
    getChats()
    // eslint-disable-next-line
  }, [currentUser._id])


  useEffect(() => {
    socket.emit("new-user-add", currentUser._id)
    socket.on("get-users", (users)=> {
      setOnlineUsers(users)
    })
  }, [currentUser]);

  // send message to socket server
  useEffect(() => {
    if(sendMessage !== null) {
      socket.emit("send-message", sendMessage)
    }
  }, [sendMessage])

  // Get the message from socket server 
  useEffect(()=> {
    socket.on('recieve-message', (data) => {
      setReceivedMessage(data)
    })
  }, [])

  const checkOlineStatus = (chat) => {
    const chatMember = chat.members.find((member)=> member !== currentUser._id)
    const online = onlineUsers.find((user)=> user.userId === chatMember)
    return online ? true : false
  }  

  return (
    <div className='Chat'>
      <div className="left-side">
        <Search exit={exit} onlineUsers={onlineUsers} currentUser={currentUser} setModal={setModal} setUser={setUser}/>
      </div>
      <div className="middle-box">        
        <ChatBox chat={currentChat} currentUser={currentUser} setSendMessage={setSendMessage} receivedMessage={receivedMessage} exit={exit} setModal={setModal} setUser={setUser}/>
      </div>
      <div className="right-side">
        <div className="right-side-top">
          <h2>List Chats</h2>
          <button className='info-btn button' onClick={exit}>Exit</button>
        </div>
        <div className="chat-list">
          {
            chats.map((chat, i) => {
              return(
                <div key={chat._id} onClick={()=>setCurrentChat(chat)}>
                  <Conversation data={chat} currentUser={currentUser} online={checkOlineStatus(chat)} />
                </div>
              )
            })
          }
        </div>
      </div>

      {
        modal && <InfoModal user={user} setModal={setModal}/>      
      }
    </div>

  )
}
