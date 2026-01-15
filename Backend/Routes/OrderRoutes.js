// Routes/OrderRoutes.js
const express = require("express");
const router = express.Router();
const {
  createPaypalOrder,
  capturePaypalOrder,
  createOrder,
  getOrderDetails,
  getSingleOrder,
  OrderViewUser,
  UpdateOrderStatus,
  deleteOrder,
} = require("../Controllers/OrderController");
const { auth, roleBasedAccess } = require("../Utils/Authetication");

// Middleware to protect routes and set req.RequestName


// ------------------- PAYPAL ROUTES -------------------
// Create PayPal order (returns orderID)
router.post("/create-paypal-order", auth, createPaypalOrder);

// Capture PayPal order & create order in DB
router.post("/capture-paypal-order", auth, capturePaypalOrder);

// ------------------- ORDERS CRUD -------------------
// Create manual order (COD / offline payment)
router.post("/create-order",auth, createOrder);

// Get all orders (admin only)
router.get("/admin/orders", auth, roleBasedAccess('admin'), getOrderDetails);

// Get single order (admin only)
router.get("/admin/order/:id", auth, roleBasedAccess('admin'), getSingleOrder);

// Update order status (admin only)
router.put("/admin/order/:id", auth, roleBasedAccess('admin'), UpdateOrderStatus);

// Delete order (admin only)
router.delete("/admin/order/:id", auth,roleBasedAccess('admin'), deleteOrder);

// ------------------- USER ORDERS -------------------
// Get orders of logged-in user
router.get("/my-orders", auth, OrderViewUser);

module.exports = router;
