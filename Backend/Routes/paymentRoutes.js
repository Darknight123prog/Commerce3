// routes/payment.routes.js
const express =require("express");
const  {
  initiatePayment,
  paymentCallback
} =require("../Controllers/PaymentGateWayController");

const router = express.Router();

router.post("/pay", initiatePayment);
router.post("/callback", paymentCallback);

module.exports= router;
