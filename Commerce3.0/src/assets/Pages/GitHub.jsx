import React from 'react'
import { FaGithub } from "react-icons/fa";
function GitHub() {
   
  const handleGithubLogin = () => {
    // Redirect to backend GitHub OAuth
    window.location.href =
      "http://localhost:5173/api/v1/auth/github";
  };
  return (
   <button  type='button' onClick={handleGithubLogin}><FaGithub /></button>
  )
}

export default GitHub
