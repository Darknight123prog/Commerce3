const AddBannerModel = require("../Models/AddBannerModel");

const AddBanner=async(req,res)=>{
  try{
  const url=req.body.url;
  const added=await AddBannerModel.create({
    url
  })
  return res.status(200).json({
    success:true,
    message:"url added successfully",

  })
}catch(err){
  return res.status(500).json({
    success:false,
    message:"Internal Server Error",
    error:err.message
  })
}
}

// feature for getting the url
const getUrl=async(req,res)=>{
  try{
  const url=await AddBannerModel.find();
  if(!url){
   return res.status(404).json({
      success:false,
      message:"url not found"
    })
  }
  else{
 return  res.status(200).json({
      success:true,
      message:"url found",
      url:url
    })
  }
}
catch(err){
  return res.status(500).json({
    success:false,
    message:"Internal Server error",
    error:err.message
  })
}
}
module.exports={AddBanner,getUrl};