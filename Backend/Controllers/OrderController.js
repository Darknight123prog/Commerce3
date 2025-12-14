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
module.exports={createOrder};