const bcrypt=require('bcryptjs');
const UserModel = require('../Models/UserModel');
const crypto = require("crypto");
 var jwt = require('jsonwebtoken');
const sendMails = require('../Utils/Nodemailer');
const ForgetPasswordTemplete = require('../EmailTempletes/forgotPasswordTemplete');
const Commerce3WelcomeEmail = require('../EmailTempletes/WelocmeTemplete');
const passwordUpdatedTemplate = require('../EmailTempletes/UpdatePasswordTemplete');
const ProductsModel = require('../Models/ProductsModel');


const createUser=async(req,res)=>{
  try{
  const {name,email,password,avator}=req.body;
    //checking for dublicate email
    const user=await UserModel.findOne({email:email});
    if(user){
     return res.status(400).json({
        success:false,
        message:"user already exists"
      })
    }


 const salt=await bcrypt.genSalt(10);
 const hashed= await bcrypt.hash(password, salt) ;
   const data=await UserModel.create({
    name,
    email,
    password:hashed,
    avator
   })

  var token = jwt.sign(email,process.env.JWT_Secrete );
  res.cookie("token",token,{
    httpOnly:true,
    strict:true,
    secure:true,
    expires:new Date(Date.now()+1000*60*30)
  })

  const html=Commerce3WelcomeEmail(name);


  options={
    to:email ,
    subject:"Welcome to Commerce3.0 website",
    html
  }

  await sendMails(options);


   res.status(200).json({
    success:true,
    message:"user registered successfully",
    details:data
   })
  }catch(err){
    res.status(500).json({
      success:false,
      message:"Internal server error",
      error:err.message
    })
  }
   
   
}

//adding the log in functionality
const UserSignIn=async(req,res,next)=>{
  const {email,password}=req.body;
  const user=await UserModel.findOne({email});
  
  if(!user){
    
    return res.status(500).json({
      success:false,
     
      message:"wrong credentails"
    })
  }
  //now verifying the password
  const flag=await bcrypt.compare(password,user.password);
  if(!flag){
    return res.status(500).json({
      success:false,
      message:"wrong credentials"
    })
  }
  //password is verified
  //storing the value of user in req
  console.log(req.user);
  req.user=user;
  console.log(req.user);
  //generta the tokens
  const token=await jwt.sign({email:email},process.env.JWT_Secrete);
  res.cookie("token",token,({
    secure:true,
    httpOnly:true,
    expires:new Date(Date.now()+1000*60*30),
  })) 
 res.status(200).json({
  success:true,
  message:"log in successfully",
  details:user.name,
  role:user.role
 })
  
}

//adding the log out feature
const UserLogOut=async(req,res)=>{
  res.cookie("token",null,{
    secure:true,
    httpOnly:true,
    expires:new Date(Date.now())
  })
  res.status(200).json({success:true,message:"user log out successfully"});
}

//adding the forget password functionality
const ForgetPassword=async(req,res,next)=>{
 const {email}=req.body;
 //checeking if the email/user exist or not
 const user=await UserModel.findOne({email:email});
 if(!user){
  return res.status(404).json({
    success:false,
    message:"User Not exists",
  })
 };
 //generating the token for the reseting the forgot passsowrd
 const resetPasswordToken= crypto.randomBytes(20).toString("hex");
 

 const hashedResetToken=crypto.createHash("sha256").update(resetPasswordToken).digest("hex")
 const resetPasswordExpire=Date.now()+1000*60*10;

 //now string the hasehed password  in the database
 const data1=await UserModel.findOneAndUpdate({email:email},{resetPasswordToken:hashedResetToken,resetPasswordExpire:resetPasswordExpire});
//  data1.save();
try{
 //now send the mail for reseting the password
 reset_link=`http://localhost:${process.env.PORT}/api/v1/${resetPasswordToken}`;
 const html=ForgetPasswordTemplete(user.name,reset_link);
 const options={
  to:user.email,
  subject:"Forgot-reset password link",
  html,
 }

//sending the mail for the reset link
await sendMails(options);

res.status(200).json({
  success:true,
  message:"email for verification is sent"
})
}
catch(err){
  res.status(500).json({
    success:false,
    message:`the error is ${err.message}`
  })
}
}
const resetPassword=async(req,res,next)=>{
  
  const token=req.params.token;

 const resetHashedToken= crypto.createHash("sha256").update(token).digest("hex")
const user= await UserModel.findOne({
    resetPasswordToken: resetHashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
if(!user){
  return res.status(403).json({
    success:false,
    message:"Access Denied"
  });
}
  //storing the value for the necessary action
  

  //time for generating the new password
  const {password,confirmPassword}=req.body;
  if(password===confirmPassword){
    const salt=await bcrypt.genSalt(10);
    const hasedPassowrd=await bcrypt.hash(password,salt);
    const data1=await UserModel.findOneAndUpdate({_id:user._id},{password:hasedPassowrd});
   



    const html=passwordUpdatedTemplate(user.name);
    const options={
      to:user.email,
      subject:"Your Commerce3 password has been changed",
      html:html
    }
    try{
      await sendMails(options)
    }catch(err){
      console.log(err.message);
    }
     
    res.status(200).json({
      success:true,
      message:"password is updated succesffully",
      new_details:user
    })
  }else{
    return res.status(500).json({
      success:false,
      message:"both the password and the confirm password is differnt"
    })
  }
}

//adding the feature for the adding the new or update the existing review & rating
const AddReviewAndUpdate=async(req,res)=>{
  const user=req.RequestName;
  const product_id=req.query.Product_id;
  const product=await ProductsModel.findOne({_id:product_id});
  if(!product){
    return res.status(404).json({
      success:false,
      message:"product not found"
    })
  }
  else{
   
    let reviews=product.reviews;
    const {rating,review}=req.body;
   const foundIndex= reviews.findIndex(r=>String(r.user)===String(user._id));
    if(foundIndex!==-1){
      // reviews=await ProductsModel.findOne({_id:product_id});
      reviews.splice(foundIndex,1);
  }
  reviews.push({
        user:user._id,
        user_name:user.name,
        rating,
        review
      })
    
    let sum=0;
    reviews.forEach(rev=>{sum+=rev.rating});
    let rate=sum/(reviews.length);
    let number_of_review=reviews.length;
 const data= await ProductsModel.findOneAndUpdate({_id:product_id},{
      reviews,
      number_of_review,
      rating:rate.toFixed(3)
    },{new:true});
    return res.status(200).json({
      success:true,
      message:"Product review are updated successfully",
      product_details:data
    })

} }




module.exports={createUser,UserSignIn,UserLogOut,ForgetPassword,resetPassword,AddReviewAndUpdate}