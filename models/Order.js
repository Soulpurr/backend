// Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      name: {type:String,required:true},
      price: {type:Number,required:true},
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
