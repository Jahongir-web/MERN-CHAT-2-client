import { createContext, useContext, useState } from "react";


const InfoContext = createContext()
export const useInfoContext = () => useContext(InfoContext)

export const InfoProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("profile")) || null);
  const [user, setUser] = useState(null)
  const [chats, setChats] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [modal, setModal] = useState(false)

  const exit = () => {
    localStorage.clear()
    setCurrentUser(null)
    setCurrentChat(null)
    setModal(false)
  }

  const value = {
    currentUser, setCurrentUser,
    user, setUser,
    chats, setChats,
    modal, setModal,
    onlineUsers, setOnlineUsers,
    currentChat, setCurrentChat,
    exit
  }

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>
        {
          ()=>children
        }
      </InfoContext.Consumer>
    </InfoContext.Provider>
  )
}