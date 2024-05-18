import React, { useState } from 'react'
import { useLogin } from '../../context/loginContext'
import { logIn } from '../../api-calls/apicalls';
import { useNavigate  } from "react-router-dom";

function Login() {
  // const { loginValidity, setLoginValidity } = useLogin()
  const [password,setPassword]=useState([])
  const [email,setEmail]=useState([])

  const navigate = useNavigate();

  const handleLogin=async()=>{
        const loginData=await logIn({email:email,password:password})
        // console.log("+++",loginData)
        if(loginData.success==false){
          alert(loginData?.message)
        }else if(loginData.success==true){
          // console.log("login successfull")
          // setLoginValidity(true)
          localStorage.setItem("token",loginData.token)
          navigate("/dashboard");
        }
  }

  return (
    <>
      {/* <h1>login</h1> */}
      {/* <button onClick={()=>{setLoginValidity(true)}}>set validity</button> */}
      <div className="container mt-5">
        <h3 className="text-center">Login From</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control form-control-sm"
            id="email"
            name="email"
            value={email}
            autoComplete="off"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="password"
            name="password"
            value={password}
            autoComplete="off"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
             handleLogin()
          }}
        >
          Login
        </button>
      </div>
    </>
  )
}

export default Login