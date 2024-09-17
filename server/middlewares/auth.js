// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

// Token verification utility
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Authentication middleware
exports.auth = (req, res, next) => {
  try {
    // Extracting JWT from request cookies, body or header
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    // If JWT is missing, return 401 Unauthorized response
    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    // Verifying the JWT
    try {
      const decode = verifyToken(token);
      console.log(decode);
      req.user = decode; // Storing the decoded JWT payload in request
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    next(); // Move to the next middleware
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Error validating token`,
    });
  }
};

// Role check utility
const checkRole = (accountType, role) => {
  return accountType === role;
};

// Middleware to verify student role
exports.isStudent = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (!checkRole(userDetails.accountType, "Student")) {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role can't be verified` });
  }
};

// Middleware to verify admin role
exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (!checkRole(userDetails.accountType, "Admin")) {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role can't be verified` });
  }
};

// Middleware to verify instructor role
exports.isInstructor = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });
    console.log(userDetails);

    if (!checkRole(userDetails.accountType, "Instructor")) {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role can't be verified` });
  }
};
