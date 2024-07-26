// server/routes/products.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to fetch product details by ID
router.get("/:productId", async (req, res) => {
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
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;
    const imageUrl = `/images/${req.file.filename}`;

    const newProduct = new Product({ name, price, imageUrl });
    await newProduct.save();

    res.status(201).send("Product uploaded successfully");
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).send("Failed to upload product");
  }
});

// Route to fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Failed to fetch products");
  }
});

module.exports = router;
