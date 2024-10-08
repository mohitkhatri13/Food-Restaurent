
// server.js
const express = require('express');
require("dotenv").config();
const connectDB = require("./config/database");

const userRoutes = require('./routes/userRoutes')
const menuRoutes = require('./routes/menuRoutes')
const categoryRoutes = require('./routes/categoryroutes');
const orderRoutes = require('./routes/orderRoutes')
const contactusRoute = require('./routes/contactusRoute')
const {cloudinaryConnect} = require("./config/cloudinary")

const cors  = require("cors")
const app = express();

// Connect to the database
connectDB();
cloudinaryConnect();

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1', menuRoutes);
app.use('/api/v1/',categoryRoutes)
app.use('/api/v1',orderRoutes)
app.use('/api/v1',contactusRoute)
// app.use('/api/v1' , uploadroute)

app.get("/" , (req , res)=>{
   res.send("sucessfull running")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
