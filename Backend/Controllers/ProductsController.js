const ProductsModel = require("../Models/ProductsModel");
const UserModel = require("../Models/UserModel");
const {  ApiFilter } = require("../Utils/ApiFilter");
const bcrypt=require('bcryptjs');
const mongoose = require("mongoose");
const sendMails = require("../Utils/Nodemailer");
const passwordUpdatedTemplate = require("../EmailTempletes/UpdatePasswordTemplete");
const UserAccountDeletedTemplate = require("../EmailTempletes/AccountDeletionNotification");
const { cloudinary_js_config: cloudinary } = require("../config/cloudinary");
const fs = require("fs");
//creating the products controller
const CreateProducts = async (req, res) => {
  try {
    const { name, description, price, catogary, stock } = req.body;
    const user = req.RequestName._id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // ✅ Upload all images to cloudinary
    const uploads = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "products",
      })
    );

    const results = await Promise.all(uploads);

    // ✅ Remove local files after upload
    req.files.forEach((file) => fs.unlinkSync(file.path));

    const images = results.map((img) => ({
      product_id: new mongoose.Types.ObjectId().toString(),
      public_url: img.secure_url,
      public_id: img.public_id,
    }));

    const product = new ProductsModel({
      name,
      description,
      price,
      catogary,
      stock,
      user,
      rating: 2,
      image: images,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      details: product,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Product creation failed",
      error: err.message,
    });
  }
};




//showing up a particular products details
const GetOneProduct=async(req,res)=>{

  const product= await ProductsModel.findById({_id:req.params.id});
  try{
  if(!product){
    res.status(500).json({
      success:false,
      message:"Product Not found "

    });

  }
  res.status(200).json({
    success:true,
    message:"Product is found",
    Details:product
  })
}catch(err){
  res.status(500).json({
    success:false,
    message:"Intenal server error",
    error:err.message
  })
}


}

//controller for updating the products
const UpdatetheProducts=async(req,res)=>{
  try{
  const data=await ProductsModel.findByIdAndUpdate(req.params.id,req.body,({
    new:true,
    runValidators:true
  }));
  res.status(200).json({
    success:true,
    message:"Product updated sucessfully",
    Details:data

  })
}
catch(err){
  res.status(404).json({
    success:false,
    message:"product not found",
    error:err.message
  })
}
 
}

//adding the delete functionality

const DeleteOne=async(req,res)=>{
  try{
  const data =await ProductsModel.findOneAndDelete({_id:req.params.id});
  res.status(200).json({
    success:true,
    message:"The selected one deleted successfully",
    details_of_deleted_one:data
  })
}catch(err){
  res.status(500).json({
    success:false,
    messgae:"Cannot delete the product",
    error:err.message
  })

}
}





const GetAllProducts=async (req,res,next)=>{
  //adding the filter functionality
  try{
    const productPerPage=10;
  const ApiFilterFinder=new ApiFilter(ProductsModel.find(),req.query).search().filter();
  const ApiCopy=ApiFilterFinder.query.clone();

  const page=Number(req.query.page)||1;
  const docCount=await ApiCopy.estimatedDocumentCount();
  const total_page=Math.ceil(docCount/productPerPage);

  if(page>total_page && docCount>0){
      res.status(404).json({
        success:false,
        message:"Page Not found"
      })
  };
  if(docCount==0){
   return res.status(404).json({
      success:false,
      message:"Product not found"
    })
  }
  
  ApiFilterFinder.pagination(productPerPage);
  
  const data=await ApiFilterFinder.query;
 return res.status(200).json({
    success:true,
    message:"Successfully brought the data",
    details:data,
    page:page,
    total_page:total_page,
    No_of_products:page
  })
}catch(err){
 return res.status(500).json({
    success:false,
    message:"Cannot retrive Data",
    error:err.message
  })
}
}



//get the user profile
const getProfileInfo=async(req,res)=>{
  try{
  const user=req.RequestName;
  
  return res.status(200).json({
    success:true,
    message:"user profile data is fetched successfully",
    user_details:user
  })
}catch(err){
  
res.status(500).json({
  success:false,
  message:err.message
})
}
}
//updating the passowrd when the user is loged in functinality
const UpdatePassword=async(req,res)=>{
  const {password}=req.RequestName;
  const {newPassword,confirmPassword,oldPassword}=req.body;
if(newPassword!==confirmPassword){
return res.status(400).json({
  sucess:false,
  message:"password and confirm Password is different"
})
}
 const valide= await bcrypt.compare(oldPassword,password);
 const salt=await bcrypt.genSalt(10);
 const newHashedPassword=await bcrypt.hash(newPassword,salt);
 if(valide){
  await UserModel.findOneAndUpdate({_id:req.RequestName._id},{password:newHashedPassword});
  const html=passwordUpdatedTemplate(req.RequestName.name);
const options={
  to:req.RequestName.email,
  subject:"Your Commerce3 password has been updated",
  html:html
}
try{
  await sendMails(options)
}catch(err){
  console.log(err.message);
}
  
return res.status(200).json({
  success:true,
  message:`Password is updated successfully for the username : ${req.RequestName.name}`
})
 }
 else{
  return res.status(500).json({
    success:false,
    message:"Internal server error"
  })
 }
}


