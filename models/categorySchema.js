// models/Category.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  items:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"MenuItem"
 }]
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
