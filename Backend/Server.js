const express =require("express");
const app=express();
require("dotenv").config();
const cookieParser=require("cookie-parser");
const  Db_Connect  = require("./Database/Database_Connection");
const  router  = require("./Routes/ProductsRoutes");
const Router_User = require("./Routes/UserRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");
const AddBannerRouter = require("./Routes/AddBannerRoutes");
const cors=require('cors');

app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
const passport = require("passport");
// const session = require("express-session");
require("./config/passport");
const AuthRouter = require("./Routes/authRoutes");
const { payRoutes } = require("./Routes/paymentRoutes");
// const { getToken } = require("./Controllers/PaymentController");





//connecting withe database
Db_Connect()




//allowing only limited number of users to access the backend
app.use(cors({
  origin: process.env.frontend_url,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.static('public', {
  maxAge: '1y',     // cache for 1 year
  etag: false
}));
app.set("trust proxy", 1);

// app.use(
//   session({
//     name: "oauth_session",
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     proxy: true,
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       httpOnly: true,
//       sameSite: process.env.NODE_ENV==='production'?"none":"lax" ,
//       maxAge: 10 * 60 * 1000, 
//     },
//   })
// );



app.use(passport.initialize());
// app.use(passport.session());

app.use('/api/v1/payment/paypal',payRoutes)
//routes for all the products routes

app.use('/api/v1/products',router);
//need to test

app.use('/api/v1/user',Router_User);
app.use('/api/v1', AuthRouter);
//ok
app.use("/api/orders", OrderRoutes);
//ok
app.use('/api/v1',AddBannerRouter);
//ok







const PORT =process.env.PORT ||8978
app.listen(PORT,()=>{
  console.log(`Server is started at http://localhost:${PORT}`);
})

