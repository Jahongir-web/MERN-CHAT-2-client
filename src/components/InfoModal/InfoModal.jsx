import React from 'react'
import profileImg from '../../img/defaultProfile.png'
import coverImg from '../../img/defaultCover.jpg'

import "./InfoModal.css"
import { useInfoContext } from '../../context/Context'

export const InfoModal = () => {
  const {user, setModal} = useInfoContext()
  return (
    <div className="info-modal">
      <button className='button close-btn' onClick={()=>setModal(false)}>X</button>
      <div className='info-card'>
        <div className="profile-images">
          <img src={user?.coverPicture ? user.coverPicture : coverImg} alt="cover_profile" />

          <img src={user?.profilePicture ? user.profilePicture : profileImg} alt="profile_photo" />
        </div>

        <div className="profile-name">
          <span>{user?.firstname} {user?.lastname}</span>
        </div>

        <div className="info">
          <span>
            <b>About: </b>
          </span>
          <span>{user?.about}</span>
        </div>
        <div className="info">
          <span>
            <b>Relationship: </b>
          </span>
          <span>{user?.relationship}</span>
        </div>
        <div className="info">
          <span>
            <b>Country: </b>
          </span>
          <span>{user?.country}</span>
        </div>
        <div className="info">
          <span>
            <b>Lives in: </b>
          </span>
          <span>{user?.livesIn}</span>
        </div>
        <div className="info">
          <span>
            <b>Works at: </b>
          </span>
          <span>{user?.worksAt}</span>
        </div>
      </div>
    </div>
  )
}
