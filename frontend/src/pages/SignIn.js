import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom"; // Remove useHistory
import { useState } from "react";
import axios from "axios";
import { setAuthorizationHeader } from "../axiosConfig";

function SignIn({ setIsAuthenticated }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [responseMessage, setResponseMessage] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate(); 
	
	const API_URL = "https://pizza-delivery-backend-deploy.vercel.app";

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setResponseMessage("");

		if (!email || !password) {
			setError("Please fill in all the fields");
			return;
		}

		try {
			const response = await axios.post(`${API_URL}/api/v1/users/login`, {
				email,
				password,
			});
			const userData = response.data.user;
			const token = response.data.token;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(userData));

			setAuthorizationHeader();
			setIsAuthenticated(true);

			if (userData.role_id === 1) {
				navigate("/addAdmin");
			} else {
				navigate("/order");
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			if (error.response) {
				console.error("Response data:", error.response.data);
				console.error("Response status:", error.response.status);
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
