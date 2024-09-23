import Modal from "react-modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import pizza3 from "../assets/pizza3.png";
import pizza4 from "../assets/pizza4.png";

function Order() {
	const [showModal, setShowModal] = useState(false);
	const [pizzaSize, setPizzaSize] = useState(1);
	const [pizzaCount, setPizzaCount] = useState(1);
	const [pizzaToppings, setPizzaToppings] = useState({
		mozzarella: true,
		tomato: true,
		bellPeppers: true,
		onion: false,
		olives: false,
	});
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
	const toppingsList = [
		"Mozzarella",
		"Tomato",
		"Bell Peppers",
		"Onion",
		"Olives",
	];

	// State to store selected toppings
	const [selectedToppings, setSelectedToppings] = useState([]);

	// Handle checkbox change
	const handleToppingChange = (e) => {
		const { value, checked } = e.target;

		if (checked) {
			// Add topping to the selected list
			setSelectedToppings((prev) => [...prev, value]);
		} else {
			// Remove topping from the selected list
			setSelectedToppings((prev) =>
				prev.filter((topping) => topping !== value)
			);
		}
	};

	// Submit the form
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Selected Toppings:", selectedToppings);
		// Send selectedToppings to the backend or another state management function here
	};
	const handleSizeChange = (event) => {
		setPizzaSize(parseInt(event.target.value));
	};
	const [count, setCount] = useState(0);

	// Increment counter
	const increment = () => {
		setCount(count + 1);
	};

	// Decrement counter
	const decrement = () => {
		setCount(count - 1);
	};

	const handleCountChange = (event) => {
		setPizzaCount(parseInt(event.target.value));
	};

	const calculateTotalPrice = () => {
		const basePrice = 150;
		const toppingPrice =
			Object.values(pizzaToppings).filter(Boolean).length * 10; // Assuming each topping adds 10 Birr
		return (basePrice + toppingPrice) * pizzaCount;
	};
	const submit = async (e) => {
		e.preventDefault();
		setShowModal(true);
	};
	return (
		<div className='Personal-order'>
			<div className='pizza-order'>
				<div className='pizza-image'>
					<img src={pizza3} alt='Margherita pizza' />
					<div>
						<img src={pizza4} alt='Margherita pizza' />
						<img src={pizza4} alt='Margherita pizza' />
					</div>
				</div>
				<div className='pizza-details'>
					<h2>Margherita</h2>
					{toppingsList.map((topping, index) => (
						<div key={index}>
							<input
								type='checkbox'
								id={topping}
								value={topping}
								onChange={handleToppingChange}
							/>
							<label htmlFor={topping}>{topping}</label>
						</div>
					))}
					<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<button onClick={decrement}>-</button>
						<span>{count}</span>
						<button onClick={increment}>+</button>
					</div>
					<p> {calculateTotalPrice()} Birr</p>
					<button className='order-button'>Order</button>
				</div>
				<Modal
					isOpen={showModal}
					className='modal'
					overlayClassName='modal-overlay'
				>
					<div className='modal-content'>
						<h2>Your order has been successfully completed!</h2>
					</div>
				</Modal>
			</div>
			<div className='home-container-five'>
				<h1> Fasting</h1>
				<div className='grid-container'>
					{popularPizza.map((pizza, index) => (
						<div className='card' key={index} style={{ padding: "10px" }}>
							<img src={pizza.image} alt={pizza.name} className='pizza-image' />
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
		</div>
	);
}

export default Order;
