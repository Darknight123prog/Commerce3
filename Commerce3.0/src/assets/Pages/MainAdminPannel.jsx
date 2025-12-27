import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import CreateProductPage from './CreateProductPage';

function MainAdminPannel() {
  const {user}=useAuth();
  return (
    <div>
     <h1>Admin Control Pannel</h1>

     <div>
      {<CreateProductPage/>}
     
      <div className=''>
        
      </div>
     </div>

    </div>
  )
}

export default MainAdminPannel
