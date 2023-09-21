const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51NsK7LI97mld8Ot2Wz6R9UarpOLvrfD4LJ0t8BN2VwVA3fSNgpCnKmNOYOZgU0VPcF0okDxUfEpvHGOyzGRsP4ts00eH5dxIa3");

router.post("/checkout-session", async (req, res) => {
    const { totalPricePay } = req.body;
    // console.log('inside session', totalPricePay);

    try {
        const product = await stripe.products.create({
            name: "Your Product Name", // Replace with your product's name
            description: "Product Description", // Replace with your product's description
        });
        // console.log("product ::", product)
        const price = await stripe.prices.create({
            unit_amount: totalPricePay * 100, // Convert to cents if not already in cents
            currency: 'usd', // Adjust currency as needed
            product: product.id, // Associate the price with the product
        });

        // console.log("price ::", price)
        // res.status(200).send('hellow dear how are u');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
        console.log("session ::", session)
        res.json(session);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
