import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBox, FaPizzaSlice, FaTv, FaUser, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import styles from './SideBar.module.css';

function Sidebar() {
  const [activateLink, setActivateLink] = useState('/dashboard');

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
      icons: <FaUserCircle/>,
      link: "/user",
    }
  ];

  return (
    <div className={styles['sidebar-container']}>
      <h1 style={{padding:'0px 84px', }}>Pizza</h1>
      <span>
        <img src={logo} style={{width:'13.5em', backgroundColor:'#ffe7d0b4', padding:'26px 90px'}}/>
      </span>
      <ul>
        {sidebar.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive ? styles.selected : ''
              }
              onClick={() => handleNavLinkClick(item.link)}
            >
              <span>{item.icons}</span>
              <p>{item.title}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
