const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectTodb=require('./db')
const app = express();



// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
connectTodb()
// Set up your routes here
app.use("/api/user", require("./routes/User.js"));
app.use("/api/buyer", require("./routes/Buyer"));
app.use("/api/seller", require("./routes/Seller"));

app.get("/", (req, res) => {
    res.send("hello world");
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
