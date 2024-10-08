import { useState } from "react";
import { FaBell, FaDownload, FaEye, FaUserCircle } from "react-icons/fa";
import Modal from "react-modal";
import Sidebar from "../components/Sidebar";
import pizza3 from "../assets/pizza3.png";

function Dashboard({data, users}) {
	const [orders, setOrders] = useState(data);
	const [showModal, setShowModal] = useState(false);
	const [selectedOrderId, setSelectedOrderId] = useState(null);

	const showDetail = (orderId) => {
		setSelectedOrderId(orderId);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedOrderId(null);
	};

	const updateStatus = (index, newStatus) => {
		const updatedOrders = [...orders];
		updatedOrders[index].status = newStatus;
		setOrders(updatedOrders);
	};
	const getUserPhoneNumber = (userId) => {
		const user = users.find(user => user._id === userId);
		return user ? user.phoneNumber : "Phone number not found";
	  };
	  
	console.log(orders)

	const getSelectedOrder = () => {
		console.log(orders.find((order) => order._id === selectedOrderId));
		return orders.find((order) => order._id === selectedOrderId);
	};

	const exportToCSV = () => {
		const headers = "Name,Topping,Quantity,Customer No,Created At,Status\n";
		const rows = orders
			.map(
				(order) =>
					`${order.name},${order.topping.join(",")},${order.quantity},${
						order.customerNo
					},${order.createdAt},${order.status}`
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
						<h4 style={{ margin: "15px", marginLeft: "10px" }}> Package</h4>
						<button onClick={exportToCSV} className='csv-btn'>
							<FaDownload style={{ marginRight: "8px" }} />
						</button>
					</div>
					<table className='orders-table'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Topping</th>
								<th>Quantity</th>
								<th>Customer No</th>
								<th>Created At</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{data.map((order, index) => (
								<tr key={index}>
									<td>
										<img
											src={pizza3}
											style={{ width: "1.4em", height: "auto" }}
											alt={order.name}
										/>
										{order.name}
									</td>
									<td>
										<button
											onClick={() => showDetail(order._id)}
											style={{
												color: "#ff9a34",
												border: "none",
												backgroundColor: "transparent",
												fontSize: "16px",
											}}
										>
											<FaEye style={{ paddingRight: "4px" }} />
											Toppings
										</button>
									</td>
									<td>{order.quantity}</td>
									<td>{getUserPhoneNumber(order.user_id)}</td>
									<td>{order.createdAt}</td>
									<td>
										<select
											value={order.status}
											onChange={(e) => updateStatus(index, e.target.value)}
											className='status-select'
											style={{
												backgroundColor:
													order.status === "Preparing"
														? "#FFA500"
														: order.status === "Ready"
														? "#00FF00"
														: "#90EE90",
											}}
										>
											<option value='Preparing'>Preparing</option>
											<option value='Ready'>Ready</option>
											<option value='Delivered'>Delivered</option>
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{selectedOrderId && (
				<Modal
					isOpen={showModal}
					onRequestClose={closeModal}
					className='modal'
					overlayClassName='modal-overlay'
				>
					<div className='modal-content'>
						<button
							className='close-button'
							onClick={closeModal}
							style={{
								borderRadius: "50%",
								fontSize: "20px",
								marginLeft: "17em",
								marginTop: "-50px",
							}}
						>
							&times;
						</button>
						<h2 style={{ fontSize: "20px", color: "black" }}>Order Detail</h2>
						{getSelectedOrder() ? (
							<ul
								style={{
									listStyle: "none",
									display: "flex",
									flexDirection: "column",
									alignItems: "start",
									fontSize: "18px",
								}}
							>
								<li>Name: {getSelectedOrder().name}</li>
								<li>Toppings: {getSelectedOrder().toppings?.join(", ")}</li>
								<li>Quantity: {getSelectedOrder().quantity}</li>
							</ul>
						) : (
							<p>Order not found</p>
						)}
					</div>
				</Modal>
			)}
		</div>
	);
}

export default Dashboard;
