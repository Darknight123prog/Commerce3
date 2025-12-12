const express =require("express");
const app=express();
const cookieParser=require("cookie-parser");
const  Db_Connect  = require("./Database/Database_Connection");
const { router } = require("./Routes/ProductsRoutes");
const Router_User = require("./Routes/UserRoutes");
require("dotenv").config();
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//connecting withe database
Db_Connect()

//routes for all the products routes
app.use('/',router);
app.use('/',Router_User);





const PORT =process.env.PORT ||8978
app.listen(PORT,()=>{
  console.log(`Server is started at http://localhost:${PORT}`);
})

