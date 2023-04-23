import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverUrl});

export const logIn = (formData)=> API.post('/auth/login', formData);

export const signUp = (formData) => API.post('/auth/signup', formData);