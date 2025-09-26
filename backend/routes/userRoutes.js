const express = require("express")
const router = express.Router()
const { body } = require("express-validator");
const {auth} = require("../middlewares/Authentication")
const {
    login,
    signup,
    logout,
    profile
} = require("../controllers/userController")

router.post("/login", [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage("Password must be required")
], login)

router.post("/signup",
    [
        body('firstName').notEmpty().withMessage("FirstName is required"),
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').notEmpty().withMessage("Password must be required")

    ], signup)

 router.post("/logout" ,auth,  logout); 
 router.get("/profile" , auth , profile)  

module.exports = router