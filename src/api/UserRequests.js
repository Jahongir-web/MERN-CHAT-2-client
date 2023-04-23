import axios from 'axios'
const serverUrl = process.env.REACT_APP_SERVER_URL;


const API = axios.create({baseURL: serverUrl});


export const getUser = (userId) => {
  const token = localStorage.getItem("token");
  return  API.get(`/user/${userId}`, {headers: {"Authorization" : `Bearer ${token}`}});
}

export const updateUser = (id, formData) =>  {
  const token = localStorage.getItem("token");
  return  API.put(`/user/${id}`, formData, {headers: {"Authorization" : `Bearer ${token}`}});
}

export const getAllUser = ()=> {
  const token = localStorage.getItem("token");
  return  API.get('/user', {headers: {"Authorization" : `Bearer ${token}`}})
}
