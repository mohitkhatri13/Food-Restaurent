const multer = require("multer");
// const express = require("express");

// const uploadFile = require("../../controllers/uploadController");

const storage = multer.diskStorage({
     destination: function(req , file , cb){
        cb(null, "./public/temp" )
     },
     filename:function(req , file , cb){
        cb(null , file.originalname)
     }
})

 const upload = multer({storage})
 module.exports = {upload};
