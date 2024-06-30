const express = require('express');
const { getCartItems,getOrdersByUserId, addToCart, updateCartItem, removeFromCart,getOrderDetails,getIncomingOrders , ordercreate , getPendingOrders , setOrderStatus} = require('../controllers/orderControllers');

const router = express.Router();

const{ isStaff , auth ,isCustomer} = require("../middlewares/Authentication")

// router.get('/cart/:customerId', getCartItems); 
router.post('/cart',auth,isCustomer, addToCart); // Add item to the cart
// router.put('/cart',auth ,isCustomer, updateCartItem); 
// router.delete('/cart/:customerId/:menuItemId',auth, isCustomer, removeFromCart); 
router.get('/orders/:orderId' ,auth,isCustomer, getOrderDetails)
router.get('/incomingorders',auth,isStaff,getIncomingOrders)
router.post('/createorder' , ordercreate)
router.get('/getuserorder/:userId',getOrdersByUserId)
router.get('/getpendingorders' , getPendingOrders);
router.put('/setorderstatus' , setOrderStatus)


module.exports = router;
