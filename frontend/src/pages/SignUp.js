import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
	const [form, setForm] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		location: "",
		phoneNumber: "",
		termsAccepted: false,
	});

	const navigate = useNavigate();
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm({
			...form,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/order");
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
						{" "}
						Pizza
					</h3>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='input-container'>
						<input
							type='email'
							name='email'
							value={form.email}
							onChange={handleChange}
							placeholder=' '
						/>
						<label>Email address</label>
					</div>

					<div className='input-container'>
						<input
							type='password'
							name='password'
							value={form.password}
							onChange={handleChange}
							placeholder=' '
						/>
						<label>Password</label>
					</div>

					<div className='input-container'>
						<input
							type='password'
							name='confirmPassword'
							value={form.confirmPassword}
							onChange={handleChange}
							placeholder=' '
						/>
						<label>Confirm Password</label>
					</div>

					<div className='input-container'>
						<input
							type='text'
							name='location'
							value={form.location}
							onChange={handleChange}
							placeholder=' '
						/>
						<label>Location</label>
					</div>

					<div className='input-container'>
						<input
							type='text'
							name='phoneNumber'
							value={form.phoneNumber}
							onChange={handleChange}
							placeholder=' '
						/>
						<label>Phone Number</label>
					</div>

					<div>
						<input
							type='checkbox'
							name='termsAccepted'
							checked={form.termsAccepted}
							onChange={handleChange}
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
