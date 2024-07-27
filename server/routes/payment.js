// routes/payment.js

const express = require("express");
const router = express.Router();
const stripe = require("stripe")("your_stripe_secret_key"); // Ganti dengan secret key Stripe Anda

// POST /api/payment/create-payment-intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

module.exports = router;
