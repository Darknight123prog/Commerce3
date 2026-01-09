import React from 'react'
import { FaGithub } from "react-icons/fa";
function GitHub() {
  const FRONTEND_URL=import.meta.env.VITE_FRONTEND_URL
   
  const handleGithubLogin = () => {
    // Redirect to backend GitHub OAuth
    window.location.href =
      `${FRONTEND_URL}/api/v1/auth/github`;
  };
  return (
   <button  type='button' onClick={handleGithubLogin}><FaGithub /></button>
  )
}

export default GitHub
