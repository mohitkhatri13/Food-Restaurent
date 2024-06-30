
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  items:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"MenuItem"
 }]
});

module.exports = mongoose.model('Category', categorySchema);
