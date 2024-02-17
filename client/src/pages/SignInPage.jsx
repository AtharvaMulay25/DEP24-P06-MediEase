import React from 'react'
import { SignIn } from "@clerk/clerk-react";
import "../styles/SignInPage.css";

const SignInPage = () => {
  return (
    <div className="sign-in-container"> 
      <SignIn path="/signin" routing="path" />
    </div>
  )
}

export default SignInPage