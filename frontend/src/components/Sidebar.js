import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBox, FaPizzaSlice, FaUser, FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import logo from "../assets/logo.png";
import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";

function Sidebar() {
	const [activateLink, setActivateLink] = useState("/dashboard");

	function handleNavLinkClick(path) {
		setActivateLink(path);
	}

	const sidebar = [
		{
			title: "Orders",
			icons: <FaBox />,
			link: "/dashboard",
		},
		{
			title: "Add menu",
			icons: <FaPizzaSlice />,
			link: "/addMenu",
		},
		{
			title: "Role",
			icons: <FaUser />,
			link: "/role",
		},
		{
			title: "User",
			icons: <FaUserCircle />,
			link: "/user",
		},
	];

	return (
		<div className={styles["sidebar-container"]}>
			<h1 style={{ padding: "23px 84px", backgroundColor:'#f8f9fa', margin:"0" }}>Pizza</h1>
			<span>
				<img
					src={logo}
					style={{
						width: "13.7em",
						backgroundColor: "#ffe7d0b4",
						padding: "26px 90px",
					}}
				/>
			</span>
			<ul>
				{sidebar.map((item, index) => (
					<li key={index}>
						<NavLink
							to={item.link}
							className={({ isActive }) => (isActive ? styles.selected : "")}
							onClick={() => handleNavLinkClick(item.link)}
						>
							<span>{item.icons}</span>
							<p>{item.title}</p>
						</NavLink>
					</li>
				))}
			</ul>
			<Link
				to='/signup'
				style={{
					textDecoration: "none",
					color: "red",
					display: "flex",
					alignItems: "center",
          fontSize:'25px',
          marginTop:'20px',
          borderTop:'1px solid #d1d1d1',
          padding:'20px 20px 0',
          width:'80%'
				}}
			>
				<MdOutlineLogout />
				Log Out
			</Link>
		</div>
	);
}

export default Sidebar;
