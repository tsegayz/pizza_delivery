import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { setAuthorizationHeader } from './axiosConfig'; 
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
import axios from 'axios';
import AddAdmin from './pages/AddAdmin';

const API_URL = "https://pizza-delivery-dggx.onrender.com" ;

function App() {
	const [pizza, setPizza] = useState([]);
	const [restaurant, setRestaurant] = useState([]);
	const [order, setOrder] = useState([]);
	const [user, setUser] = useState([]);
	const [role, setRole] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// Fetching data from the database
	const fetchData = async () => {
		try {
			const response = await axios.get(`${API_URL}/api/v1/pizzas`);
			const { pizzas } = response.data.data;
			setPizza(pizzas);

			const response2 = await axios.get(`${API_URL}/api/v1/restaurants`);
			const { restaurants } = response2.data.data;
			setRestaurant(restaurants);

			const response3 = await axios.get(`${API_URL}/api/v1/orders`);
			const { orders } = response3.data.data;
			setOrder(orders);

			const response4 = await axios.get(`${API_URL}/api/v1/users`);
			const { users } = response4.data.data;
			setUser(users);

			const response5 = await axios.get(`${API_URL}/api/v1/roles`);
			const { roles } = response5.data.data;
			setRole(roles);

			console.log(response)

		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		setAuthorizationHeader(); 

		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true); 
			fetchData(); 
		}
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
						<Route path='/signin' element={<SignIn setIsAuthenticated={setIsAuthenticated}/>} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/about' element={<About />} />
						<Route path='/order/:itemId' element={<Order />} />
						<Route path='/role' element={<Role data={role}/>} />
						<Route path='/user' element={<User data={user} />} />
						<Route path='/addMenu' element={<AddMenu />} />
						<Route path='/addAdmin' element={<AddAdmin />} />
						<Route
							path='/orderHis'
							element={
								<>
									<NavBar />
									<OrderHistory />
								</>
							}
						/>
						<Route path='/Dashboard' element={<Dashboard data={order} users={user} />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;