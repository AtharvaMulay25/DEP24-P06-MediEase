import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "sonner";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import VerifyOTP from "../components/VerifyOTP";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import Cookies from "js-cookie";

export default function SignUpPage() {
  const { userRole, dispatch } = useAuthContext();
  const [registrationData, setRegistrationData] = useState({
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const asyncTimeout = (delay)=>
  {
      return new Promise(()=>{
        setTimeout(()=>
        {
          navigate("/")
        }, delay);     
        
      })
  }

  if (userRole) {
    navigate("/");
  } 

  const signUp = async() =>
  {
    const user = {email:registrationData.email, role: registrationData.role};
    console.log(user);
      const response = await axios.post('http://localhost:4000/api/auth/signup', user);
      if(response.data.ok)
      {
        //dispatching loggin action 
        dispatch({
          type: "LOGIN",
          payload: response.data.data.user.role,
        })

        //saving the data into cookies 
        Cookies.set("user-role", response.data.data.user.role, {expires: 7});

        toast.success(response.data.message);
        await asyncTimeout(2000);
      }
      else
      {
        toast.error(response.data.message);
      }  

  }
  const handleSubmit = async(e)=>
  {
    e.preventDefault();
    //handle Validation  *****

    setLoading(true);

    try{
      const data = {...registrationData, action:"SIGNUP"};
      console.log(data);
      const response = await axios.post("http://localhost:4000/api/otp/send", data);
      if(response.data.ok){
        setIsOtpSent(true);
        toast.success(response.data.message);
      }
      else
      {
        toast.error(response.data.message);
      }      
    }
    catch(err)
    {
      console.error(`ERROR (signup): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message);
    }
    setLoading(false);
  }
  return (
    <>
    {loading && <SyncLoadingScreen/>}
    {!loading && (
      <>
      {isOtpSent ? <VerifyOTP email={registrationData.email} setIsOtpSent={setIsOtpSent} handler={signUp} otpSubmitHandler={handleSubmit}/>:(
      <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
        <Typography color="blue-gray" className="-mb-2 ml-2 font-medium">
            Email<span className="text-red-800">*</span> :
          </Typography>

          <Input
            label="Email"
            size="lg"
            name="email"
            value={registrationData.email}
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
          />
           <Typography color="blue-gray" className="-mb-2 ml-2 font-medium">
            Role<span className="text-red-800">*</span> :
          </Typography>
          <Select
            label="Select Role"
            size="lg"
            name="role"
            value={registrationData.role}
            onChange={(value) => handleChange("role", value)}
          >
            <Option value="ADMIN">Admin</Option>
            <Option value="DOCTOR">Doctor</Option>
            <Option value="PARAMEDICAL">Paramedical Staff</Option>
            <Option value="PATIENT">Patient</Option>
          </Select>
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSubmit}>
            Send OTP
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Have have an account?
            <Typography
              as="a"
              href="/signin"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
      )}
      </>
    )} 
    </>
    
  );
}
