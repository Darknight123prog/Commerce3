const mongoose=require('mongoose');
const UserModel = require('./UserModel');

const ProductScheme=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"name of product cannot be empty"],
    trim:true
  },
  description:{
    type:String,
    required:[true,"Description cannot be empty"],
    trim:true,
  },
  price:{
    type:Number,
    required:[true,"Price should be mentioned"],

  },
  rating:{
    type:Number,
    default:2,
  },
  image:[{
    product_id:{
      type:String,
      required:true,
    },
    public_url:{
      type:String,
      required:true,

    }
  }],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"UserModel"
  },
  catogary:{
    type:String,
    required:true,
    trim:true
  },
  stock:{
    type:Number,
    default:2000,
  },
  number_of_review:{
    type:Number,
    default:0,
  },
  reviews:[{
    user_name:{
      type:String,
      required:true,
    },
    rating:{
      type:Number,
      required:true,
    },
    review:{
      type:String,
      required:true,
    }
  }],

},{timestamps:true});

module.exports=mongoose.model("ProductModel",ProductScheme);