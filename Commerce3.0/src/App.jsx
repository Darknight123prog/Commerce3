import React from 'react'
import { Route,Router,Routes } from 'react-router-dom'
import Home from './assets/Pages/Home'
import About from './assets/Pages/About'
import Footer from './Componets/Footer'
import Header from './Componets/Header'
import NavBar from './Componets/NavBar'

import Devloper from './Componets/Devloper'
import SingleProductDetails from './assets/Pages/SingleProductDetails'
import ProductMainPage from './assets/Pages/ProductMainPage'
import Register from './assets/Pages/Register'
import Profile from './assets/Pages/Profile'
import LogOut from './assets/Pages/LogOut'
import LogIn from './assets/Pages/LogIn'
import Admin from './assets/Pages/Admin'
import MainAdminPannel from './assets/Pages/MainAdminPannel'
import PageNotFound from './assets/Pages/PageNotFound'
import MainCart from './assets/Pages/MainCart'
import ProceedToCheckOut from './assets/Pages/ProceedToCheckOut'
import OrderSummary from './assets/Pages/OrderSummary'
import BuyNow from './assets/Pages/BuyNow'


function App() {
  return (


    <div className='h-full w-full'>
      {/* <Header/> */}
      <NavBar/>
     
        <Routes>
         
        <Route path='/' element={<Home/>} />
         <Route path='/cart/buyNow' element={<BuyNow/>} />
        /cart/proceedToCheckOut/OrderSummary
         <Route path='/cart/ProceedToCheckOut' element={<ProceedToCheckOut/>} />
           <Route path='/cart/proceedToCheckOut/OrderSummary' element={<OrderSummary/>} />
        <Route path='/Cart/details' element={<MainCart/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/about' element={<About/>}/>
         <Route path='/logout' element={<LogOut/>}/>
         <Route path='/Userauth/profile' element={<Profile/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/product'element={<ProductMainPage/>}/>
        <Route path='/devloperInfo' element={<Devloper/>}/>
         <Route path='/auth/admin'element={<Admin/>}/>
         <Route path='/auth/admin'element={<MainAdminPannel/>}/>
        <Route path='/ProductDetails/:id'  element={<SingleProductDetails/>} />
        <Route path='*' element={<PageNotFound/>} />
        </Routes>
      
     <Footer/>
    </div>
  )
}

export default App
