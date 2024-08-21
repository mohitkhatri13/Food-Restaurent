// models/MenuItem.js
const mongoose = require('mongoose');


const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
