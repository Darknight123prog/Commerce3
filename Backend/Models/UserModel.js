const mongoose=require('mongoose');
const validator = require('validator');

const UserSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    maxLength:[25,"Name cannot excced the 25 characters"],
    minLength:[3,"Name must have 3 characters"],
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validate:[validator.isEmail,"invalid E-mail"]
  },
  password:{
    type:String,
    required:true,
    minLength:[4,"Password cannot be less then 4 characters"],
  },
  avator:{
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true,
    }
  },
  role:{
    type:String,
    default:"User",
  },
  resetPasswordToken:{
    type:String
  },
  resetPasswordExpire:{
    type:Date
  }

},{timestamps:true});

module.exports=mongoose.model("UserModel",UserSchema);