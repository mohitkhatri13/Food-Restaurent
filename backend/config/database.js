const mongoose = require("mongoose")
// const DB_NAME ="newbackend";
require("dotenv").config();
const URL = "mongodb+srv://khatrimohit2002:n2dRSL6GftIZ1Zsw@cluster0.3n8ipdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectDb = async()=>{
    try {
        const connectionInstance = await mongoose.connect(URL)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}
module.exports = connectDb;