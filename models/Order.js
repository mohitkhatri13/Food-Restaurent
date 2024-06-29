// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tableNumber: { type: Number, required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true, default: 0 },
  status:{
    type:Boolean,
    default:false
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
