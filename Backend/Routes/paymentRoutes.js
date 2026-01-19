const express=require('express');
const { auth } = require('../Utils/Authetication');
const { getToken, PostingPaymets ,getOrderDetails,getSingleOrderInfo} = require('../Controllers/PaymentController');
const payRoutes=express.Router();

payRoutes.route('/pay/getToken').get(getToken);
payRoutes.route('/pay/braintree/paymentGateway/secure').post(auth,PostingPaymets)
payRoutes.route('/Order/details/secure/user').get(auth,getOrderDetails);
payRoutes.route('/SingleOrder/details/secure/user/:id').get(auth,getSingleOrderInfo);


module.exports={payRoutes};