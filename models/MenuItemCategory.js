const mongoose = require("mongoose");

const ItemCategory  = new mongoose.Schema({
     name:{
        type:String,
        required:true,
        trim:true
     },
     description:{
        type:String,
        trim:true
     },
     menuItem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MenuItem"
     }]
})

module.exports = mongoose.model("Category" , ItemCategory);