//adding the update profile 
const UpdateUserProfile=async(req,res)=>{
  try{
 const user_id=req.RequestName._id;
 const {email,name}=req.body;
  
 await UserModel.findOneAndUpdate({_id:user_id},{email,name});
 return res.status(200).json({
  success:true,
  message:"Profile is updated successfully"
 })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
}


//adding the get all users and admins details for the admin controls
const getAllUser_Admins=async(req,res)=>{
  try{
  const All_users_and_admins=await UserModel.find();
  res.status(200).json({
    success:true,
    message:"All users and admins data is fetched successfully",
    details:All_users_and_admins
  })
}
catch(err){
  return res.status(500).json({
    success:false,
    message:err.message
  })
}
}

//getting the single user data for the admins
const get_single_user_and_admin=async(req,res)=>{
  const id=req.params.id;
  try{
 const user= await UserModel.findOne({_id:id});
 if(!user){
  return res.status(404).json({
    success:false,
    message:"user/admin not found"
  })
 }
 return res.status(200).json({
  success:true,
  message:"successfully fetched the user/admins data",
  details:user
 })
}catch(err){
  return  res.status(500).json({
    success:false,
    message:"Internal server errror",
    error:err.message
  })
}
}

//adding the feature through which admin can change the user role
const Change_the_role=async(req,res)=>{
 const {role}=req.body;
 const id=req.params.id;
 const user=await UserModel.findOne({_id:id});
 try{
 if(!user){
  return res.status(404).json({
    success:false,
    message:"user not found",
  })
 }
 else{
  if(user.role==="admin"){
    return res.status(403).json({
    success:false,
    message:"admin cannot change the admin roles",
  })
  }
  await UserModel.findOneAndUpdate({_id:id},{role:role});
  return res.status(200).json({
    success:true,
    message:`The user name ${user.name} role is changed to ${user.role}`
  })
 }
}catch(err){
  return res.status(500).json({
    success:false,
    message:"Internal server erorr",
    error:err.message
  })
}
}

//adding the feature through which admin can delete the user account
const DeleteUser=async(req,res)=>{
  const id=req.params.id;

  const user=await UserModel.findOne({_id:id})
  if(user.role==="admin"){
    return res.status(403).json({
    success:false,
    message:"admin cannot deltete the other admin accounts",
    
  })

  }
  try{
  const delUser=await UserModel.findOneAndDelete({_id:id});
  const html=UserAccountDeletedTemplate(delUser.name);
  const options={
to:delUser.email,
subject:`the admin ${req.RequestName.name} has deleted the user ${delUser.name}`,
html
  }
  await sendMails(options);
  return res.status(200).json({
    success:true,
    message:`the user ${delUser.name} account is completely deleted by admin ${req.RequestName.name}`
  })
}catch(err){
  return res.status(500).json({
    success:false,
    message:"Internal server error",
    error:err.message
  })
}
}

const viewReviews=async(req,res)=>{
 const product_id=req.query.id;
 const product=await ProductsModel.findOne({_id:product_id});
 if(!product){
  return res.status(404).json({
    success:false,
    message:"Product not found",
  })
 }
 else{
  return res.status(200).json({
    success:true,
    message:"Product reviews are fetched",
    Product_reviews:product.reviews
  })
 }
}

//adding the feature through which registedred user can deltet it's own reviews
const DeleteOwnReview=async(req,res)=>{
  const user=req.RequestName;
  const DeleteProductId=req.query.id;
  const product=await ProductsModel.findOne({_id:DeleteProductId});

  //if product is not found then returning the error
  if(!product){
    return res.status(404).json({
      success:false,
      message:"Product is not found"
    })
  }
  else{
  //reviews array is fetched
  const reviews=product.reviews;
  console.log(reviews)
console.log(user._id);

  const finder=reviews.findIndex(rev=>String(rev.user)===String(user._id))
  if(finder===-1){
    return res.status(403).json({
     success:false,
     message:"unauthrize access or the cretear can delete the review"
    })
  }
  else{
    reviews.splice(finder,1);
    let rate=0;
    reviews.forEach(rev=>{rate+=rev.rating});
    rate=(rate/reviews.length).toFixed(3);
    const number_of_review=reviews.length;
   const updatedrev= await ProductsModel.findOneAndUpdate({_id:DeleteProductId},{reviews,number_of_review,rating:rate},{new:true});
    return res.status(200).json({
      success:true,
      message:"review is delted sucessfully",
      updatedreviws:updatedrev
    })
  }
  }

}




module.exports={GetAllProducts,CreateProducts,GetOneProduct,UpdatetheProducts,DeleteOne,getProfileInfo,UpdatePassword,UpdateUserProfile,getAllUser_Admins,get_single_user_and_admin,Change_the_role,DeleteUser,viewReviews,DeleteOwnReview};