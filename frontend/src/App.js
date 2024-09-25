import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
									<Home />
								</>
							}
						/>
						<Route path='/signin' element={<SignIn />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/about' element={<About />} />
						<Route path='/order' element={<Order />} />
						<Route path='/role' element={<Role/>} />
						<Route path='/user' element={<User/>} />
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
