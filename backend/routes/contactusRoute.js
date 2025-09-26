const express = require("express")
const router =  express.Router()
const {body}  = require("express-validator")

const {
   contactus 
} = require("../controllers/contactusController")

router.post("/contactus" , 
   [body("email").isEmail().withMessage("Enter proper Email"), 
   body("name").notEmpty().withMessage("FirstName is required").isLength({min:3}).withMessage("Enter FUll Name"),],
    body("phone").notEmpty().withMessage("FirstName is required"),
     body("message").notEmpty().withMessage("FirstName is required"),
   contactus)


module.exports = router