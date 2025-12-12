const express=require('express');
const { GetAllProducts,CreateProducts,GetOneProduct,UpdatetheProducts,DeleteOne,getProfileInfo,UpdatePassword,UpdateUserProfile ,getAllUser_Admins,get_single_user_and_admin,Change_the_role} = require('../Controllers/ProductsController');
const{ auth,roleBasedAccess} = require('../Utils/Authetication');

const router=express.Router();
//admin routes
router.route('/api/v1/admin/allproducts').get(auth,roleBasedAccess('admin'),GetAllProducts).post(auth,roleBasedAccess('admin'),CreateProducts);

router.route('/api/v1/admin/products/:id').get(auth,roleBasedAccess('admin'),GetOneProduct).put(auth,roleBasedAccess('admin'),UpdatetheProducts).delete(auth,roleBasedAccess('admin'),DeleteOne);

router.route('/api/v1/admin/profileInfo').get(auth,roleBasedAccess('admin'),getProfileInfo);
router.route('/api/v1/admin/updatePassword').post(auth,roleBasedAccess('admin'),UpdatePassword);
router.route('/api/v1/admin/updateProfileInfo').post(auth,roleBasedAccess('admin'),UpdateUserProfile);
router.route('/api/v1/admin/accesss_to_all_users_admins').get(auth,roleBasedAccess('admin'),getAllUser_Admins);
router.route('/api/v1/admin/accesss_to_all_users_admins/:id').get(auth,roleBasedAccess('admin'),get_single_user_and_admin).put(auth,roleBasedAccess('admin'),Change_the_role);




//user routes
  router.route('/api/v1/products').get(auth,GetAllProducts)

  router.route('/api/v1/products/:id').get(auth,GetOneProduct)


router.route('/api/v1/profileInfo').get(auth,getProfileInfo);
router.route('/api/v1/updatePassword').post(auth,UpdatePassword);
router.route('/api/v1/updateProfileInfo').post(auth,UpdateUserProfile);


module.exports={router};