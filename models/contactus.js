const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Contact Schema
const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create Contact model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
