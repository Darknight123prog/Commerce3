const express=require('express');
const { createOrder } = require('../Controllers/OrderController');
const { auth } = require('../Utils/Authetication');
const OrderRouter=express.Router();


OrderRouter.route('/createOrder').post(auth,createOrder);
module.exports=OrderRouter;