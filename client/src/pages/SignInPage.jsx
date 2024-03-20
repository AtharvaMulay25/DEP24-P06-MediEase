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
import { toast } from "sonner";
import Toaster from "../components/UI/Toaster";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import VerifyOTP from "../components/VerifyOTP";
import { apiRoutes } from "../utils/apiRoutes";
export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: ""
  });

  const handleChange = (name, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const asyncTimeout = (delay) => {
    return new Promise(() => {
      setTimeout(() => {
        navigate("/pharmadashboard");
      }, delay);
    });
  };

  const signIn = async () => {
    const user = { ...loginData };

    console.log(user);

    const response = await axios.post(
      `${apiRoutes.auth}/login`,
      user
    );
    if (response.data.ok) {
     toast.success(response.data.message);
     await asyncTimeout(2000);
    }else
    {
      toast.error(response.data.message);
    }
  };
  const handleSubmit = async(e)=>
  {
    e.preventDefault();
    //handle Validation  *****

    setLoading(true);

    try{
      const data = {...loginData, action:"LOGIN"};
      console.log(data);
      const response = await axios.post(`${apiRoutes.otp}/send`, data);
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
      console.error(`ERROR (login): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message);
    }
    setLoading(false);
  }
  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <>
          {isOtpSent ? (
            <VerifyOTP
              email={loginData.email}
              setIsOtpSent={setIsOtpSent}
              handler={signIn}
              otpSubmitHandler={handleSubmit}
            />
          ) : (
            <div className="flex justify-center items-center w-screen h-screen">
              <Card className="w-96">
                <CardHeader
                  variant="gradient"
                  color="gray"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant="h3" color="white">
                    Sign In
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <Typography
                    color="blue-gray"
                    className="-mb-2 ml-2 font-medium"
                  >
                    Email<span className="text-red-800">*</span> :
                  </Typography>
                  <Input
                    label="Email"
                    size="lg"
                    name="email"
                    value={loginData.email}
                    onChange={(e) => {
                      handleChange(e.target.name, e.target.value);
                    }}
                  />
                  <div className="-ml-2.5">
                    <Checkbox label="Remember Me" />
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="gradient" fullWidth onClick={handleSubmit}>
                    Send OTP
                  </Button>
                  <Typography
                    variant="small"
                    className="mt-6 flex justify-center"
                  >
                    Don&apos;t have an account?
                    <Typography
                      as="a"
                      href="/signup"
                      variant="small"
                      color="blue-gray"
                      className="ml-1 font-bold"
                    >
                      Sign up
                    </Typography>
                  </Typography>
                </CardFooter>
              </Card>
            </div>
          )}

        </>
      )}
      <Toaster richColors position="top-center"/>
    </>
  );
}
