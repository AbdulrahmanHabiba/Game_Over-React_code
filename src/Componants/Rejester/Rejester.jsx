/* eslint-disable jsx-a11y/anchor-is-valid */
import Axios from 'axios'
import Joi from 'joi'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import main_img from "../../assets/login_img.jpg"
export default function Rejester() {
  let navigate = useNavigate()

  // ( user ) is the same object of backend 
  const [user, setUser] = useState(
    {
      first_name: "",
      last_name: "",
      email: "",
      age: 0,
      password: ""
    }
  )
  const [errorApi, setErrorApi] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorJoi, setErrorJoi] = useState([])
  const [showModal, setShowModal] = useState(true);

  async function sendUserDataToAPi() {
    let { data } = await Axios.post('https://sticky-note-fe.vercel.app/signup', user)
    if (data.message === "success") {
      setLoading(false)
      navigate('/home')
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
  function validateRegisterForm() {

    let scheme = Joi.object({
      first_name: Joi.string().min(3).max(15).required().messages({
        "string.empty": `First name is required`,
      }),
      last_name: Joi.string().min(3).max(15).required().messages({
        "string.empty": `Last name is required`,
      }),
      age: Joi.number().min(12).max(60).required().messages({
        "string.empty": `age must be greater than or equal to 12`,
      }),
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).messages({
        "string.empty": `Email is required`,
      }),
      // Password should start with capital letter and contain letters or numbers from 5 to 8 
      password: Joi.string().pattern(/^[a-z0-9]{5,8}/).messages({
        "string.pattern.base": `
        Password should be contain letters and numbers from 5 to 8`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
      }),
    })
    return (scheme.validate(user, { abortEarly: false }));
  }
  let validation = validateRegisterForm()
  function submitRegisterForm(e) {

    e.preventDefault() // disable default prevents of Form // disable auto refresh
    setLoading(true)
    if (validation.error) {
      setErrorJoi(validation.error.details)
      // console.log(errorJoi)
      setLoading(false)

    }
    else {
      sendUserDataToAPi()
    }
  }
  // <div className="alert alert-warning py-0 mt-1">
  //   </div>

  function displayJoiError(labelName) {
    return (
      <div className=" rounded  rounded-1 px-3 text-bg-light text-danger mt-1">
        {errorJoi.filter((error) => error.context.label === labelName)[0]?.message}
      </div>
    )
  }

  const navigateHome = () => {
    setShowModal(false);
    navigate('/home');
  };

  return (
    <>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', textAlign: 'center', minWidth: '300px' }}>
            <h4 style={{ color: '#222' }}>Registration is temporarily disabled</h4>
            <p style={{ color: '#555' }}>You cannot register at the moment. Please return to the homepage.</p>
            <button onClick={navigateHome} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: '#4799eb', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Go to Home</button>
          </div>
        </div>
      )}
      <div className="login mb-4 text-white">
        <div className="container pt-5  ">
          <div className="row g-0">
            <div className=" col-md-6 start-box d-none d-xl-block">
              <img src={main_img} className="w-100 h-100 " alt="" />
            </div>
            <div className=" col-xl-6 end-box p-4 ">
              <div className="login-header text-center">
                <h4 className="text-center text-muted title_shaow">Create My Account!
                </h4>
              </div>

              <form action="" onSubmit={submitRegisterForm}  >
                {errorApi ? <div className="alert alert-danger py-3 mb-0 mt-3">   {errorApi}
                </div> : ''}

                <div className="row d-flex ">
                  <div className="col-md-6">
                    <label htmlFor='first_name'></label>
                    <input onChange={getUserData} id="first_name" name="first_name" placeholder='First Name' type="text" className="form-control deep-dark  my_input" />
                    {displayJoiError("first_name")}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor='last_name'></label>
                    <input onChange={getUserData} id="last_name" name="last_name" placeholder='Last Name' type="text" className="form-control  my_input" />
                    {displayJoiError("last_name")}
                  </div>
                </div>
                <label htmlFor='email'></label>
                <input onChange={getUserData} id="email" name="email" placeholder='Email Address' type="email" className="form-control  my_input" />
                {displayJoiError("email")}
                <label htmlFor='age'></label>
                <input onChange={getUserData} id="age" name="age" placeholder='age' type="number" className="form-control  my_input" />
                {displayJoiError("age")}
                <label htmlFor='password'></label>
                <input onChange={getUserData} id="password" name="password" placeholder='password' type="password" className="form-control  my_input" />
                {validation.error ? displayJoiError("password") : ""}

                <button className=' btn login-btn w-100 text-white border border-dark my-3 btn' type='submit'>

                  {loading ? <i className=" fas fa-spinner fa-spin"></i> : "Register"}
                </button>
              </form>
              <footer className="login-footer footer m-0 p-0">
                <div className='text-center px-5 '>
                  <p className="text-muted"> This site is protected by <a className=' text-muted'>reCAPTCHA </a> and the Google Privacy Policy and <a className=' text-muted'>Terms of Service </a>  apply.
                  </p>
                  <p className='login_border pt-3'>Already a member?
                    <Link className=" text-decoration-none" to="/login">
                      Log in
                    </Link>
                    <i className='fas fa-chevron-right small'></i></p>
                </div>


              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
