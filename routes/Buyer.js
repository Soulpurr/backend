const express = require("express");
const router = express.Router();
const User = require("../models/User");

const verifyUser = require("../middleware/verifyUser");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const verifyBuyer = require("../middleware/verifyBuyer");
require("dotenv").config();
router.get("/list-of-sellers", async (req, res) => {
  try {
    // Find all sellers in the database with userType 'seller'
    const sellers = await User.find({ userType: "seller" }, "username"); // You can specify which fields you want to retrieve, e.g., 'username', 'email', etc.

    if (!sellers || sellers.length === 0) {
      return res.status(404).json({ message: "No sellers found" });
    }

    res.status(200).json(sellers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve sellers" });
  }
});

router.get("/seller-catalog/:seller_id", async (req, res) => {
  try {
    const sellerId = req.params.seller_id;
    const catalog = await Catalog.find({ seller: sellerId });
    if (!catalog) {
      res.status(404).json({ error: "Seller catalog not found" });
      return;
    }
    res.status(200).json(catalog);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve seller catalog" });
  }
});

router.post("/create-order/:seller_id", verifyBuyer, async (req, res) => {
  try {
    const sellerId = req.params.seller_id;
    const buyerId = req.user._id; // Assuming you have user authentication in place

    const { items } = req.body;

    // Create an order with the specified items
    const order = new Order({
      buyer: buyerId,
      seller: sellerId,
      products: items,
    });

    await order.save();

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the order" });
  }
});
module.exports = router;
