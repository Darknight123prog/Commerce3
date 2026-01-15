const express=require('express');
const { auth } = require('../Utils/Authetication');
const { getToken, PostingPaymets } = require('../Controllers/PaymentController');
const payRoutes=express.Router();

payRoutes.route('/pay/getToken').get(getToken);
payRoutes.route('/pay/braintree/paymentGateway/secure').post(auth,PostingPaymets)

module.exports={payRoutes};