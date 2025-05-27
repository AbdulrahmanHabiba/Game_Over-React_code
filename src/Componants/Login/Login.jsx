import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import main_img from "../../assets/login_img.jpg"
import logo from "../../assets/logo.png"

import Joi from 'joi'
import Axios from 'axios'

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [user, setUser] = useState(
    {
      email: "",
      password: ""
    }
  )
  const [errorApi, setErrorApi] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorJoi, setErrorJoi] = useState([])
  const [showModal, setShowModal] = useState(true);

  const navigateHome = () => {
    setShowModal(false);
    navigate('/home');
  };

  async function sendUserDataToAPi() {
    let { data } = await Axios.post('https://sticky-note-fe.vercel.app/signin', user)
    if (data.message === "success") {
      localStorage.setItem('userToken', data.token)
      saveUserData();
      setLoading(false);
      navigate('/home');

    }
    else {
      setErrorApi(data.message)
      setLoading(false)

    }
  }

  function getUserData(e) {
    let userCopy = { ...user }
    userCopy[e.target.name] = e.target.value
    setUser(userCopy)
  }
  function validateLoginForm() {
    let scheme = Joi.object({
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).messages({
        "string.empty": `Email is required`,
      }),
      password: Joi.string().pattern(/^[a-z0-9]{5,8}/).messages({
        "string.pattern.base": `Password is incorrect `,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
      }),
    })
    return (scheme.validate(user, { abortEarly: false }));
  }
  let validation = validateLoginForm()
  function submitLoginForm(e) {
    e.preventDefault() // disable default prevents of Form // disable auto refresh
    setLoading(true)
    if (validation.error) {
      setErrorJoi(validation.error.details)
      setLoading(false)
    }
    else {
      sendUserDataToAPi()
    }
  }

  function displayJoiError(labelName) {
    return (
      <div className=" rounded  rounded-1 px-3 text-bg-light text-danger mt-1">
        {errorJoi.filter((error) => error.context.label === labelName)[0]?.message}
      </div>
    )
  }

  return (
    <>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', textAlign: 'center', minWidth: '300px' }}>
            <h4 style={{ color: '#222' }}>Login is temporarily disabled</h4>
            <p style={{ color: '#555' }}>You cannot login at the moment. Please return to the homepage.</p>
            <button onClick={navigateHome} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: '#4799eb', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Go to Home</button>
          </div>
        </div>
      )}
      <div className="login mb-4 text-white">
        <div className="container pt-5  ">
          <div className="row g-0">
            <div className=" col-md-6 start-box d-none d-md-block">
              <img src={main_img} className="w-100 h-100" alt="" />
            </div>

            <div className=" col-md-6 end-box px-5 ">
              <div className="login-header text-center">
                <img src={logo} className="my-3 " alt="" />
                <h5 className="text-center text-muted">Log in to GameOver</h5>
              </div>
              <form action="" onSubmit={submitLoginForm}  >
                {errorApi ? <div className="alert alert-danger py-3 mb-0 mt-3">   {errorApi}
                </div> : ''}


                <label htmlFor='email'></label>
                <input onChange={getUserData} id="email" name="email" placeholder='Email Address' type="email" className="form-control  my_input" />
                {displayJoiError("email")}

                <label htmlFor='password'></label>
                <input onChange={getUserData} id="password" name="password" placeholder='password' type="password" className="form-control  my_input" />
                {validation.error ? displayJoiError("password") : ""}

                <button className=' btn login-btn w-100 text-white border border-dark my-3 btn' type='submit'>

                  {loading ? <i className=" fas fa-spinner fa-spin"></i> : "Login"}
                </button>
              </form>
              <footer className="login-footer footer login_border  mt-3">
                <div className="text-center px-5 py-3">

                  <p className="link-primary m-1 cursor-default ">Forgot Password?</p>
                  <p className="text-muted" >
                    Not a member yet?
                    <span className=" link-primary cursor-pointer">
                      <Link className=" text-decoration-none" to="/register">
                        Create Account
                      </Link>
                    </span>
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
