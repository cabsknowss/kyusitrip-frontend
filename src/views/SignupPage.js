import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import userService from '../services/userService';
import logo2 from '../assets/img/LOGO2.svg';
import '../assets/styles/signup.css';


const SignupPage = () => {

  // Dependencies
  const navigate = useNavigate();

  // ------------------------------------------------------------ //
  // States
  // ------------------------------------------------------------ //
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState("");
  const [error, setError] = useState('');
  // ************************************************************ //

  // Sign-up button function
  const handleSignupClick = () => {
    const data = {name, password, email};
    userService
      .create(data)
      .then((response) => {
        setMsg(response.message);
        setError("");
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
          setMsg("");
        }
      })
  } 

  return (
    <div className="signup-page">
      <div className='signup-container'>
        <div className='signup-logo'>
            <img src= {logo2} alt="logo" />
            <h1><span>K</span>yusi<span>T</span>rip</h1>
        </div>

        <h4>Create an Account</h4>

        <div className='form-container'>

          <div className='mb20'>
            <h6><span className='required-asterisk'>*</span>Name: </h6>
            <input 
              type="text"
              id='name'
              value={name}
              onChange={e => {
                setName(e.target.value)
                setMsg('')
                setError('')
              }} 
              autoComplete='on'
            />
          </div>

          <div className='mb20'>
            <h6><span className='required-asterisk'>*</span>Email: </h6>
            <input 
              type="email"
              id='email'
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                setMsg('')
                setError('')
              }} 
              autoComplete='on'
            />
          </div>

          <div>
            <h6><span className='required-asterisk'>*</span>Password: </h6>
            <input 
              type="password"
              id='password'
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                setMsg('')
                setError('')
              }} 
              onKeyDown={e => e.key === "Enter" ? handleSignupClick() : null}
            />
          </div>

          {error && <div className="signup-page-error-msg">{error}</div>}
          {msg && <div className="signup-page-success-msg">{msg}</div>}

          <div className='form-button mb20'>
            <button onClick={handleSignupClick}>Sign Up</button>
          </div>
        </div>
      </div>
      
      <div className='back-button-div'>
        <button className='back-btn' onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  )
}

export default SignupPage
