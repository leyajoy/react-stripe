import { useState } from "react";

const Home = () => {
	const itemName = "FIREIMG";
	const itemPrice = 500;
	const [quantity, setQuantity] = useState(1);
	const [finalAmount, setFinalAmount] = useState(itemPrice);

	const decrement = () => {
		if (quantity <= 1) {
			setQuantity(1);
			setFinalAmount(itemPrice);
		} else {
			setQuantity(quantity - 1);
			setFinalAmount(finalAmount - itemPrice);
		}
	};

	const increment = () => {
		setQuantity(quantity + 1);
		setFinalAmount(finalAmount + itemPrice);
	};

	const checkout = async () => {
		try {
			const res = await fetch("http://localhost:8000/checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				mode: "cors",
				body: JSON.stringify({
					items: [
						{
							id: 1,
							quantity: quantity,
							price: itemPrice,
							name: itemName,
						},
					], //Body is not being sent to backend
				}),
			});

			const data = await res.json();
			console.log(data.url);
			window.location = data.url;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>{itemName}</h1>
			<p>Price: ${itemPrice}</p>
			<p>Quantity: {quantity}</p>
			<p>Final Amount: ${finalAmount}</p>
			<button onClick={decrement}>-</button>
			<button onClick={increment}>+</button>
			<button onClick={checkout}>Checkout</button>
		</div>
	);
};

export default Home;
