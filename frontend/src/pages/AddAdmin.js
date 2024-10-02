import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddAdmin() {
	const [users, setUsers] = useState();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [responseMessage, setResponseMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setResponseMessage("");

		// console.log({ name, email, phoneNumber });

		if (!name || !email || !phoneNumber) {
			setResponseMessage("Please fill in all the fields");
			return;
		}

		// No need to use FormData unless you're uploading files
		const userData = {
			name,
			email,
			phoneNumber,
		};

		try {
			const response = await axios.post(
				"http://localhost:5000/api/v1/users",
				userData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const userDataResponse = response.data.data; // Adjust as necessary
			setResponseMessage(response.data.status);
			setName(""); // Reset form fields
			setEmail("");
			setPhoneNumber("");
			navigate("/dashboard");
		} catch (error) {
			if (error.response) {
				setResponseMessage(error.response.data.message || "An error occurred");
			} else {
				setResponseMessage("An error occurred");
			}
		}
	};

	return (
		<div className='sign add-admin'>
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
					<h2
						style={{
							borderBottom: "1px solid #e6e6e6",
							fontSize: "28px",
							fontFamily:'sans-serif',
                            fontWeight:'100'
						}}
					>
						Add Admin
					</h2>
					<div className='input-container'>
						<input
							type='text'
							name='name'
							id='Admin name'
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder=' '
							required
						/>
						<label htmlFor='name'>Name</label>
					</div>
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
					<button type='submit'>Continue</button>
				</form>
			</div>
		</div>
	);
}

export default AddAdmin;
