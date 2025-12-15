const express=require('express');
const { createOrder,getOrderDetails,OrderViewUser,getSingleOrder,UpdateOrderStatus } = require('../Controllers/OrderController');
const { auth, roleBasedAccess } = require('../Utils/Authetication');
const OrderRouter=express.Router();


OrderRouter.route('/createOrder').post(auth,createOrder);
OrderRouter.route('/viewUserOrder/').get(auth,OrderViewUser);
OrderRouter.route('/admin/getSingleOrder/:id').get(auth,roleBasedAccess('admin'),getSingleOrder);
OrderRouter.route('/admin/UpdateTheStatus/:id').put(auth,roleBasedAccess('admin'),UpdateOrderStatus);
OrderRouter.route('/admin/getOrderDetails').post(auth,roleBasedAccess('admin'),getOrderDetails);
module.exports=OrderRouter;