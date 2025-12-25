const express =require("express");
const app=express();
const cookieParser=require("cookie-parser");
const  Db_Connect  = require("./Database/Database_Connection");
const  router  = require("./Routes/ProductsRoutes");
const Router_User = require("./Routes/UserRoutes");
const OrderRouter = require("./Routes/OrderRoutes");
const AddBannerRouter = require("./Routes/AddBannerRoutes");
const cors=require('cors');
require("dotenv").config();
app.use(cookieParser());
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

app.use(
  session({
    secret: "passport_secret",
    resave: false,
    saveUninitialized: false
  })
);



app.use(passport.initialize());
app.use(passport.session());


//routes for all the products routes
app.use('/',router);
app.use('/',Router_User);
app.use('/api/v1',OrderRouter)
app.use('/api/v1',AddBannerRouter);
app.use('/api/v1', AuthRouter);






const PORT =process.env.PORT ||8978
app.listen(PORT,()=>{
  console.log(`Server is started at http://localhost:${PORT}`);
})

