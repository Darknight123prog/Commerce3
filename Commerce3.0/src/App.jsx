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

function App() {
  return (


    <div className='h-full w-full'>
      {/* <Header/> */}
      <NavBar/>
     
        <Routes>
          
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/product'element={<ProductMainPage/>}/>
        <Route path='/devloperInfo' element={<Devloper/>}/>
        <Route path='/ProductDetails/:id'  element={<SingleProductDetails/>} />
        </Routes>
      
     <Footer/>
    </div>
  )
}

export default App
