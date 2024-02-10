import React from 'react'
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <SignIn path="/signin" routing="path" signUpUrl="/signup" />
  )
}

export default SignInPage