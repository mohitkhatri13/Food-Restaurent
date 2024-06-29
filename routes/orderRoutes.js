const express = require('express');
const { getCartItems, addToCart, updateCartItem, removeFromCart,getOrderDetails,setorderstatus ,getIncomingOrders} = require('../controllers/orderControllers');

const router = express.Router();

const{ isStaff , auth ,isCustomer} = require("../middlewares/Authentication")

router.get('/cart/:customerId', getCartItems); // Fetch items in the cart
router.post('/cart',auth,isCustomer, addToCart); // Add item to the cart
router.put('/cart',auth ,isCustomer, updateCartItem); // Update item quantity in the cart
router.delete('/cart/:customerId/:menuItemId',auth, isCustomer, removeFromCart); // Remove item from the cart
router.get('/orders/:orderId' ,auth,isCustomer, getOrderDetails)
router.put('/orderstatus/:orderId',auth,isStaff,setorderstatus)
router.get('/incomingorders',auth,isStaff,getIncomingOrders)

module.exports = router;
