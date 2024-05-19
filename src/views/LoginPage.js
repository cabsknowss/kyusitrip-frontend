import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/loginService'
import reportService from '../services/reportService'
import CmnPopupModal from '../components/CmnPopupModal'
import '../assets/styles/login.css'
import logo2 from '../assets/img/LOGO2.svg'



const LoginPage = () => {

  const navigate = useNavigate()


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [error, setError] = useState('')


  const handleLoginClick = async (event) => {
    try {
      const user = await login({
        email, password
      })

      setModalMessage("Log in Succesful")
      setShowModal(true)
      setUser(user) // End
      reportService.setToken(user.token)

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message)
      }
    }
  }

  return (
    <div className="login-page">
      <div className='login-container'>
        <div className='login-logo'>
            <img src= {logo2} alt="logo" />
            <h1><span>K</span>yusi<span>T</span>rip</h1>
        </div>

        {user === null ? (
          <div className='form-container'>
            <h4>Login to your Account</h4>
            <div className='mb20'>
              <h6>Email: </h6>
              <input
                type="text" 
                id='email'
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  setError('')
                }} 
                autoComplete='on'
              />
            </div>

            <div className='mb5'>
              <h6>Password: </h6>
              <input 
                type="password"
                id='password'
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  setError('')
                }} 
                onKeyDown={e => e.key === "Enter" ? handleLoginClick() : null}
              />
            </div>

            {error && <div className="login-page-error-msg">{error}</div>}

            <div className='form-button mb10'>
              <button onClick={handleLoginClick}>Log in</button>
            </div>

            <div className='login-page-forget-password'>
              <h6 onClick={() => navigate('/ForgetPassword')}> Forget Password </h6>
            </div>
          </div>
        ) : null}

        <div className='back-button-div'>
          <button className='back-btn' onClick={() => navigate('/')}>Back</button>
        </div>
      </div>

      <div>
        {showModal ?
          <CmnPopupModal 
            message={modalMessage}
            textBtn="Go to Home Page"
            onClose={() => {
              setShowModal(false)
              setModalMessage('')
              navigate('/HomePage')
            }}/>
          : <></>
        }
      </div>
    </div>
  )
}

export default LoginPage
