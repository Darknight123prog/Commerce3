const express=require('express');
const { createUser,UserSignIn,UserLogOut ,ForgetPassword,resetPassword,AddReviewAndUpdate} = require('../Controllers/UserController');
const {auth} = require('../Utils/Authetication');

const Router_User=express.Router();

Router_User.route('/api/v1/register').post(createUser);
Router_User.route('/api/v1/signin').post(UserSignIn);
Router_User.route('/api/v1/signout').post(UserLogOut);
Router_User.route('/api/v1/forgot/password').post(ForgetPassword);

Router_User.route('/api/v1/add/Reviews').post(auth,AddReviewAndUpdate);
Router_User.route('/api/v1/:token').post(resetPassword);


module.exports =Router_User;
