import React, { useState } from "react";
import Modal from "react-modal";
import pizza3 from "../assets/pizza3.png";
import pizza4 from "../assets/pizza4.png";
import { GoArrowUpRight } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

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
	const [mainPizza, setMainPizza] = useState(pizza3);
	const [animate, setAnimate] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [showModal, setShowModal] = useState(false);
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

	const handleOrder = () => {
		console.log("Order placed", { quantity, ingredients });
		setShowModal(true);
	};
	const closeModal = () => {
		setShowModal(false);
	};
	const selectPizza = (pizza) => {
		setAnimate(true);
		setTimeout(() => {
			setMainPizza(pizza);
			setAnimate(false);
		}, 600);
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
					<div style={{ display: "flex", flexDirection: "column" }}>
						<img
							src={pizza3}
							alt='Margherita pizza'
							style={{ width: "16em", height: "auto", cursor: "pointer" }}
							onClick={() => selectPizza(pizza3)}
						/>
						<img
							src={pizza4}
							alt='Pepperoni pizza'
							style={{ width: "16em", height: "auto", cursor: "pointer" }}
							onClick={() => selectPizza(pizza4)}
						/>
					</div>
				</div>
				<div className='details-section'>
					<h1>Margherita</h1>
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
							{quantity * 150}{" "}
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
