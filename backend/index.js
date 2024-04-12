const express = require("express");
const app = express();
//Issue no 1

const cors = require("cors");

require("dotenv").config();
let env = process.env.SECRET_STRIPE_KEY;

console.log(process.env.SECRET_STRIPE_KEY);
const stripe = require("stripe")(env);

app.use(cors({ origin: "http://localhost:5173" }));
app.post("/checkout", async (req, res) => {
	const items = [
		{
			id: 1,
			quantity: 100,
			price: 200,
			name: "Kevin",
		},
	];
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: items.map((item) => {
				return {
					price_data: {
						currency: "inr",
						product_data: {
							name: item.name,
						},
						unit_amount: item.price * 100,
					},
					quantity: item.quantity,
				};
			}),
			success_url: "http://localhost:5173/success",
			cancel_url: "http://localhost:5173/cancel",
		});
		console.log(session);
		res.json({ url: session.url });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

app.listen(8000);
