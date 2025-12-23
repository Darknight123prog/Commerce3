import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
// import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(

     <AuthProvider>
      <BrowserRouter>
    <App />
    <ToastContainer
      position="top"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
    </BrowserRouter>
    </AuthProvider>

)
