// routes/menuRoutes.js
const express = require('express');
const { getMenuItems, createMenuItem } = require('../controllers/menuController');
const router = express.Router();

router.get('/getmenu/:category?', getMenuItems);
router.post('/createmenu', createMenuItem);

module.exports = router;
