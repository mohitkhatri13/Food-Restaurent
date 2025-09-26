const express = require('express');
const Contact = require('../models/contactus');

const contactus = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(200).json({
        success: false,
        message: "Please Enter all details "
      })
    }
    const newContact = new Contact({
      name,
      email,
      phone,
      message
    });

    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { contactus };