const OrderModel = require("../Models/OrderModel.js");
const crypto = require("crypto");
const axios = require("axios");

exports.initiatePayment = async (req, res) => {
  try {
    const {shiping_info,OrderInfo,user,itemPrice,shippingPrice,totalPrice}=req.body;
    const amount = Number(req.body.amount) * 100; // ₹ → paise
    const merchantTransactionId = "TXN_" + Date.now();

    await OrderModel.create({
      merchantTransactionId,
      amount,
      shiping_info,
      OrderInfo,
      user,
      itemPrice,
      shippingPrice,
      totalPrice,
      status: "CREATED"
    });

    const payload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: "USER_001",
      amount,
      redirectUrl: `${process.env.FRONTEND_URL}/payment-success`,
      redirectMode: "POST",
      callbackUrl: `${process.env.BACKEND_URL}/api/payment/callback`,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    const payloadBase64 = Buffer
      .from(JSON.stringify(payload))
      .toString("base64");

    const checksum =
      crypto
        .createHash("sha256")
        .update(payloadBase64 + "/pg/v1/pay" + process.env.PHONEPE_SALT_KEY)
        .digest("hex") +
      "###" +
      process.env.PHONEPE_SALT_INDEX;
     

    const response = await axios.post(
      "https://api-preprod.phonepe.com/apis/pg-sandbox",
      { request: payloadBase64 },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum
        }
      }
    );

    return res.json(response.data);

  } catch (error) {
    console.error("PhonePe Error:", error.response?.data || error);
    return res.status(500).json({ message: "Payment initiation failed" });
  }
};

exports.paymentCallback = async (req, res) => {
  try {
    const { code, data } = req.body;

    if (!data?.merchantTransactionId) {
      return res.sendStatus(400);
    }

    const status =
      code === "PAYMENT_SUCCESS" ? "SUCCESS" : "FAILED";

    await OrderModel.findOneAndUpdate(
      { merchantTransactionId: data.merchantTransactionId },
      { status }
    );

    return res.sendStatus(200);
  } catch (error) {
    console.error("Callback error:", error);
    return res.sendStatus(500);
  }
};
