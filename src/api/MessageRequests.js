import axios from 'axios'
const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverUrl});

export const getMessages = (id) => {
  const token = localStorage.getItem("token")
  return  API.get(`/message/${id}`, {headers: {"Authorization" : `Bearer ${token}`}});
}

export const addMessage = (data) => {
  const token = localStorage.getItem("token")
  return  API.post('/message/', data, {headers: {"Authorization" : `Bearer ${token}`}});
}