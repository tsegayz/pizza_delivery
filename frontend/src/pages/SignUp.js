import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp({ setIsAuthenticated }) {
	const [form, setForm] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		location: "",
		phoneNumber: "",
		termsAccepted: false,
	});
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [location, setLocation] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);

	const [showModal, setShowModal] = useState(false);
	const [responseMessage, setResponseMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setResponseMessage(""); // Reset response message
	
		if (
			!email ||
			!password ||
			!passwordConfirm ||
			!location ||
			!phoneNumber ||
			!termsAccepted
		) {
			setResponseMessage("Please fill in all the fields");
			return;
		}
	
		// Check if passwords match
		if (password !== passwordConfirm) {
			setResponseMessage("Password and confirm password do not match!");
			return;
		}
	
		try {
			const response = await axios.post(
				"http://localhost:5000/api/v1/users/signup",
				{
					email,
					password,
					passwordConfirm,
					location,
					phoneNumber,
					termsAccepted,
				}
			);
	
			const userData = response.data.data.user;
			const token = response.data.token; // Extract the JWT token from the response
			localStorage.setItem("token", token); // Store the token in local storage
			localStorage.setItem("user", JSON.stringify(userData));
	
			setResponseMessage(response.data.status);
	
			// After successful signup, navigate to the order page based on selected item
			const selectedItem = JSON.parse(localStorage.getItem("selectedItem"));
			if (selectedItem) {
				navigate(`/order/${selectedItem._id}`);
			} else {
				navigate("/"); // Fallback navigation if no selected item
			}
	
			setIsAuthenticated(true);
		} catch (error) {
			if (error.response) {
				// Handle specific error responses
				setResponseMessage(error.response.data.message || "An error occurred");
			} else {
				setResponseMessage("An error occurred");
			}
		}
	};
	

	return (
		<div className='sign'>
			<div className='left-side'>
				<img src={logo} />
			</div>
			<div className='right-side'>
				<div style={{ display: "flex" }}>
					<img src={logo} />
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
								setResponseMessage("");
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
								setResponseMessage("");
							}}
							placeholder=' '
						/>
						<label>Password</label>
					</div>

					<div className='input-container'>
						<input
							type='password'
							name='confirmPassword'
							value={passwordConfirm}
							onChange={(e) => {
								setPasswordConfirm(e.target.value);
								setResponseMessage("");
							}}
							placeholder=' '
						/>
						<label>Confirm Password</label>
					</div>

					<div className='input-container'>
						<input
							type='text'
							name='location'
							value={location}
							onChange={(e) => {
								setLocation(e.target.value);
								setResponseMessage("");
							}}
							placeholder=' '
						/>
						<label>Location</label>
					</div>
					<div className='input-container'>
						<input
							type='text'
							name='phoneNumber'
							value={phoneNumber}
							onChange={(e) => {
								setPhoneNumber(e.target.value);
								setResponseMessage("");
							}}
							placeholder=' '
						/>
						<label>Phone Number</label>
					</div>

					<div>
						<input
							type='checkbox'
							name='termsAccepted'
							checked={termsAccepted}
							onChange={(e) => {
								setTermsAccepted(e.target.value);
								setResponseMessage("");
							}}
						/>
						<label>I accept the Terms and Conditions</label>
					</div>

					<button type='submit'>SIGN UP</button>

					<div>
						<p>
							Already have an account? <a href='/signin'>Login</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
