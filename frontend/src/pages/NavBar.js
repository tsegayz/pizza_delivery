import React from "react";
import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";

function NavBar() {
	return (
		<div className='navbar'>
			<div className='logo'>
				<img src={logo} alt='Logo' />
				<h1>Pizza</h1>
			</div>
			<div>
				<ul className='menu'>
					<li>
						<NavLink to='/' activeClassName='active'>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to='/orderHis' activeClassName='active'>
							Orders
						</NavLink>
					</li>
					<li>
						<NavLink to='/about' activeClassName='active'>
							Who We Are
						</NavLink>
					</li>
				</ul>
			</div>
			<div className='register'>
				<Link to='/signin'>Register</Link>
			</div>
		</div>
	);
}

export default NavBar;
