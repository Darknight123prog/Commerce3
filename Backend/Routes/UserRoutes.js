const express=require('express');
const { createUser,UserSignIn,UserLogOut ,ForgetPassword,resetPassword,AddReviewAndUpdate,AddToCart,GetCartProductList,RemoveFromCart,addSearch,getAllSearchedKeyWord} = require('../Controllers/UserController');
const {auth} = require('../Utils/Authetication');

const Router_User=express.Router();
Router_User.route('/register').post(createUser);
Router_User.route('/signin').post(UserSignIn);
Router_User.route('/signout').post(UserLogOut);
Router_User.route('/forgot/password').post(ForgetPassword);


Router_User.route('/add/Reviews').post(auth,AddReviewAndUpdate);
Router_User.route('/add/AddtoCart').post(auth,AddToCart)
Router_User.route('/add/keywords/searched').post(auth,addSearch).get(auth,getAllSearchedKeyWord);;
Router_User.route('/RemoveFromCart').delete(auth,RemoveFromCart);
Router_User.route('/add/GetCartList').get(auth,GetCartProductList);

Router_User.route('/resetPassword/:token').post(resetPassword);



module.exports =Router_User;
