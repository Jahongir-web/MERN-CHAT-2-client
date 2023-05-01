import React, { memo, useEffect, useState } from 'react'
import {UilSearch} from "@iconscout/react-unicons"
import { UilTimes } from '@iconscout/react-unicons'
import { UilListUiAlt } from '@iconscout/react-unicons'
import { Users } from '../Users/Users'
import Logo from "../../img/logo.png"


import "./Search.css"
import { getAllUser } from '../../api/UserRequests'
import { useInfoContext } from '../../context/Context'

const Search = () => {
  const {exit, currentUser} = useInfoContext()
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
    <div className='search-users'>
      <div className='search-box'>
        <img src={Logo} alt="logo" />
        <div className="search-input-box">
          <input onChange={search} type="text" placeholder='Search' />
          <div className="search-icon">
            <UilSearch/>
          </div>
        </div>
        <button className="open-list-btn button"><UilTimes /></button>
      </div>
      <h4>All Users</h4>
      <Users users={findUsers ? findUsers : users}/>
    </div>
  )
}

export default memo(Search)
