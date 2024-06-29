// controllers/categoryController.js
const Category = require('../models/categorySchema');

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with the same name already exists'
      });
    }

    // Create and save the new category
    const category = new Category({ name });
    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createCategory , getCategories };
