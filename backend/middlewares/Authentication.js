const jwt = require("jsonwebtoken");

require("dotenv").config();
exports.auth = async (req, res, next) => {
  try {
    // token extract kr rhe
    const token = req.cookies?.token || req.header("Authorisation")?.split(' ')[1];
    console.log("in auth middleware ", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.body = decode;
    next();
  } catch (error) {
    throw error;
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
