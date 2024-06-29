const MenuItem = require('../models/MenuItem');
const Category = require('../models/categorySchema');

const getMenuItems = async (req, res) => {
  try {
    const { category } = req.params;

    let menuItems;
    if (category) {
      // Find the category by name
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        return res.status(404).json({ error: `Category '${category}' not found` });
      }
      // Find menu items by category ID
      menuItems = await MenuItem.find({ category: categoryDoc._id }).populate('category');
    } else {
      // If no category is specified, return all menu items
      menuItems = await MenuItem.find().populate('category');
    }

    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMenuItem = async (req, res) => {
  const { name, category, price,description } = req.body;

  try {
    // Check if a menu item with the same name already exists
    const existingMenuItem = await MenuItem.findOne({ name });

    if (existingMenuItem) {
      return res.status(400).json({
        success: false,
        message: 'Menu item with the same name already exists'
      });
    }

    // Find or create the category
    let categoryObj = await Category.findOne({ name: category });

    if (!categoryObj) {
      categoryObj = new Category({ name: category });
      await categoryObj.save();
    }

    // Create and save the new menu item
    const menuItem = new MenuItem({ name, category: categoryObj._id, price,description });
    await menuItem.save();

    // Add the menu item to the category's items array
    categoryObj.items.push(menuItem._id);
    await categoryObj.save();

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: menuItem
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getMenuItems, createMenuItem };