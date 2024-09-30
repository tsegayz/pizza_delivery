import { Link } from "react-router-dom";
import pizza3 from "../assets/pizza3.png";
import pizza4 from "../assets/pizza4.png";

function OrderHistory({data}) {
	const popularPizza = [
		{
			name: "Margherita",
			price: "150",
			description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
			image: pizza3,
		},
		{
			name: "Pepperoni",
			price: "160",
			description: "Pepperoni, Mozzarella, Tomato Sauce",
			image: pizza3,
		},
		{
			name: "BBQ Chicken",
			price: "170",
			description: "BBQ Sauce, Chicken, Mozzarella, Onions",
			image: pizza4,
		},
		{
			name: "Hawaiian",
			price: "155",
			description: "Ham, Pineapple, Mozzarella, Tomato Sauce",
			image: pizza4,
		},
		{
			name: "Veggie",
			price: "145",
			description: "Bell Peppers, Onions, Mushrooms, Olives, Mozzarella",
			image: pizza3,
		},
		{
			name: "Four Cheese",
			price: "180",
			description: "Mozzarella, Parmesan, Gorgonzola, Ricotta",
			image: pizza4,
		},
	];
	return (
		<div className='orderhistory'>
			<div className='home-container-four' style={{marginTop:'8em'}}>
				<h1> Order History</h1>
				<div className='grid-container'>
					{popularPizza.map((pizza, index) => (
						<div className='card' key={index}>
							<img src={pizza.image} alt={pizza.name} className='pizza-image' />
							<div className='card-content'>
								<h3 style={{ margin: "0", fontSize: "30px" }}>{pizza.name}</h3>
								<p style={{ margin: "0" }}>{pizza.description}</p>
								<div className='price-order'>
									<span className='price'>
										<h2 style={{ color: "#27ae60", fontSize: "70px" }}>
											{pizza.price}
										</h2>
										Birr
									</span>
									<h3
										style={{
											fontSize: "40px",
											color: "green",
											fontFamily: "sans-serif",
										}}
									>
										Recieved
									</h3>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default OrderHistory;
