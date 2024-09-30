import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./pages/NavBar";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/DashboardOrders";
import AddMenu from "./pages/AddMenu";
import Role from "./pages/Role";
import User from "./pages/User";

function App() {
	const [pizza, setPizza] = useState([]);
	const [restaurant, setRestaurant] = useState([]);
	const [order, setOrder] = useState([]);
	const [user, setUser] = useState([]);
	const [role, setRole] = useState([]);
	

	// Fetching data from the database
	const fetchData = async () => {
		try {
			const response = await axios.get("/api/v1/pizzas");
			const { pizzas } = response.data.data;
			setPizza(pizzas);

			const response2 = await axios.get("/api/v1/restaurants");
			const { restaurants } = response2.data.data;
			setRestaurant(restaurants);

			const response3 = await axios.get("/api/v1/orders");
			const { orders } = response3.data.data;
			setRestaurant(orders);

			console.log(response3)

			const response4 = await axios.get("/api/v1/users");
			const { users } = response4.data.data;
			setRestaurant(users);
			
			const response5 = await axios.get("/api/v1/role");
			const { roles } = response5.data.data;
			setRestaurant(roles);

		} catch (error) {
			console.error("Error fetching location types:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className='App'>
			<Router>
				<div className='content'>
					<Routes>
						<Route
							path='/'
							element={
								<>
									<NavBar />
									<Home data={pizza} restaurants={restaurant} />
								</>
							}
						/>
						<Route path='/signin' element={<SignIn />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/about' element={<About />} />
						<Route path='/order/:itemId' element={<Order />} />
						<Route path='/role' element={<Role data={role}/>} />
						<Route path='/user' element={<User data={user} />} />
						<Route path='/addMenu' element={<AddMenu />} />
						<Route
							path='/orderHis'
							element={
								<>
									<NavBar />
									<OrderHistory data={order} />
								</>
							}
						/>
						<Route path='/Dashboard' element={<Dashboard data={order} />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
