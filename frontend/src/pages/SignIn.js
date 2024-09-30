import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom"; // Remove useHistory
import { useState } from "react";
import axios from "axios";

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [responseMessage, setResponseMessage] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate(); // Use useNavigate for navigation

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setResponseMessage("");

		// Basic validation
		if (!email || !password) {
			setError("Please fill in all the fields");
			return;
		}

		try {
			const response = await axios.post(
				"http://localhost:5000/api/v1/users/login",
				{
					email,
					password,
				}
			);

			const userData = response.data.user;
			const token = response.data.token; // Extract the JWT token from the response
			localStorage.setItem("token", token); // Store the token in local storage
			localStorage.setItem("user", JSON.stringify(userData));

			setResponseMessage(response.data.status);
			if (userData.role_id === 1) {
				navigate("/dashboard");
			} else {
				setShowModal(true);
				navigate("/order");
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setError("Incorrect username or password!");
			} else {
				setError("An error occurred");
			}
		}
	};

	return (
		<div className='sign'>
			<div className='left-side'>
				<img src={logo} alt='Logo' />
			</div>
			<div className='right-side'>
				<div style={{ display: "flex" }}>
					<img src={logo} alt='Logo' />
					<h3
						style={{ color: "#ff7200", fontSize: "30px", paddingLeft: "10px" }}
					>
						Pizza
					</h3>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='input-container'>
						<input
							type='email'
							name='email'
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setError("");
							}}
							placeholder=' '
						/>
						<label>Email address</label>
					</div>

					<div className='input-container'>
						<input
							type='password'
							name='password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setError("");
							}}
							placeholder=' '
						/>
						<label>Password</label>
					</div>

					<div>
						<input
							type='checkbox'
							name='remember'
							checked={remember}
							onChange={(e) => {
								setRemember(e.target.checked);
								setError("");
							}}
						/>
						<label>Remember me</label>
					</div>

					<button type='submit'>LOGIN</button>

					<div>
						<p>
							Already have an account? <a href='/signUp'> Sign up</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
