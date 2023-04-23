import React, { memo, useEffect, useState } from 'react'
import {UilSearch} from "@iconscout/react-unicons"
import { Users } from '../Users/Users'
import Logo from "../../img/logo.png"


import "./Search.css"
import { getAllUser } from '../../api/UserRequests'

const Search = ({exit, onlineUsers, currentUser, setModal, setUser}) => {
  const [users, setUsers] = useState([])
  const [findUsers, setFindUsers] = useState(null)

  // Get all users
  useEffect(()=> {
    const getUsers = async () => {
      try {
        const {data} = await getAllUser() 
        setUsers(data.filter(user => user._id !== currentUser._id));
      } catch (error) {
        console.log(error);
        if(error.response.data.message === "jwt expired") {
          exit()
        }
      }
    }
    getUsers()
    // eslint-disable-next-line
  }, [])

  const search = (e) => {
    const key = new RegExp(e.target.value, "i");
    let filteredUsers = users.filter(user => user.firstname.match(key))
    setFindUsers(filteredUsers)
  }

  return (
    <div>
      <div className='search-box'>
        <img src={Logo} alt="logo" />
        <div className="search-input-box">
          <input onChange={search} type="text" placeholder='Search' />
          <div className="search-icon">
            <UilSearch/>
          </div>
        </div>
      </div>
      <Users users={findUsers ? findUsers : users} onlineUsers={onlineUsers} setModal={setModal} setUser={setUser}/>
    </div>
  )
}

export default memo(Search)