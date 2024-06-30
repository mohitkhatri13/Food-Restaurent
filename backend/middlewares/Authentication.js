const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // token extract kr rhe
    const token =
      req.body.token ||
      req.header("Authorisation").replace("Bearer", "");
         console.log("hello");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
    try {
      const decode =  jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      // user me payload attached kar diya yaha 
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//  is Staff authentication
exports.isStaff = async (req, res, next) => {
  try {
    if (req.user.role !== "staff") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for staff only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

//is customer authentication
exports.isCustomer = async (req, res, next) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Customer only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};
