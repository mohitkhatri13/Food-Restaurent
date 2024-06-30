const express = require('express');
const { createCategory , getCategories} = require('../controllers/categoryController');

const router = express.Router();

router.post('/categories', createCategory);
router.get("/getcategories" , getCategories)

module.exports = router;