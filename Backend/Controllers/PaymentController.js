const gateway = require("../config/braintree");
const OrderModel = require("../Models/OrderModel");

const getToken = async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    // console.log("Braintree token generated:", response.clientToken); // log token
    res.json({ clientToken: response.clientToken });
  } catch (err) {
    console.error("Error generating Braintree token:", err);
    res.status(500).json({ error: err.message });
  }
};


//payment 
const PostingPaymets=async(req,res)=>{
  // console.log("this part  is working : ",req.body)
  // console.log("Payment body:", req.body);
  const { nonce, amount } = req.body;

  if (!nonce || !amount) {
    return res.status(400).json({ error: "Invalid payment data" });
  }


    const result = await gateway.transaction.sale({
      amount:amount,
      paymentMethodNonce: nonce,
      options: { submitForSettlement: true },
    });
    // console.log(result);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

try{
    const {shiping_info,totalPrice,other_price,productInfo}=req.body;
    //creating the Order
    // console.log("name : ",req.user);
    // console.log("reqName: ",req.RequestName);
    
   const d1= await OrderModel.create({
       shiping_info,
       OrderInfo:productInfo,
      totalPrice,
      shippingPrice:other_price,
        user:req.RequestName._id,
       paymentInfo:result.transaction.id,
      Payment_status:result.transaction.status,

    })
     } catch (err) {
    console.log(`error is ${err}`);
  }
    // console.log("here is the data :",d1);
    

    res.json({
      success: true,
      transactionId: result.transaction.id,
      status: result.transaction.status,
    });
 
}

//adding the feature for the user to get  the order's placed info



module.exports={getToken,PostingPaymets};