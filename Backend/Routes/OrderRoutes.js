const express=require('express');
const { createOrder,getOrderDetails,OrderViewUser } = require('../Controllers/OrderController');
const { auth, roleBasedAccess } = require('../Utils/Authetication');
const OrderRouter=express.Router();


OrderRouter.route('/createOrder').post(auth,createOrder);
OrderRouter.route('/viewUserOrder/').get(auth,OrderViewUser);
OrderRouter.route('/admin/getOrderDetails').post(auth,roleBasedAccess('admin'),getOrderDetails);
module.exports=OrderRouter;