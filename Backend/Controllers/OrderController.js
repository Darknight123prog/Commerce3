const OrderModel = require("../Models/OrderModel");
const ProductsModel = require("../Models/ProductsModel");

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

//adding the feature of the getting the single order details through the params id for the admin only access
const getSingleOrder=async (req,res)=>{
  try{
  const Order_id=req.params.id;
  const Order=await OrderModel.findOne({_id:Order_id});
  if(!Order){
    return res.status(404).json({
      success:false,
      message:"Order not found"
    })
  }
  else{
return res.status(200).json({
  success:true,
  message:"Order is fetached successfully",
  order_details:Order
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

//adding the featue of updating the order status
const UpdateOrderStatus=async(req,res)=>{
  const OrderId=req.params.id;
  const status=req.body.status;
  const Order=await OrderModel.findOne({_id:OrderId});
    
  if(!Order){
    return res.status(404).json({
      success:false,
      message:"Order not found"
    })
  }
  else{
   
    if(String(Order.OrderStatus)==="delivered"){
      return res.status(400).json({
        sucess:false,
        message:"Order is already deliverded"
      })
    }
    await Promise.all(Order.OrderInfo.map(ee=> UpdateStock(ee,status)));
     Order.OrderStatus=status;
    await Order.save();
    return res.status(200).json({
      success:true,
      message:`Order Status is changed to ${status} of Order :${OrderId}`
    })
   
  }
}
//sub part of the Update Stutsu
const UpdateStock=async(OrderItems, currentStatus)=>{
const Product_id=OrderItems.Product_id;


const product=await ProductsModel.findOne({_id:Product_id});

if(!product){
  throw new Error("Product not found or insufficient stock");
}

if(currentStatus==='dispatch' && OrderItems.OrderStatus!=='dispatch'){

const TotalStockLeft =product.stock-OrderItems.quantity;
if(TotalStockLeft<0){
  throw new Error("Out of Stock");
}
else{
product.stock=TotalStockLeft;

await product.save();
}
}



}
module.exports={createOrder,getOrderDetails,OrderViewUser,getSingleOrder,UpdateOrderStatus};