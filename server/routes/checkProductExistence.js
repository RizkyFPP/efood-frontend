const mongoose = require("mongoose");
const Product = require("./models/Product"); // Adjust the path as necessary

mongoose.connect("mongodb://localhost:27017/shopee-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fetchAllProductIds = async () => {
  try {
    const products = await Product.find({});
    products.forEach((product) => {
      console.log(`Product ID: ${product._id}, Name: ${product.name}`);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    mongoose.connection.close();
  }
};

fetchAllProductIds();
