import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import config from '../utils/config.js'
import "../assets/styles/forgetpassword.css"


const ForgotPassword = () => {

	// Dependencies
	const navigate = useNavigate()
	
	// ------------------------------------------------------------ //
  // States
  // ------------------------------------------------------------ //
	const [email, setEmail] = useState("")
	const [msg, setMsg] = useState("")
	const [error, setError] = useState("")
	// ************************************************************ //

	// Submit button function
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const url = `${config.URL_USED}/api/password-reset`
			const { data } = await axios.post(url, { email })
			setMsg(data.message)
			setError("")
			setEmail("")
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message)
				setMsg("")
			}
		}
	}


	return (
		<div className="forget-password-container">
			<form className="forget-password-form-container" onSubmit={handleSubmit}>
				<h1>Forgot Password</h1>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => {
						setEmail(e.target.value)
						setError('')
						setMsg('')
					}}
					value={email}
					required
					className="forget-password-input"
				/>
				{error && <div className="forget-password-error-msg">{error}</div>}
				{msg && <div className="forget-password-success-msg">{msg}</div>}
				<button type="submit" className="forget-password-btn">
					Submit
				</button>
			</form>
			<div className='back-button-div'>
				<button className='back-btn' onClick={() => navigate('/LoginPage')}>Back</button>
			</div>
		</div>
	);
};

export default ForgotPassword;