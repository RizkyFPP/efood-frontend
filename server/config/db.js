const mongoose = require("mongoose");

// Ganti <YOUR_DATABASE_URI> dengan URI MongoDB Anda
const uri = "mongodb://localhost:27017/shopee-clone";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
