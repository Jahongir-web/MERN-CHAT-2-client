import React, { useEffect, useState } from 'react'
import profileImg from '../../img/defaultProfile.png'
import { getUser } from '../../api/UserRequests'

import "./Conversation.css"
import { useInfoContext } from '../../context/Context'


export const Conversation = ({data, online}) => {
  const { currentUser} = useInfoContext()
  const [userData, setUserData] = useState(null)

  const userId = data.members.find(id => id!==currentUser._id)
  
  useEffect(()=> {
    const getUserData = async () => {
      try {
        const {data} = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error);
      }
    }

    getUserData()
  }, [userId])

  return (
    <>
      <div className='conversation'>
        <div>
          {
            online && <div className='online-dot'></div>
          }
          <img src={userData?.profilePicture ? userData.profilePicture : profileImg} alt="profile" className="profile-image"/>
          <div className="name" style={{fontSize:"16px"}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span className='status' style={{color: online ? '#51e200' : ""}}>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}
