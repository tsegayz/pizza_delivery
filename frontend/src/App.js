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

	// Fetching data from the database
	const fetchData = async () => {
		try {
			const response = await axios.get("/api/v1/pizzas");
			const { pizzas } = response.data.data;
			setPizza(pizzas);

			const response2 = await axios.get("/api/v1/restaurants");
			const { restaurants } = response2.data.data;
			setRestaurant(restaurants);

			console.log(pizzas);
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
						<Route path='/order' element={<Order />} />
						<Route path='/role' element={<Role />} />
						<Route path='/user' element={<User />} />
						<Route path='/addMenu' element={<AddMenu />} />
						<Route
							path='/orderHis'
							element={
								<>
									<NavBar />
									<OrderHistory />
								</>
							}
						/>
						<Route path='/Dashboard' element={<Dashboard />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
