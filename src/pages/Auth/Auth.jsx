import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { logIn, signUp } from '../../api/AuthRequests'
import Logo from "../../img/logo.png"

import "./Auth.css"
import { useInfoContext } from '../../context/Context'

export const Auth = () => {
  const {setCurrentUser} = useInfoContext()

  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpass: "",
  }

  // const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false)

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState(initialState)

  const [confirmPass, setConfirmPass] = useState(true)

  // signup
  const sigUpUser = async () => {
    try {
      setLoading(true)
      const res = await signUp(data)
      setCurrentUser(res.data.user);
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('profile', JSON.stringify(res.data.user)) 
      setLoading(false)        
    } catch (error) {
      setLoading(false)
      console.log(error.response.data.message);
    }
  }
  //login
  const loginUser = async () => {
    try {
      setLoading(true)
      const res = await logIn(data)
      setCurrentUser(res.data.user);
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('profile', JSON.stringify(res.data.user))    
      setLoading(false) 
    } catch (error) {
      setLoading(false)
      console.log(error);
      alert(error.response.data.message)
    }
  }

  // handleInput
  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  // handleSubmitForm
  const handleForm = async (e) => {
    setConfirmPass(true)
    e.preventDefault()
    if(isSignUp) {
      data.confirmpass === data.password ? sigUpUser() : setConfirmPass(false)
    } else {
      loginUser()
    }
  }

  // resetForm
  const resetForm = () => {
    setData(initialState)
    setConfirmPass(confirmPass)
  }

  return (
    <div className='auth'>
      {/* left box */}
      <div className="auth-left">
        <img src={Logo} alt="logo" className="logo-img" />

        <div className="app-name">
          <h1>JS Media</h1>
          <h6>Explore with Jahongir Sadullayev</h6>
        </div>
      </div>
      

      {/* left box */}

      <div className="auth-right">
        <form onSubmit={handleForm} className="auth-form info-form">
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <>
              <div>
                <input onChange={handleInput} type="text" className="info-input" placeholder='First Name' value={data.firstname} name='firstname' required/>
              </div>
              <div>
                <input onChange={handleInput} type="text" className="info-input" placeholder='Last Name' value={data.lastname} name='lastname' required/>
              </div>
            </>
          )}
          <div>
            <input onChange={handleInput} type="email" className="info-input" placeholder='Email' value={data.email} name='email' required/>
          </div>
          <div>
            <input onChange={handleInput} type="password" className="info-input" placeholder='Password' value={data.password} name='password' required/>
          </div>

          {isSignUp && (
            <div>
              <input onChange={handleInput} type="password" className="info-input" placeholder='Confirm Password' value={data.confirmpass}name='confirmpass' required/>
            </div>
          )}

          <span style={{display: confirmPass ? "none" : "block"}} className="confirm-span">*Confirm password is not same</span>

          <div>
            <span className="info-span" onClick={() => {
              setIsSignUp(!isSignUp)
              resetForm()
            }}>
              {isSignUp ? "Already have an account Login" : "Don't have an account Sign Up"}
            </span>
            <button className="info-btn button" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}
