const express = require('express');
const router = express.Router();
const Contact = require('../models/contactus');
 


const contactus =  async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Create new contact instance
    const newContact = new Contact({
      name,
      email,
      phone,
      message
    });

    // Save contact to database
    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {contactus};
