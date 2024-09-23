{
	(" ");
}
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Order from "./components/Order";
import OrderHistory from "./components/OrderHistory";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

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
