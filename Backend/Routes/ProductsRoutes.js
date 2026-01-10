const express=require('express');
const { GetAllProducts,CreateProducts,GetOneProduct,UpdatetheProducts,DeleteOne,getProfileInfo,UpdatePassword,UpdateUserProfile ,getAllUser_Admins,get_single_user_and_admin,Change_the_role,DeleteUser,viewReviews,DeleteOwnReview,getAllOnly_Admins,addReview} = require('../Controllers/ProductsController');
const{ auth,roleBasedAccess} = require('../Utils/Authetication');
const upload = require('../middleware/uploads');

const router=express.Router();
//admin routes
router.route('/admin/allproducts').get(auth,roleBasedAccess('admin'),GetAllProducts)



router.route('/admin/createProducts').post(auth,roleBasedAccess('admin'),upload.array("image",5),CreateProducts) 



router.route('/admin/products/:id').get(auth,roleBasedAccess('admin'),GetOneProduct).put(auth,roleBasedAccess('admin'),UpdatetheProducts).delete(auth,roleBasedAccess('admin'),DeleteOne);

router.route('/admin/profileInfo').get(auth,roleBasedAccess('admin'),getProfileInfo);
router.route('/admin/updatePassword').post(auth,roleBasedAccess('admin'),UpdatePassword);
router.route('/admin/updateProfileInfo').post(auth,roleBasedAccess('admin'),UpdateUserProfile);
router.route('/admin/accesss_to_all_users_admins').get(auth,roleBasedAccess('admin'),getAllUser_Admins);
router.route('/admin/AllAdmins').get(auth,roleBasedAccess('admin'),getAllOnly_Admins);
router.route('/admin/accesss_to_all_users_admins/:id').get(auth,roleBasedAccess('admin'),get_single_user_and_admin).put(auth,roleBasedAccess('admin'),Change_the_role).delete(auth,roleBasedAccess('admin'),DeleteUser);






//user routes
 router.route('/reviews').get(viewReviews).post(auth,addReview);
 
  router.route('/products').get(GetAllProducts)
   router.route('/deleteReview').delete(auth,DeleteOwnReview)

  


router.route('/profileInfo').get(auth,getProfileInfo);
router.route('/updatePassword').post(auth,UpdatePassword);
router.route('/updateProfileInfo').post(auth,UpdateUserProfile);
router.route('/products/:id').get(GetOneProduct)



module.exports=router;