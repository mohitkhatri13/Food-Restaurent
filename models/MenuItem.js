// models/MenuItem.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: { type: String },
  price: { type: Number, required: true },
  // image: { type: String },
  category: { type: Schema.Types.ObjectId,
     ref: 'Category' }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
