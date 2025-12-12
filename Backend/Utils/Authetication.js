const jwt=require('jsonwebtoken');
const UserModel = require('../Models/UserModel');

const auth=async(req,res,next)=>{
const token=req.cookies.token;

if(!token){
  return res.status(404).json({
    success:false,
    message:"Not sign in"
  })
}
//if token exist then verifi=ying the token
const flag=jwt.verify(token,process.env.JWT_Secrete);
// const user_mail=jwt.sign('token',token,process.env.JWT_Secrete);
if(!flag){
  return res.status(404).json({
    success:false,
    message:"Not sign in"
  })
}
console.log(flag);

const user=await UserModel.findOne({email:flag.email});
req.RequestName=user;
next();
}


const roleBasedAccess=(...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.RequestName.role)){
     return res.status(403).json({
        success:false,
        message:`you cannot access the resource as an ${req.RequestName.role}`
      })
    }
    next();
  }
}

module.exports={auth,roleBasedAccess};