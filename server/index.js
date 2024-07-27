const express = require("express");
const bodyParser = require("body-parser");
const midtransClient = require("midtrans-client");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const Product = require("./models/Product");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/shopee-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Directory for storing files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Initialize Midtrans Client
const snap = new midtransClient.Snap({
  isProduction: false, // Set to true for production
  serverKey: "SB-Mid-server-jyUBw1XqjnmPGvKJSLqul4ag", // Replace with your server key
  clientKey: "SB-Mid-client-pIQimzkTtaJ9CJ4T", // Replace with your client key
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rizky0605pp@gmail.com", // Replace with your email
    pass: "owui nbmd gblo tjew", // Replace with your email password
  },
});

// Route to fetch product details by ID
app.get("/api/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to upload a new product with image
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;
    const imageUrl = `/images/${req.file.filename}`; // URL to access the image

    const newProduct = new Product({ name, price, imageUrl });
    await newProduct.save();

    res.status(201).send("Product uploaded successfully");
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).send("Failed to upload product");
  }
});

// Route to fetch all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Failed to fetch products");
  }
});

// Route to create Midtrans transaction
app.post("/api/checkout", async (req, res) => {
  const { orderId, grossAmount, firstName, lastName, email } = req.body;

  const uniqueOrderId = `${orderId}-${Date.now()}`; // Append timestamp to make it unique

  const transactionDetails = {
    transaction_details: {
      order_id: uniqueOrderId,
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
    res.status(200).json({ token: transaction.token });
  } catch (error) {
    console.error(
      "Error creating transaction:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
});

// Route to handle contact form submission
app.post("/api/contact", async (req, res) => {
  const { subject, name, phone, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "rizky0605pp@gmail.com", // Replace with your email
    subject: `Contact form submission: ${subject}`,
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send(`Error sending message: ${error.message}`);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
