const express=require('express');
const { auth,roleBasedAccess } = require('../Utils/Authetication');
const { AddBanner, getUrl } = require('../Controllers/AddBannerController');
const AddBannerRouter=express.Router();

AddBannerRouter.route('/addBanner/admin').post(auth,roleBasedAccess('admin'),AddBanner);
AddBannerRouter.route('/getBannerUrl').get(getUrl);

module.exports =AddBannerRouter;