const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new product
const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
};
