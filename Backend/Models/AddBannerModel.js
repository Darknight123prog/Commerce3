const mongoose=require('mongoose');
const AddbannerSchema=new mongoose.Schema({
  url:{
    type:String,
    required:true,
    trim:true
  }
})
module.exports=mongoose.model('AddBannerModel',AddbannerSchema);