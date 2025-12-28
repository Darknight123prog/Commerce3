import Tracker from '@/Componets/Tracker'
import React, { useEffect, useState } from 'react'

function OrderSummary() {

  const [price, setPrice] = useState({
    price: 0,
    gst: 0,
    other_price: 0,
    totalPrice: 0,
  })
  const [address, setAddress] = useState({})

  useEffect(() => {
    setAddress(JSON.parse(sessionStorage.getItem('address')))
    setPrice(JSON.parse(sessionStorage.getItem('price')))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">

      {/* Tracker */}
      <div className="w-full max-w-4xl mb-6">
        <Tracker st1="finish" st2="finish" st3="process" st4="wait" st5="wait" />
      </div>

      {/* Title */}
      <div className="w-full max-w-4xl bg-amber-500 rounded-2xl py-6 text-center text-xl sm:text-4xl font-semibold mb-6">
        Order Summary
      </div>

      {/* Amount Table */}
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-center">
          Amount to Pay
        </h2>

        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-[600px] w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-sm">Price</th>
                <th className="px-4 py-2 text-sm">GST (18%)</th>
                <th className="px-4 py-2 text-sm">Other</th>
                <th className="px-4 py-2 text-sm">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center hover:bg-gray-50">
                <td className="px-4 py-2">₹{price.price}</td>
                <td className="px-4 py-2">₹{price.gst.toFixed(2)}</td>
                <td className="px-4 py-2">₹{price.other_price}</td>
                <td className="px-4 py-2 font-semibold">
                  ₹{price.totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Table */}
      <div className="w-full max-w-4xl mb-24">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-center">
          Shipping Details & Contact
        </h2>

        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-[700px] w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-sm">Country</th>
                <th className="px-4 py-2 text-sm">State</th>
                <th className="px-4 py-2 text-sm">City</th>
                <th className="px-4 py-2 text-sm">Name</th>
                <th className="px-4 py-2 text-sm">Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center hover:bg-gray-50">
                <td className="px-4 py-2">{address.country}</td>
                <td className="px-4 py-2">{address.state}</td>
                <td className="px-4 py-2">{address.city}</td>
                <td className="px-4 py-2">{address.name}</td>
                <td className="px-4 py-2">{address.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sticky Button */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
        <button
          type="button"
          className="w-full max-w-4xl mx-auto block bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition"
        >
          Pay Now : ₹ {price.totalPrice}
        </button>
      </div>
    </div>
  )
}

export default OrderSummary
