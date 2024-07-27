// server/snap.js
const express = require("express");
const bodyParser = require("body-parser");
const midtransClient = require("midtrans-client");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize Midtrans Client
const snap = new midtransClient.Snap({
  isProduction: false, // Set to true for production
  serverKey: "SB-Mid-server-jyUBw1XqjnmPGvKJSLqul4ag", // Replace with your server key
  clientKey: "SB-Mid-client-pIQimzkTtaJ9CJ4T", // Replace with your client key
});

app.post("/api/checkout", async (req, res) => {
  const { orderId, grossAmount, firstName, lastName, email } = req.body;

  const transactionDetails = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    customer_details: {
      first_name: firstName,
      last_name: lastName,
      email: email,
    },
  };

  try {
    const transaction = await snap.createTransaction(transactionDetails);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
