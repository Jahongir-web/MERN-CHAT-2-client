import React from 'react'
import profileImg from '../../img/defaultProfile.png'

export const Users = ({users, onlineUsers, setModal, setUser}) => {
  const online = (user) => {
    return onlineUsers.some(onlineUser => onlineUser.userId === user._id)
  }

  const openModal = (user) => {
    setUser(user)
    setModal(true)
  }

  return (
    <div>
      <h1>All Users</h1>
      {
        users.map((user) => {
          return (
            <div key={user._id}>
              <div className='conversation' onClick={()=> openModal(user)}>
                <div>
                  {
                    online(user) && <div className='online-dot'></div>
                  }
                  <img src={user?.profilePicture ? user.profilePicture : profileImg} alt="profile" className="profile-image"/>
                  <div className="name">
                    <span>{user?.firstname} {user?.lastname}</span>
                    <span className='status' style={{color: online(user) ? '#51e200' : ""}}>{online(user) ? "Online" : "Offline"}</span>
                  </div>
                  <button className="button">✉</button>
                </div>
              </div>
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}
