import React, { useState } from "react";
import { FaUpload, FaPlus, FaBell, FaUserCircle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMenu({ setIsAuthenticated }) {
	const [selectedImage, setSelectedImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);

	const [ingredients, setIngredients] = useState({
		mozzarella: false,
		tomato: false,
		"bell peppers": false,
		onions: false,
		olives: false,
	});
	const navigate = useNavigate();
	const [responseMessage, setResponseMessage] = useState("");
	const [newIngredient, setNewIngredient] = useState("");

	const handleCheckboxChange = (e) => {
		setIngredients({ ...ingredients, [e.target.name]: e.target.checked });
	};

	const handleAddIngredient = () => {
		if (newIngredient.trim() !== "") {
			setIngredients({ ...ingredients, [newIngredient.toLowerCase()]: false });
			setNewIngredient("");
		}
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setSelectedImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const [name, setName] = useState("");
	const [price, setPrice] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setResponseMessage("");
	
		// Convert selected ingredients to an array of strings
		const selectedToppings = Object.keys(ingredients).filter(
			(ingredient) => ingredients[ingredient]
		);
	
		// Ensure all required fields are filled
		if (!name || !price || !selectedImage) {
			setResponseMessage("Please fill in all the fields");
			return;
		}
	
		// Create FormData object to handle image file
		const formData = new FormData();
		formData.append("name", name);
		formData.append("price", price);
		formData.append("toppings", JSON.stringify(selectedToppings));  // Convert array to string
		formData.append("image", selectedImage); // Append the file directly
		for (let pair of formData.entries()) {
			console.log(pair[0], pair[1]);
		}
		try {
			const response = await axios.post(
				"http://localhost:5000/api/v1/menus",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",  // Important for sending file
					}
				}
			);
	
			const userData = response.data.data.user;
			const token = response.data.token;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(userData));
	
			setResponseMessage(response.data.status);
			setIsAuthenticated(true);
			console.log(formData);
	
		} catch (error) {
			if (error.response) {
				setResponseMessage(error.response.data.message || "An error occurred");
			} else {
				setResponseMessage("An error occurred");
			}
		}
	};
	
	
	
	

	return (
		<div className='add-menu'>
			<Sidebar />
			<div className='content'>
				<header>
					<h1>Add Menu</h1>
					<div>
						<FaBell style={{ fontSize: "30px", marginRight: "10px" }} />
						<FaUserCircle style={{ fontSize: "30px" }} />
					</div>
				</header>
				<form onSubmit={handleSubmit}>
					<h1
						style={{
							fontSize: "28px",
							color: "grey",
							fontFamily: "Geneva, Verdana, sans-serif",
						}}
					>
						Add Menu
					</h1>
					<section
						style={{
							display: "flex",
							alignItems: "start",
							flexDirection: "column",
						}}
					>
						<div className='input-container'>
							<input
								type='text'
								name='name'
								id='name'
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
								placeholder=' '
								required
							/>
							<label htmlFor='name'>Name</label>
						</div>

						<div
							className='ingredients'
							style={{
								display: "flex",
								alignItems: "start",
								flexDirection: "column",
								width: "17em",
							}}
						>
							<h3>Topping</h3>
							<div>
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

							<div className='new-ingredient'>
								<input
									type='text'
									placeholder='Topping name..'
									value={newIngredient}
									onChange={(e) => setNewIngredient(e.target.value)}
								/>
								<button
									type='button'
									className='add-btn'
									onClick={handleAddIngredient}
								>
									<FaPlus /> Add
								</button>
							</div>
						</div>

						<div className='input-container'>
							<input
								type='number'
								name='price'
								value={price}
								onChange={(e) => {
									setPrice(e.target.value);
								}}
								placeholder=' '
								required
							/>
							<label htmlFor='number'>Price</label>
						</div>

						<label htmlFor='file-upload' className='custom-file-upload'>
							<FaUpload style={{ marginRight: "8px" }} />
							{selectedImage ? selectedImage.name : "Upload pizza photo"}
						</label>
						<input
							id='file-upload'
							type='file'
							accept='image/*'
							onChange={handleImageChange}
							style={{ display: "none" }}
						/>
						<br />
						{previewImage && (
							<div style={{ display: "flex" }}>
								<h3>Image Preview:</h3>
								<img
									src={previewImage}
									alt='Selected Preview'
									style={{ width: "100px", height: "auto", marginLeft: "10px" }}
								/>
							</div>
						)}
						<button type='submit' className='submit-btn'>
							Submit
						</button>
					</section>
				</form>
			</div>
		</div>
	);
}

export default AddMenu;
