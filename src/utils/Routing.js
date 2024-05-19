import { 
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom'
import LandingPage from "../views/LandingPage"
import LoginPage from "../views/LoginPage"
import SignupPage from "../views/SignupPage"
import HomePage from "../views/HomePage"
import EmailVerify from "../views/EmailVerify"
import ForgetPassword from "../views/ForgetPassword"
import PasswordReset from "../views/PasswordReset"


const Routing = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/LoginPage' element={<LoginPage />}></Route>
          <Route path='/SignupPage' element={<SignupPage />}></Route>
          <Route path='/HomePage' element={<HomePage />}></Route>
          <Route path='/users/:id/verify/:token' element={<EmailVerify />}></Route>
          <Route path='/ForgetPassword' element={<ForgetPassword />}></Route>
          <Route path='/password-reset/:id/:token' element={<PasswordReset />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default Routing
