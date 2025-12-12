const ProductsModel = require("../Models/ProductsModel");
const UserModel = require("../Models/UserModel");
const {  ApiFilter } = require("../Utils/ApiFilter");
const bcrypt=require('bcryptjs');
const sendMails = require("../Utils/Nodemailer");
const passwordUpdatedTemplate = require("../EmailTempletes/UpdatePasswordTemplete");
//creating the products controller
const CreateProducts=async(req,res)=>{

  const {name,description,price,rating,image,catogary,stock,number_of_review,reviews}=req.body;
  const user=req.RequestName._id;
  // console.log(user);
 try{
  
  const data=await ProductsModel.create({
      name,
      description,
      price,
      rating,
      image,
      catogary,
      stock,
      number_of_review,
      reviews,
      user:user


  })
  res.status(200).json({
    sucess:true,
    message:"Product is successfully added to the Database",
    Details:data,
    
  })


 }catch(err){
  res.status(500).json({
    success:false,
    message:"Something went wrong and product cannot be added to the site",
    error:err.message
  })
 }
  
}


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
    const productPerPage=3;
  const ApiFilterFinder=new ApiFilter(ProductsModel.find(),req.query).search().filter();
  const ApiCopy=ApiFilterFinder.query.clone();

  const page=Number(req.query.page)||1;
  const docCount=await ApiCopy.countDocument;
  const total_page=Math.ceil(docCount/productPerPage);

  if(page>total_page && docCount>0){
      res.status(404).json({
        success:false,
        message:"Page Not found"
      })
  };
  if(docCount==0){
    res.status(404).json({
      success:false,
      message:"Product not found"
    })
  }
  
  ApiFilterFinder.pagination(productPerPage);
  
  const data=await ApiFilterFinder.query;
  res.status(200).json({
    success:true,
    message:"Successfully brought the data",
    details:data
  })
}catch(err){
  res.status(500).json({
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




module.exports={GetAllProducts,CreateProducts,GetOneProduct,UpdatetheProducts,DeleteOne,getProfileInfo,UpdatePassword,UpdateUserProfile,getAllUser_Admins,get_single_user_and_admin,Change_the_role};