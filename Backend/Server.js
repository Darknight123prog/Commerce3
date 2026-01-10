const express =require("express");
const app=express();
require("dotenv").config();
const cookieParser=require("cookie-parser");
const  Db_Connect  = require("./Database/Database_Connection");
const  router  = require("./Routes/ProductsRoutes");
const Router_User = require("./Routes/UserRoutes");
const OrderRouter = require("./Routes/OrderRoutes");
const AddBannerRouter = require("./Routes/AddBannerRoutes");
const cors=require('cors');

app.use(cookieParser());
const paymentRoutes=require('./Routes/paymentRoutes')
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const passport = require("passport");
const session = require("express-session");
require("./config/passport");
const AuthRouter = require("./Routes/authRoutes");





//connecting withe database
Db_Connect()




//allowing only limited number of users to access the backend
app.use(cors({
  origin:process.env.frontend_url,
    credentials: true,
}))
app.use(express.static('public', {
  maxAge: '1y',     // cache for 1 year
  etag: false
}));
app.use(
  session({
    secret: "passport_secret",
    resave: false,
    saveUninitialized: false
  })
);


app.use("/api/payment", paymentRoutes);
app.use(passport.initialize());
app.use(passport.session());


//routes for all the products routes

app.use('/api/v1/products',router);
//need to test
app.use('/api/v1/user',Router_User);
//ok
app.use('/api/v1',OrderRouter)
//ok
app.use('/api/v1',AddBannerRouter);
//ok
app.use('/api/v1', AuthRouter);






const PORT =process.env.PORT ||8978
app.listen(PORT,()=>{
  console.log(`Server is started at http://localhost:${PORT}`);
})

