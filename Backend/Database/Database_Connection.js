const mongoose=require('mongoose');
const  Db_Connect= async (req,res)=>{
  try{
  const data=await mongoose.connect(process.env.Database_url);
  console.log("Sucessfully connected withe Database : ",data.connection.name);
  }
  catch(err){
    console.log("Cannot connect to the Database")
  }

  
}
module.exports=Db_Connect;

  