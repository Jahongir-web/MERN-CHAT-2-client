import axios from 'axios'
const serverUrl = process.env.REACT_APP_SERVER_URL;


// const API = axios.create({baseURL: serverUrl, headers: {"Authorization" : `Bearer ${token}`} });
const API = axios.create({baseURL: serverUrl});

// export const createChat = (data) => API.post('/chat/', data);

export const userChats = () => {
  const token = localStorage.getItem("token")
  return API.get(`/chat`, {headers: {"Authorization" : `Bearer ${token}`}});
} 

export const findChat = (firstId, secondId) =>{
  const token = localStorage.getItem("token")
  return API.get(`/chat/${firstId}/${secondId}`, {headers: {"Authorization" : `Bearer ${token}`}});
}