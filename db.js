const mongoose = require("mongoose");
const connectTodb = async () => {
  await mongoose.connect(
    "mongodb+srv://api12:6E5SCNNgaRjgKjAK@cluster0.5zqtueq.mongodb.net/ecomm2"
  );
  console.log("connected");
};
module.exports = connectTodb;