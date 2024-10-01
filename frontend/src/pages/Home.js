import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pizza from "../assets/pizza.png";
import pizza2 from "../assets/pizza2.png";
import pizza3 from "../assets/pizza3.png";
import pizza4 from "../assets/pizza4.png";

import { RiSearch2Line } from "react-icons/ri";
import { PiBatteryChargingVerticalFill } from "react-icons/pi";
import { useState } from "react";
import logo from "../assets/logo.png";
import { FaFacebookF, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home({ data, restaurants }) {
	const popularPizzas = data.filter((item) => item.rating > 4.5);
	const [filteredPizzas, setfilteredPizzas] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const navigate = useNavigate();

	const handleOrderClick = (item) => {
		setSelectedItem(item);
		localStorage.setItem("selectedItem", JSON.stringify(item));
		navigate("/signup");
	};
	const pizzas = [
		{
			image: pizza4,
		},
		{
			image: pizza3,
		},
		{
			image: pizza2,
		},
	];
	const filterHandler = (e) => {
		const searchWord = e.target.value;
		const newFilter = data.filter((value) => {
			return value.name.toLowerCase().includes(searchWord.toLowerCase());
		});

		if (searchWord === "") {
			setfilteredPizzas([]);
		} else {
			setfilteredPizzas(newFilter);
		}
	};

	return (
		<div className='home'>
			<div className='home-container-one'>
				<div className='left-side'>
					<h1>Order us</h1>
					<p>
						In publishing and graphic design, Lorem ipsum is a placeholder text
						commonly used to demonstrate the visual form of a document or a
						typeface without relying on meaningful content.
					</p>
					<div className='search-bar'>
						<input
							className='input-field'
							type='text'
							onChange={filterHandler}
							placeholder='Search '
						/>
						<button className='search-icon'>
							<RiSearch2Line
								className='icon'
								style={{ color: "white", fontSize: "37px" }}
							/>
						</button>
					</div>
					<div>
						{filteredPizzas.length !== 0 && (
							<div className='search-results'>
								{filteredPizzas.map((value) => {
									return (
										<a
											className='search-item'
											target=''
											key={value._id}
											// onClick={() => handleClickPizza(value)}
										>
											{value.name}
										</a>
									);
								})}
							</div>
						)}
					</div>
				</div>
				<div className='right-side'>
					<img src={pizza} alt='Pizza' />
				</div>
			</div>
			<div className='home-container-two'>
				<h1> Featured pizza</h1>
				<Carousel
					autoPlay
					interval={3000}
					infiniteLoop
					showIndicators={true}
					showStatus={false}
					showThumbs={false}
					showArrows={false}
					renderIndicator={(onClickHandler, isSelected, index) => (
						<li
							className={`indicator ${isSelected ? "active" : ""}`}
							onClick={onClickHandler}
							key={index}
						/>
					)}
				>
					{pizzas.map((item, index) => {
						const cardColors = ["#2F2F2F", "#50482B", "#296D60"];
						const cardColor = cardColors[index % cardColors.length];

						return (
							<div className='card' style={{ backgroundColor: cardColor }}>
								<div className='card-content'>
									<h2>
										Make Your First Order
										<br />
										and Get <span style={{ color: "#FF8507" }}>50% Off</span>
									</h2>
									<p>
										In publishing and graphic design, Lorem ipsum is a
										placeholder text commonly used to demonstrate the visual
										form of a document or a typeface without.
									</p>
									<button className='order-button'>
										<Link
											to='/signup'
											style={{ textDecoration: "none", color: "white" }}
										>
											Order Now
										</Link>
									</button>
								</div>
								<div className='card-image'>
									<img src={item.image} alt='Promo 1' />
								</div>
							</div>
						);
					})}
				</Carousel>
			</div>
			<div className='home-container-three'>
				<h1> Top Restaurants</h1>
				<div className='cards-two'>
					{restaurants.map((item, index) => (
						<div className='slide'>
							<div className='one'>
								<div style={{ display: "flex" }}>
									<img
										src={item.image}
										style={{
											width: "70px",
											height: "70px",
											borderRadius: "50%",
										}}
									/>
									<h4
										style={{ marginTop: "15px", fontSize: "20px", margin: 0 }}
									>
										{item.name}
									</h4>
								</div>
								<p style={{ textAlign: "start", fontSize: "14px" }}>
									{item.description}...
								</p>
							</div>
							<div className='two'>
								<PiBatteryChargingVerticalFill
									style={{
										color: "#ff8507",
										backgroundColor: "#fed1a3",
										padding: "8px",
										fontSize: "80px",
										marginRight: "30px",
										borderRadius: "50%",
									}}
								/>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "start",
									}}
								>
									<p style={{ margin: "0", color: "grey" }}> Number of order</p>
									<h2
										style={{ margin: "0", fontSize: "50px", color: "#ff8507" }}
									>
										{item.noOfOrder}
									</h2>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='home-container-four'>
				<h1> Popular Pizzas</h1>
				<div className='grid-container'>
					{popularPizzas.slice(0, 6).map((pizza, index) => {
						const restaurant = restaurants.find(
							(r) => r._id === pizza.restaurant_id
						);

						return (
							<div className='card' key={index}>
								<img
									src={pizza.image}
									alt={pizza.name}
									className='pizza-image'
									style={{ margin: "0px 0" }}
								/>
								<div className='card-content'>
									<h3
										style={{
											margin: "0",
											fontSize: "30px",
											marginTop: "-0.1em",
										}}
									>
										{pizza.name}
									</h3>
									<p style={{ margin: "0", fontSize: "16px", width: "100%" }}>
										{pizza.ingredient}
									</p>
									<div className='price-order'>
										<span className='price'>
											<h2 style={{ color: "#27ae60", fontSize: "50px" }}>
												{pizza.price}
											</h2>
											Birr
										</span>
										<button
											className='order-button'
											onClick={() => handleOrderClick(pizza)}
										>
											Order
										</button>
									</div>
									<div className='footer'>
										{restaurant && (
											<>
												<img
													src={restaurant.image}
													alt={restaurant.name}
													className='person-image'
												/>
												<span style={{ fontSize: "16px" }}>
													{restaurant.name}
												</span>
											</>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className='home-container-five'>
				<h1> Fasting</h1>
				<div className='grid-container'>
					{data.map((pizza, index) => {
						const restaurant = restaurants.find(
							(r) => r._id === pizza.restaurant_id
						);
						return (
							<div className='card' key={index}>
								<img
									src={pizza.image}
									alt={pizza.name}
									className='pizza-image'
								/>
								<div className='card-content'>
									<h3 style={{ margin: "0", fontSize: "24px" }}>
										{pizza.name}
									</h3>
									<p style={{ margin: "0", fontSize: "16px", width: "100%" }}>
										{pizza.ingredient}
									</p>
									<div className='price-order'>
										<span className='price'>
											<h2 style={{ color: "#27ae60", fontSize: "50px" }}>
												{pizza.price}
											</h2>
											Birr
										</span>
										<button
											className='order-button'
											onClick={() => handleOrderClick(pizza)}
										>
											Order
										</button>
									</div>
									<div className='footer'>
										{restaurant && (
											<>
												<img
													src={restaurant.image}
													alt={restaurant.name}
													className='person-image'
												/>
												<span style={{ fontSize: "20px" }}>
													{restaurant.name}
												</span>
											</>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<footer class='footer'>
				<div class='footer-top'>
					<nav class='footer-nav'>
						<a href='#'>Home</a>
						<a href='#'>Order</a>
						<a href='#'>About Us</a>
					</nav>

					<div class='feedback'>
						<div class='footer-logo'>
							<img src={logo} alt='Pizza Logo' class='logo-image' />
							<span>Pizza</span>
						</div>
						<div class='feedback-container'>
							<input
								type='text'
								placeholder='Your feedback...'
								class='feedback-input'
							/>
							<button class='feedback-button'>✈️</button>
						</div>
					</div>
				</div>
				<div class='footer-bottom'>
					<div style={{ paddingLeft: "20px" }} className='copyrgiht'>
						<span>@2024 Pizza All Rights Reserved.</span>
						<a href='#'>Terms & Conditions</a>
					</div>

					<div class='social-icons'>
						<a href='#'>
							<FaFacebookF />
						</a>
						<a href='#'>
							<FaLinkedin />
						</a>
						<a href='#'>
							<FaTwitter />
						</a>
						<a href='#'>
							<FaYoutube />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Home;
