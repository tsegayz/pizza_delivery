import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const [form, setForm] = useState({
		email: "",
		password: "",
		remmber: false,
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
		<div className="sign">
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

					<div>
						<input
							type='checkbox'
							name='remember'
							checked={form.termsAccepted}
							onChange={handleChange}
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
