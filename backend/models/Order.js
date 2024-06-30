const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
    // Add more item details if necessary
  }],
  totalPrice: { type: Number, required: true },
  status:{
    type:Boolean,
    default:false
  },
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;