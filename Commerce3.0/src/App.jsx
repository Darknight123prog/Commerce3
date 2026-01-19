import React, { lazy, Suspense } from 'react'
import { Route,Router,Routes } from 'react-router-dom'
import Home from './assets/Pages/Home'
import About from './assets/Pages/About'
import Footer from './Componets/Footer'
import Header from './Componets/Header'
import NavBar from './Componets/NavBar'

const Devloper=lazy(()=>import('./Componets/Devloper'))
const SingleProductDetails=lazy(()=>import('./assets/Pages/SingleProductDetails'))
const ProductMainPage=lazy(()=>(import('./assets/Pages/ProductMainPage')));
const Register=lazy(()=>import('./assets/Pages/Register'));
const Profile=lazy(()=>import('./assets/Pages/Profile'));
const LogOut=lazy(()=>('./assets/Pages/LogOut'));
const LogIn=lazy(()=>(import('./assets/Pages/LogIn')))
const Admin=lazy(()=>import('./assets/Pages/Admin'));
const PageNotFound=lazy(()=>import('./assets/Pages/PageNotFound'))
const MainCart=lazy(()=>import('./assets/Pages/MainCart'));
const ProceedToCheckOut=lazy(()=>import('./assets/Pages/ProceedToCheckOut'))
const OrderSummary=lazy(()=>import('./assets/Pages/OrderSummary'));
const BuyNow=lazy(()=>import('./assets/Pages/BuyNow'));
const CreateProductPage=lazy(()=>import('./assets/Pages/CreateProductPage'));
const UpdateProductAdmin=lazy(()=>import('./assets/Pages/UpdateProductAdmin'));
const UpdateSingleProduct=lazy(()=>import('./assets/Pages/UpdateSingleProduct'));
const AllUserData=lazy(()=>import('./assets/Pages/AllUserData'));
const DeleteAnyProduct=lazy(()=>import('./assets/Pages/DeleteAnyProduct'));
const AllAdminsInfo=lazy(()=>import('./assets/Pages/AllAdminsInfo'));
const BlackFridaySale=lazy(()=>import('./assets/Pages/BlackFridaySale'));
import Spiner from './Componets/Spiner'
import Order_tracking_page from './assets/Pages/Order_tracking_page'
import SingleOrderDetails from './assets/Pages/SingleOrderDetails'



function App() {
  return (

<Suspense fallback={<Spiner/>} >
    <div className='h-full w-full'>
      {/* <Header/> */}
      
      <NavBar/>
     
        <Routes>

         
        <Route path='/' element={<Home/>} />
         <Route path='/cart/buyNow' element={<BuyNow/>} />
        /cart/proceedToCheckOut/OrderSummary
        /auth/admin/MainAdmin/updateProduct
        /auth/admin/MainAdmin/updateProduct/UpdateForm

         <Route path='/auth/admin/MainAdmin/updateProduct' element={<UpdateProductAdmin/>} />
         <Route path='/success/secure/OrderList' element={<Order_tracking_page/>} />
         <Route path='/success/secure/SingleOrder/Details/:id' element={<SingleOrderDetails/>} />

         <Route path='/auth/admin/MainAdmin/DeleteAnyProduct' element={<DeleteAnyProduct/>} />
          <Route path='/auth/admin/MainAdmin/GetAllUserInfo' element={<AllUserData/>} />
          <Route path='/auth/admin/MainAdmin/GetAllAdminInfo' element={<AllAdminsInfo/>} />
         <Route path='/auth/admin/MainAdmin/updateProduct/UpdateForm' element={<UpdateSingleProduct/>} />
         <Route path='/cart/ProceedToCheckOut' element={<ProceedToCheckOut/>} />
           <Route path='/cart/proceedToCheckOut/OrderSummary' element={<OrderSummary/>} />
        <Route path='/Cart/details' element={<MainCart/>} />
        <Route path='/login' element={<LogIn/>} />
         <Route path='/Blackfriday/sale' element={<BlackFridaySale/>} />
        <Route path='/about' element={<About/>}/>
         <Route path='/logout' element={<LogOut/>}/>
         <Route path='/Userauth/profile' element={<Profile/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/product'element={<ProductMainPage/>}/>
        <Route path='/devloperInfo' element={<Devloper/>}/>
         <Route path='/auth/admin'element={<Admin/>}/>
         {/* <Route path='/auth/admin/MainAdmin'element={<MainAdminPannel/>}/> */}
          <Route path='/auth/admin/MainAdmin/AddNewProduct'element={<CreateProductPage/>}/>

        <Route path='/ProductDetails/:id'  element={<SingleProductDetails/>} />
        <Route path='*' element={<PageNotFound/>} />
        </Routes>
      
     <Footer/>
    </div>
    </Suspense>
  )
}

export default App
