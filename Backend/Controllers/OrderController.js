const OrderModel = require("../Models/OrderModel");

//adding the creating order feature
const createOrder=async(req,res)=>{
  try{
  const {shiping_info,OrderInfo,paymentInfo,itemPrice,shippingPrice,totalPrice}=req.body;

  

 
  const order=await OrderModel.create({
    
      shiping_info:shiping_info,
      OrderInfo:OrderInfo,
      paymentInfo:paymentInfo,
      itemPrice:itemPrice,
      shippingPrice:shippingPrice,
      totalPrice:totalPrice,
      user:req.RequestName._id,
      paidAt:Date.now(),
      StatusInfo:"Pending"
    
     
  })
  return res.status(200).json({
    success:true,
    message:"Order created successfully ",
    order_details:order

  })
}catch(err){
  return res.status(500).json({
    success:false,
    message:"Internal server error ",
    error:err.message
  })
}
}

//creating the get Order Details of all for the admins
const getOrderDetails=async(req,res)=>{
  const Order=await OrderModel.find();
  if(!Order){
    return res.status(500).json({
      success:false,
      message:"Internal server error",
      error:err.message
    })
  }
  return res.status(200).json({
    success:true,
    message:"All Order are fetched sucessfully",
    order_details:Order
  })
}

//adding the all orders view by the user;
const OrderViewUser=async(req,res)=>{
  try{

  const user=req.RequestName;
  const UserOrders=await OrderModel.find({user:user._id});
  return res.status(200).json({
    success:true,
    message:"Order details found ",
    order_details:UserOrders
  })
}catch(err){
  return res.status(500).json({
    success:false,
    message:"Internal server error",
    error:err.message
  })
}
}

//adding the 
module.exports={createOrder,getOrderDetails,OrderViewUser};