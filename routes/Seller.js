const express = require("express");
const router = express.Router();

const verifyUser = require("../middleware/verifyUser");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const verifySeller = require("../middleware/verifySeller");
require("dotenv").config();
router.post('/create-catalog',verifySeller, async (req, res) => {
    try {
      const sellerId = req.user._id; // Assuming you have seller authentication in place
      const { items } = req.body;
  
      // Create a catalog with the specified items
      const catalog = new Catalog({
        seller: sellerId,
        products: items,
      });
  
      await catalog.save();
  
      res.status(201).json({ message: 'Catalog created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create the catalog' });
    }
  });

  router.get('/orders', verifySeller, async (req, res) => {
    try {
      const sellerId = req.user._id; // Assuming you have seller authentication in place
      const orders = await Order.find({ seller: sellerId });
  
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve seller orders' });
    }
  });
module.exports = router;
