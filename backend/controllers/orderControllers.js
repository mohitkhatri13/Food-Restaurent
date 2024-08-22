// controllers/orderController.js
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');

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
    let order = await Order.findOne({ customer: customerId });
    if (!order) {
      order = new Order({ customer: customerId, tableNumber, items: [] });
    } else if (order.tableNumber !== tableNumber) {
      order.tableNumber = tableNumber;
    }
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



const getIncomingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: false })
      .populate('items.menuItem'); 

    
    const ordersWithTotal = orders.map(order => {
      let totalAmount = 0;
      order.items.forEach(item => {
        totalAmount += item.quantity * item.menuItem.price;
      });
      return {
        _id: order._id,
        tableNumber: order.tableNumber,
        items: order.items,
        totalAmount: totalAmount.toFixed(2), 
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






const ordercreate = async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;

    // Check if userId is valid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create new order instance
    const newOrder = new Order({
      user: userId,
      items: items,
      totalPrice: totalPrice
    });

    // Save order to database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);

  }
  catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
}


const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId }).populate('user', 'firstName lastName email');
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this user'
      });
    }
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: false }).populate('user', 'firstName lastName email');
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No pending orders found'
      });
    }
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

const setOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};




module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  getOrderDetails,
  getIncomingOrders,
  ordercreate,
  getOrdersByUserId,
  getPendingOrders,
  setOrderStatus
};