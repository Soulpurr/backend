// Catalog.js
const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      name: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model('Catalog', catalogSchema);
