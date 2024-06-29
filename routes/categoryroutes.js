// routes/categoryRoutes.js
const express = require('express');
const { createCategory , getCategories} = require('../controllers/categoryController');

const router = express.Router();

// Route to create a new category
router.post('/categories', createCategory);
router.get("/getcategories" , getCategories)

module.exports = router;
