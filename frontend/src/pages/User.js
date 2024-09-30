import { useState } from "react";
import { FaBell, FaDownload, FaEye, FaUserCircle } from "react-icons/fa";
import Modal from "react-modal";
import Sidebar from "../components/Sidebar";
import pizza3 from "../assets/pizza3.png";

const userData = [
	{
		id: 1,
		name: "blen",
		phoneNo: "+251 1523654789",
		email: "example@gmail.com",
		status: "inactive",
	},
	{
		id: 2,
		name: "sara",
		phoneNo: "+251 1523654789",
		email: "example@gmail.com",
		status: "inactive",
	},
	{
		id: 3,
		name: "amen",
		phoneNo: "+251 1523654789",
		email: "example@gmail.com",
		status: "inactive",
	},
	{
		id: 4,
		name: "tim",
		phoneNo: "+251 1523654789",
		email: "example@gmail.com",
		status: "inactive",
	},
	{
		id: 5,
		name: "john",
		phoneNo: "+251 1523654789",
		email: "example@gmail.com",
		status: "inactive",
	},
	{
		id: 6,
		name: "mark",
		phoneNo: "+251 1523654789",
		email: "example@gmail.com",
		status: "inactive",
	},
];

function User({data}) {
	const [users, setUsers] = useState(userData);
	const [showModal, setShowModal] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [form, setForm] = useState({ name: "", phoneNo: "", email: "" });
	const showForm = () => {
		setShowModal(true);
	};
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const showDetail = (userId) => {
		setSelectedUserId(userId);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedUserId(null);
	};

	const updateStatus = (index, newStatus) => {
		const updatedUsers = [...users];
		updatedUsers[index].status = newStatus;
		setUsers(updatedUsers);
	};

	const getSelectedOrder = () => {
		return users.find((user) => user.id === selectedUserId);
	};
	const toggleStatus = (index) => {
		const newData = [...users];
		newData[index].active = !newData[index].active;
		newData[index].status = newData[index].active ? "Active" : "Inactive";
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
						<tbody>
							{users.map((user, index) => (
								<tr key={index}>
									<td>{user.name}</td>
									<td>{user.phoneNo}</td>
									<td>{user.email}</td>
									<td>
										<div
											className={`status-container ${
												user.active ? "active" : "inactive"
											}`}
										>
											<div className='toggle'>
												<label className='toggle-switch'>
													<input
														type='checkbox'
														checked={user.active}
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
						</tbody>
					</table>
				</div>
			</div>
			<Modal
				isOpen={showModal}
				onRequestClose={closeModal}
				className='modal'
				overlayClassName='modal-overlay'
			>
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
							value={form.name}
							onChange={handleChange}
							placeholder=' '
							required
						/>
						<label htmlFor='name'>Name</label>
					</div>
					<div className='input-container' style={{ margin: "20px" }}>
						<input
							type='email'
							name='Email'
							id='name'
							value={form.name}
							onChange={handleChange}
							placeholder=' '
							required
						/>
						<label htmlFor='name'>Email</label>
					</div>
					<div className='input-container' style={{ margin: "20px" }}>
						<input
							type='phone number'
							name='Phone Number'
							id='name'
							value={form.name}
							onChange={handleChange}
							placeholder=' '
							required
						/>
						<label htmlFor='name'>Phone Number</label>
					</div>
					<div>
						<select
							style={{ margin: "20px", width: "13em", padding: "15px 20px", border:'#d6d6d6 solid 1px', borderRadius:'5px', backgroundColor:'white' }}
						>
							{["customer", "admin", "manager"].map((option, index) => (
								<option
									key={index}
									value={option}
									style={{ border: "none", backgroundColor: "white", margin:'10px' }}
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
			</Modal>
		</div>
	);
}

export default User;
