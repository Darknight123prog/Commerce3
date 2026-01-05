const express=require('express');
const { createUser,UserSignIn,UserLogOut ,ForgetPassword,resetPassword,AddReviewAndUpdate,AddToCart,GetCartProductList,RemoveFromCart,addSearch,getAllSearchedKeyWord} = require('../Controllers/UserController');
const {auth} = require('../Utils/Authetication');

const Router_User=express.Router();
Router_User.route('/api/v1/register').post(createUser);
Router_User.route('/api/v1/signin').post(UserSignIn);
Router_User.route('/api/v1/signout').post(UserLogOut);
Router_User.route('/api/v1/forgot/password').post(ForgetPassword);


Router_User.route('/api/v1/add/Reviews').post(auth,AddReviewAndUpdate);
Router_User.route('/api/v1/add/AddtoCart').post(auth,AddToCart)
Router_User.route('/api/v1/add/keywords/searched').post(auth,addSearch).get(auth,getAllSearchedKeyWord);;
Router_User.route('/api/v1/RemoveFromCart').delete(auth,RemoveFromCart);
Router_User.route('/api/v1/add/GetCartList').get(auth,GetCartProductList);

Router_User.route('/api/v1/resetPassword/:token').post(resetPassword);



module.exports =Router_User;
