import React from 'react'
import {  PropagateLoader } from 'react-spinners'

function Spiner() {
  return (
    <div>
      <div className="flex items-center justify-center h-[60vh]">
       <PropagateLoader />
      </div>
    </div>
  )
}

export default Spiner
