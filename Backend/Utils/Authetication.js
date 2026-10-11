const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not sign in",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Supports new tokens ({ id, email }) and old tokens ({ email })
    const user = decoded.id
      ? await UserModel.findById(decoded.id)
      : await UserModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.RequestName = user;
    next();
  } catch (err) {
    console.log(`Authentication error: ${err.message}`);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.RequestName.role)) {
      return res.status(403).json({
        success: false,
        message: `you cannot access the resource as an ${req.RequestName.role}`,
      });
    }
    next();
  };
};

module.exports = { auth, roleBasedAccess };