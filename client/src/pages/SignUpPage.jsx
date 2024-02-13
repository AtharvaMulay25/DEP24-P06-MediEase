import React from 'react'
import { SignUp } from "@clerk/clerk-react";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
  return (
    <div className="sign-in-container"> 
      <SignUp />
    </div>
  )
}

export default SignUpPage