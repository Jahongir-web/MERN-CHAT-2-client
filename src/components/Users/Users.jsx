import React from 'react'
import profileImg from '../../img/defaultProfile.png'

import "./Users.css"
import { findChat } from '../../api/ChatRequests'
import { useInfoContext } from '../../context/Context'

export const Users = ({users}) => {
  const {onlineUsers, setModal, setUser, currentUser, exit, chats, setChats, setCurrentChat} = useInfoContext()
  
  const createChat = async (firstId, secondId) => {
    try {
      const {data} = await findChat(firstId, secondId)
      setCurrentChat(data)
      if(!chats.some(chat => chat._id === data._id)) {
        setChats([...chats, data]);
      }
    } catch (error) {
      console.log(error);
      if(error.response.data.message === "jwt expired") {
        exit()
      }
    }
  }

  const online = (user) => {
    return onlineUsers.some(onlineUser => onlineUser.userId === user._id)
  }

  const openModal = (user) => {
    setUser(user)
    setModal(true)
  }

  return (
    <div className='users-list'>
      {
        users.map((user) => {
          return (
            <div key={user._id}>
              <div className='conversation user-info-box'>
                <div onClick={()=> openModal(user)}>
                  {
                    online(user) && <div className='online-dot'></div>
                  }
                  <img src={user?.profilePicture ? user.profilePicture : profileImg} alt="profile" className="profile-image"/>
                  <div className="name">
                    <span>{user?.firstname} {user?.lastname}</span>
                    <span className='status' style={{color: online(user) ? '#51e200' : ""}}>{online(user) ? "Online" : "Offline"}</span>
                  </div>
                </div>
                <button onClick={()=> createChat(user._id, currentUser._id)} className="button"> </button>
              </div>
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}
