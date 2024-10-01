import { useState } from "react";
import { FaBell, FaDownload, FaEye, FaUserCircle } from "react-icons/fa";
import Modal from "react-modal";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function User({ data }) {
	const [users, setUsers] = useState(data);
	const [showModal, setShowModal] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState(null);

	const showForm = () => {
		setShowModal(true);
	};
	const closeModal = () => {
		setShowModal(false);
		setSelectedUserId(null);
	};

	const toggleStatus = (index) => {
		const newData = [...users];
		newData[index].status =
			newData[index].status === "Active" ? "Inactive" : "Active";
		setUsers(newData);
	};

	const exportToCSV = () => {
		const headers = "Name,Phone No,Email,Status\n";
		const rows = users
			.map(
				(user) => `${user.name},${user.phoneNo},${user.email},${user.status}`
			)
			.join("\n");
		const csvData = `${headers}${rows}`;

		const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		const url = URL.createObjectURL(blob);
		link.setAttribute("href", url);
		link.setAttribute("download", "users.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [role, setRole] = useState("");
	const [responseMessage, setResponseMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setResponseMessage("");
	
		// Log the inputs to see their values
		console.log({ name, email, phoneNumber, role });
	
		if (!name || !email || !phoneNumber || !role) {
			setResponseMessage("Please fill in all the fields");
			return;
		}
	
		// No need to use FormData unless you're uploading files
		const userData = {
			name,
			email,
			phoneNumber,
			role,
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
	
			// Handle successful response
			const userDataResponse = response.data.data; // Adjust as necessary
			setResponseMessage(response.data.status);
			setUsers((prevUsers) => [...prevUsers, userDataResponse]); // Update the users state to reflect new user
			setName(""); // Reset form fields
			setEmail("");
			setPhoneNumber("");
			setRole("");
			closeModal(); // Close modal after successful submission
		} catch (error) {
			if (error.response) {
				setResponseMessage(error.response.data.message || "An error occurred");
			} else {
				setResponseMessage("An error occurred");
			}
		}
	};
	
	return (
		<div className='dashboard-container'>
			<Sidebar />
			<div className='content'>
				<header>
					<h1>Orders</h1>
					<div>
						<FaBell style={{ fontSize: "30px", marginRight: "10px" }} />
						<FaUserCircle style={{ fontSize: "30px" }} />
					</div>
				</header>
				<div className='main-content'>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							border: "1px #a8a8a8 solid",
						}}
					>
						<button
							onClick={() => showForm()}
							style={{
								margin: "15px",
								marginLeft: "10px",
								backgroundColor: "#ff9a34",
								border: "none",
								padding: "10px 20px",
								borderRadius: "4px",
								color: "white",
								fontSize: "18px",
							}}
						>
							Add User
						</button>
						<button onClick={exportToCSV} className='csv-btn'>
							<FaDownload style={{ marginRight: "8px" }} />
						</button>
					</div>
					<table className='orders-table'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Phone No</th>
								<th>Email</th>
								<th>Status</th>
							</tr>
						</thead>
						{users.map((user, index) => (
							<tr key={user._id}>
								<td>{user.name}</td>
								<td>{user.phoneNumber}</td>
								<td>{user.email}</td>
								<td>
									<div
										className={`status-container ${
											user.status === "Active" ? "active" : "inactive"
										}`}
									>
										<div className='toggle'>
											<label className='toggle-switch'>
												<input
													type='checkbox'
													checked={user.status === "Active"}
													onChange={() => toggleStatus(index)}
												/>
												<span className='slider'></span>
											</label>
											<span className='status-text'>{user.status}</span>
										</div>
										<span className='icon'>🗑️</span>
									</div>
								</td>
							</tr>
						))}
					</table>
				</div>
			</div>
			<Modal
				isOpen={showModal}
				onRequestClose={closeModal}
				className='modal'
				overlayClassName='modal-overlay'
			>
				<form onSubmit={handleSubmit}>
					<div
						className='modal-content'
						style={{
							width: "30em",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<h2 style={{ fontSize: "20px", color: "black" }}> New User</h2>
						<div className='input-container' style={{ margin: "20px" }}>
							<input
								type='text'
								name='name'
								id='name'
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
								placeholder=' '
								required
							/>
							<label htmlFor='name'>Name</label>
						</div>
						<div className='input-container' style={{ margin: "20px" }}>
							<input
								type='email'
								name='email'
								id='name'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								placeholder=' '
								required
							/>
							<label htmlFor='name'>Email</label>
						</div>
						<div className='input-container' style={{ margin: "20px" }}>
							<input
								type='text'
								name='phoneNumber' 
								id='phoneNumber' 
								value={phoneNumber}
								onChange={(e) => {
									setPhoneNumber(e.target.value);
								}}
								placeholder=' '
								required
							/>
							<label htmlFor='name'>Phone Number</label>
						</div>
						<div>
							<select
								name='role'
								value={role}
								onChange={(e) => setRole(e.target.value)}
								style={{
									margin: "20px",
									width: "13em",
									padding: "15px 20px",
									border: "#d6d6d6 solid 1px",
									borderRadius: "5px",
									backgroundColor: "white",
								}}
							>
								{["User", "Admin", "manager"].map((option, index) => (
									<option
										key={index}
										value={option}
										style={{
											border: "none",
											backgroundColor: "white",
											margin: "10px",
										}}
									>
										{option}
									</option>
								))}
							</select>
							<button
								type='submit'
								className='submit-btn'
								style={{ margin: "20px", width: "10em", padding: "15px 30px" }}
							>
								Add
							</button>
						</div>
					</div>
				</form>
			</Modal>
		</div>
	);
}

export default User;
