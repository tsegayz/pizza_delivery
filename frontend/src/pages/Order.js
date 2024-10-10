import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import pizza3 from "../assets/pizza3.png";
import pizza4 from "../assets/pizza4.png";
import { GoArrowUpRight } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Order() {
	const popularPizza = [
		{
			name: "Margherita",
			description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
			image: pizza3,
		},
		{
			name: "Pepperoni",
			description: "Pepperoni, Mozzarella, Tomato Sauce",
			image: pizza3,
		},
		{
			name: "BBQ Chicken",
			description: "BBQ Sauce, Chicken, Mozzarella, Onions",
			image: pizza4,
		},
		{
			name: "Hawaiian",
			description: "Ham, Pineapple, Mozzarella, Tomato Sauce",
			image: pizza4,
		},
		{
			name: "Veggie",
			description: "Bell Peppers, Onions, Mushrooms, Olives, Mozzarella",
			image: pizza3,
		},
		{
			name: "Four Cheese",
			description: "Mozzarella, Parmesan, Gorgonzola, Ricotta",
			image: pizza4,
		},
	];
	const [responseMessage, setResponseMessage] = useState("");
	const [animate, setAnimate] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [showModal, setShowModal] = useState(false);
	const [pizzaName, setPizzaName] = useState("");
	const [name, setName] = useState([]);
	const [price, setPrice] = useState(150); // Base price for a pizza

	const [ingredients, setIngredients] = useState({
		mozzarella: true,
		tomato: true,
		bellPeppers: true,
		onions: false,
		olives: false,
	});

	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		setIngredients({ ...ingredients, [name]: checked });
	};

	const increaseQuantity = () => setQuantity(quantity + 1);
	const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

	const handleOrder = async (e) => {
		e.preventDefault();

		// Create an array of selected toppings based on ingredients state
		const selectedToppings = Object.keys(ingredients).filter(
			(ingredient) => ingredients[ingredient]
		);

		try {
			const storedUser = localStorage.getItem("user");
			const user = storedUser ? JSON.parse(storedUser) : null; // Retrieve user object from local storage
			const user_id = user ? user._id : null; // Get the user ID

			if (!user_id) {
				throw new Error("User ID is missing. Please log in.");
			}

			const token = localStorage.getItem("token"); // Retrieve the token from local storage

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const response = await axios.post(
				"https://pizza-delivery-backend-deploy.vercel.app/api/v1/orders",
				{
					name: name,
					user_id: user_id,
					pizzaName: pizzaName || "Margherita",
					toppings: selectedToppings,
					quantity: quantity,
					price: price * quantity,
				},
				axiosConfig
			);

			// console.log("Response:", response.data);
			setResponseMessage(response.data);
		} catch (error) {
			if (error.response) {
				console.error("Error Response:", error.response.data);
				setResponseMessage(error.response.data.message || "An error occurred");
			} else {
				console.error("Error:", error);
				setResponseMessage("An error occurred");
			}
		}
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const location = useLocation();
	const [selectedItem, setSelectedItem] = useState(
		location.state?.selectedItem || null
	);
	const [mainPizza, setMainPizza] = useState(null);

	useEffect(() => {
		console.log("Selected Item:", selectedItem);
		if (!selectedItem) {
			const item = JSON.parse(localStorage.getItem("selectedItem"));
			if (item) {
				setSelectedItem(item);
				setMainPizza(item.image);
				setName(item.name);
			}
		} else {
			setMainPizza(selectedItem.image);
		}
	}, [selectedItem]);

	if (!selectedItem) {
		return <div>No item selected. Please go back to the home page.</div>;
	}
	const selectPizza = (pizza) => {
		setMainPizza(pizza);
	};
	return (
		<div className='personal-order'>
			<div className='container'>
				<div className='pizza-image' style={{ display: "flex" }}>
					<div className={`main-pizza ${animate ? "roll-out" : ""}`}>
						<img
							src={mainPizza}
							alt='Selected pizza'
							style={{ width: "30em", height: "auto" }}
						/>
					</div>
					<div className="pizza-option" style={{ display: "flex", flexDirection: "column" }}>
						<img
							src={pizza3}
							alt='Margherita pizza'
							style={{ width: "13em", height: "auto", cursor: "pointer" }}
							onClick={() => selectPizza(pizza3)}
						/>
						<img
							src={pizza4}
							alt='Pepperoni pizza'
							style={{ width: "13em", height: "auto", cursor: "pointer" }}
							onClick={() => selectPizza(pizza4)}
						/>
					</div>
				</div>
				<div className='details-section'>
					<h1>{name}</h1>
					<div className='ingredients'>
						{Object.keys(ingredients).map((ingredient) => (
							<label key={ingredient}>
								<input
									type='checkbox'
									name={ingredient}
									checked={ingredients[ingredient]}
									onChange={handleCheckboxChange}
								/>
								{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
							</label>
						))}
					</div>
					<div className='order-section'>
						<button onClick={decreaseQuantity}>-</button>
						<span style={{ fontSize: "30px", padding: "0 30px" }}>
							{quantity}
						</span>
						<button onClick={increaseQuantity}>+</button>
						<h2 className='price'>
							{quantity * price}{" "}
							<span style={{ color: "grey", fontSize: "14px" }}>Birr</span>{" "}
						</h2>
					</div>

					<button className='order-button' onClick={handleOrder}>
						Order
						<GoArrowUpRight />
					</button>
				</div>
			</div>
			<div className='ordered-page'>
				<h1
					style={{
						marginLeft: "40px",
						color: "grey",
						fontSize: "40px",
						marginTop: "0",
					}}
				>
					Related
				</h1>
				<div className='grid-container'>
					{popularPizza.map((pizza, index) => (
						<div className='card' key={index} style={{ padding: "0px" }}>
							<img
								src={pizza.image}
								alt={pizza.name}
								className='pizza-image'
								style={{ marginLeft: "6em" }}
							/>
							<div
								className='card-content'
								style={{ display: "flex", alignItems: "center" }}
							>
								<h3 style={{ margin: "0", fontSize: "30px" }}>{pizza.name}</h3>
								<p style={{ margin: "0", width: "100%", textAlign: "center" }}>
									{pizza.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<Modal
				isOpen={showModal}
				onRequestClose={closeModal}
				className='modal'
				overlayClassName='modal-overlay'
			>
				<div className='modal-content'>
					<FaCheckCircle
						style={{
							fontSize: "16em",
							color: "#05C605",
							backgroundColor: "#E6F9E6",
							padding: "35px",
							borderRadius: "50%",
						}}
					/>
					<h2>Your order has been successfully completed</h2>
				</div>
			</Modal>
		</div>
	);
}

export default Order;
