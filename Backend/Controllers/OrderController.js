// orderController.js
const OrderModel= require("../Models/OrderModel.js");
const  ProductsModel= require("../Models/ProductsModel.js") ;
const axios =require("axios");

// Switch PayPal URL based on mode
const PAYPAL_API =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

// ------------------- CREATE PAYPAL ORDER -------------------
 const createPaypalOrder = async (req, res) => {
  try {
    const { totalPrice } = req.body;

    const auth = Buffer.from(
      process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
    ).toString("base64");

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: totalPrice } }],
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ success: true, orderID: response.data.id });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: "PayPal order creation failed",
      error: err.message,
    });
  }
};

// ------------------- CAPTURE PAYPAL PAYMENT & CREATE ORDER -------------------
 const capturePaypalOrder = async (req, res) => {
  try {
    const {
      orderID,
      shipping_info,
      orderItems,
      itemPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const auth = Buffer.from(
      process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
    ).toString("base64");

    // Capture payment from PayPal
    const capture = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Create MongoDB order
    const order = await OrderModel.create({
      shipping_info,
      OrderInfo: orderItems,
      paymentInfo: capture.data,
      itemPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
      paidAt: Date.now(),
      StatusInfo: "Pending",
    });

    // Update stock
    await Promise.all(orderItems.map((item) => updateStock(item, "dispatch")));

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order_details: order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Payment capture failed",
      error: err.message,
    });
  }
};

// ------------------- CREATE ORDERS (Manual / COD) -------------------
 const createOrder = async (req, res) => {
  try {
    const {
      shipping_info,
      OrderInfo,
      paymentInfo,
      itemPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await OrderModel.create({
      shipping_info,
      OrderInfo,
      paymentInfo,
      itemPrice,
      shippingPrice,
      totalPrice,
      user: req.RequestName._id,
      paidAt: paymentInfo ? Date.now() : null,
      StatusInfo: "Pending",
    });

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order_details: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// ------------------- GET ALL ORDERS (Admin) -------------------
 const getOrderDetails = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      order_details: orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// ------------------- GET SINGLE ORDER -------------------
 const getSingleOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      order_details: order,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// ------------------- GET USER ORDERS -------------------
 const OrderViewUser = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.RequestName._id });
    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      order_details: orders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// ------------------- UPDATE ORDER STATUS -------------------
 const UpdateOrderStatus = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    const status = req.body.status.toLowerCase();
    if (order.StatusInfo.toLowerCase() === "delivered")
      return res.status(400).json({ success: false, message: "Order already delivered" });

    await Promise.all(order.OrderInfo.map((item) => updateStock(item, status)));

    order.StatusInfo = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// ------------------- UPDATE STOCK -------------------
 updateStock = async (orderItem, status) => {
  const product = await ProductsModel.findById(orderItem.Product_id);
  if (!product) throw new Error("Product not found");

  if (status === "dispatch" && orderItem.OrderStatus !== "dispatch") {
    const remainingStock = product.stock - orderItem.quantity;
    if (remainingStock < 0) throw new Error("Out of stock");
    product.stock = remainingStock;
    await product.save();
  }
};

// ------------------- DELETE ORDER -------------------
 const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      Deleted_order: order,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};
module.exports={createPaypalOrder,
  capturePaypalOrder,
  createOrder,
  getOrderDetails,
  getSingleOrder,
  OrderViewUser,
  UpdateOrderStatus,
  deleteOrder,}