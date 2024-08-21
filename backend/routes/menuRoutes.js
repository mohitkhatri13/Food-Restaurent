// routes/menuRoutes.js
const express = require('express');
const { getMenuItems, createMenuItem } = require('../controllers/menuController');
const router = express.Router();
const {upload}  = require('../middlewares/multer/multer.middleware')

router.get('/getmenu/:category?', getMenuItems);
router.post('/createmenu',upload.fields([{
      name:"thumbnail",
      maxCount:1
}]), createMenuItem);

module.exports = router;
