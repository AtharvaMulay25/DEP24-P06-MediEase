import React from 'react'
import { SignUp } from "@clerk/clerk-react";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
  return (
    <div className="sign-up-container"> 
      <SignUp path="/signup" routing="path" signInUrl="/signin" />
    </div>
  )
}

export default SignUpPage