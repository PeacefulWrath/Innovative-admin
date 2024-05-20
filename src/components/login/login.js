import React, { useState, useEffect } from 'react'
import { logIn, verifyToken } from '../../api-calls/apicalls';
import { useNavigate } from "react-router-dom";

function Login() {
  const [showNotFound, setShowNotFound] = useState(undefined)
  const [password, setPassword] = useState([])
  const [email, setEmail] = useState([])

  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginData = await logIn({ email: email, password: password })
    // console.log("+++",loginData)
    if (loginData.success == "no") {
      alert(loginData?.message)
    } else if (loginData.success == "yes") {
      // console.log("login successfull")
      // setLoginValidity(true)
      localStorage.setItem("token", loginData.token)
      navigate("/dashboard");
    }
  }

  useEffect(() => {


    const verifier = async () => {

      const verifiedTokenData = await verifyToken()
      // console.log("rrr",verifiedTokenData?.message)
      if (verifiedTokenData?.message == "jwt expired") {
        setShowNotFound(false)
      } else {
        setShowNotFound(true)
      }
    }

    verifier()

  }, []);


  if (showNotFound === true) {
    return (<div className='d-flex justify-content-center'>
      Page Not Found
    </div>)
  } else if (showNotFound === false) {

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
              onChange={(e) => { setEmail(e.target.value) }}
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
              onChange={(e) => { setPassword(e.target.value) }}
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
}

export default Login