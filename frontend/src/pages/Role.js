import { useState } from "react";
import { FaBell, FaDownload, FaEye, FaUserCircle } from "react-icons/fa";
import Modal from "react-modal";
import Sidebar from "../components/Sidebar";
import Switch from "react-switch";

const initialRoles = [
	{
		id: 1,
		name: "kitchen manager",
		createdAt: "2:44 PM 8/14/24",
		actions: "inactive",
	},
	{
		id: 2,
		name: "cashier",
		createdAt: "2:44 PM 8/14/24",
		status: "inactive",
	},
	{
		id: 3,
		name: "Branch manager",
		createdAt: "2:44 PM 8/14/24",
		status: "inactive",
	},
];

function Role() {
	const [roles, setRoles] = useState(initialRoles);
	const [showModal, setShowModal] = useState(false);
	const [selectedRoleId, setSelectedRoleId] = useState(null);
	const [form, setForm] = useState({ name: "", price: "" });
	const showForm = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedRoleId(null);
	};
	const [permissions, setPermissions] = useState({
		update: true,
		seeOrders: false,
		addUsers: true,
		createRoles: true,
		seeCustomers: false,
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleCheckboxChange = (e) => {
		setPermissions({ ...permissions, [e.target.name]: e.target.checked });
	};
	const toggleStatus = (index) => {
		const newData = [...roles];
		newData[index].active = !newData[index].active;
		newData[index].status = newData[index].active ? "Active" : "Inactive";
		setRoles(newData);
	};
	const exportToCSV = () => {
		const headers = "Role Name,Created At, Actions\n";
		const rows = roles
			.map(
				(role) =>
					`${role.name},${role.topping.join(",")},${role.quantity},${
						role.customerNo
					},${role.createdAt},${role.status}`
			)
			.join("\n");
		const csvData = `${headers}${rows}`;

		const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		const url = URL.createObjectURL(blob);
		link.setAttribute("href", url);
		link.setAttribute("download", "orders.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className='dashboard-container roles'>
			<Sidebar />
			<div className='content'>
				<header>
					<h1>Role</h1>
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
							Add Role
						</button>
						<button onClick={exportToCSV} className='csv-btn'>
							<FaDownload style={{ marginRight: "8px" }} />
						</button>
					</div>
					<table className='orders-table'>
						<thead>
							<tr>
								<th> Role Name</th>
								<th>Created At</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{roles.map((role, index) => (
								<tr key={index}>
									<td>{role.name}</td>
									<td>{role.createdAt}</td>
									<td>
										<div
											className={`status-container ${
												role.active ? "active" : "inactive"
											}`}
										>
											<div className='toggle'>
												<label className='toggle-switch'>
													<input
														type='checkbox'
														checked={role.active}
														onChange={() => toggleStatus(index)}
													/>
													<span className='slider'></span>
												</label>
												<span className='status-text'>{role.status}</span>
											</div>
											<span className='icon'>👁️</span>
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
					<h2 style={{ fontSize: "20px", color: "black" }}>Role</h2>
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
					<h3
						style={{
							color: "grey",
							margin: "0",
							fontSize: "20px",
							marginLeft: "-15em",
						}}
					>
						Permissions
					</h3>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							alignItems: "flex-start",
						}}
					>
						{Object.keys(permissions).map((permission) => (
							<label
								key={permission}
								style={{
									width: "30%",
									display: "flex",
									alignItems: "center",
									marginLeft: "50px",
									marginTop: "10px",
								}}
							>
								<input
									type='checkbox'
									name={permission}
									checked={permissions[permission]}
									onChange={handleCheckboxChange}
								/>
								{permission.charAt(0).toUpperCase() + permission.slice(1)}
							</label>
						))}
					</div>

					<button
						type='submit'
						className='submit-btn'
						style={{ margin: "20px", width: "10em", padding: "15px 30px" }}
					>
						Update
					</button>
				</div>
			</Modal>
		</div>
	);
}

export default Role;
