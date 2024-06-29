// controllers/orderController.js
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

const getCartItems = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await Order.find({ customer: customerId }).populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  const { customerId, tableNumber, menuItemId, quantity } = req.body;

  try {
    // Find the order or create a new one if it doesn't exist
    let order = await Order.findOne({ customer: customerId });
    if (!order) {
      order = new Order({ customer: customerId, tableNumber, items: [] });
    } else if (order.tableNumber !== tableNumber) {
      order.tableNumber = tableNumber; // Update table number if it has changed
    }

    // Find the menu item
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    // Check if the item is already in the order
    const existingItemIndex = order.items.findIndex(item => item.menuItem.toString() === menuItemId);
    if (existingItemIndex > -1) {
      // Update the quantity if it already exists
      order.items[existingItemIndex].quantity += quantity;
    } else {
      // Add the new item to the order
      order.items.push({ menuItem: menuItemId, quantity });
    }

    // Update the total amount
    order.totalAmount = order.items.reduce((total, item) => total + item.quantity * menuItem.price, 0);

    // Save the order
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Item added to order successfully',
      data: order
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateCartItem = async (req, res) => {
    const { customerId, menuItemId, quantity } = req.body;
  
    try {
      let order = await Order.findOne({ customer: customerId });
  
      if (!order) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
  
      const existingItem = order.items.find(item => item.menuItem.toString() === menuItemId);
      if (!existingItem) {
        return res.status(404).json({ success: false, message: 'Item not found in cart' });
      }
  
      existingItem.quantity = quantity;
  
      order.totalAmount = order.items.reduce((total, item) => total + item.quantity * menuItem.price, 0);
  
      await order.save();
  
      res.status(200).json({
        success: true,
        message: 'Cart item updated successfully',
        data: order.items,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // Remove item from the cart
  const removeFromCart = async (req, res) => {
    const { customerId, menuItemId } = req.params;
  
    try {
      let order = await Order.findOne({ customer: customerId });
  
      if (!order) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
  
      order.items = order.items.filter(item => item.menuItem.toString() !== menuItemId);
  
      order.totalAmount = order.items.reduce((total, item) => total + item.quantity * menuItem.price, 0);
  
      await order.save();
  
      res.status(200).json({
        success: true,
        message: 'Item removed from cart successfully',
        data: order.items,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  const getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      // Find the order by ID
      const order = await Order.findById(orderId).populate('items.menuItem');
  
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

  
      // Optionally, you may want to calculate total amount here as well
      // This assumes you have price information in MenuItem model
  
      // Calculate total amount
      let totalAmount = 0;
      for (const item of order.items) {
        const menuItem = await MenuItem.findById(item.menuItem);
        if (menuItem) {
          totalAmount += menuItem.price * item.quantity;
        }
      }
  
      res.status(200).json({
        success: true,
        message: 'Order details retrieved successfully',
        data: {
          order,
          totalAmount
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const setorderstatus = async(req , res)=>{

    const { orderId } = req.params;
  
    try {
      const order = await Order.findById(orderId).populate('items.menuItem');
  
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      let status = order.status;
      if(status ===false){
        order.status = true;
        await order.save();
      }
  
      
      res.status(200).json({
        success: true,
        message: 'Cart item updated successfully',
        data: order.items,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  const getIncomingOrders = async (req, res) => {
    try {
      // Find all orders where status is false (assuming 'status' indicates completion status)
      const orders = await Order.find({ status: false })
        .populate('items.menuItem'); // Populate items with menu item details
  
      // Calculate total amount for each order
      const ordersWithTotal = orders.map(order => {
        let totalAmount = 0;
        order.items.forEach(item => {
          totalAmount += item.quantity * item.menuItem.price;
        });
        return {
          _id: order._id,
          tableNumber: order.tableNumber,
          items: order.items,
          totalAmount: totalAmount.toFixed(2), // Format total amount to two decimal places
        };
      });
  
      res.status(200).json({
        success: true,
        message: 'Incoming orders retrieved successfully',
        data: ordersWithTotal,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  module.exports = { getCartItems, addToCart, updateCartItem, removeFromCart,getOrderDetails,setorderstatus,getIncomingOrders };