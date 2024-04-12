import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import VerifyOTP from "../components/VerifyOTP";
import { apiRoutes } from "../utils/apiRoutes";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import Cookies from "js-cookie";
import { setToastTimeout } from "../utils/customTimeout.js";


export default function SignInPage() {
  const { userRole, dispatch } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: ""
  });

  if (userRole) {
    navigate("/");
  }

  const handleChange = (name, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const asyncTimeout = (delay, role) => {
    return new Promise(() => {
      setTimeout(() => {
        if (role === "ADMIN") navigate("/admindashboard");
        else if (role === "PARAMEDICAL") navigate("/pharmadashboard");
        else if (role === "DOCTOR") navigate("/doctordashboard");

        //TODO: Change this to patient dashboard
        else if (role === "PATIENT") navigate("/schedule/doctor");
        else navigate("/");
      }, delay);
    });
  };

  const signIn = async () => {
    const user = { ...loginData };

    console.log(user);

    const response = await axios.post(
      `${apiRoutes.auth}/login`,
      user, {
      withCredentials: true
    }
    );
    if (response.data.ok) {
      //dispatching loggin action 
      const resData = response.data;
      dispatch({
        type: "LOGIN",
        payload: resData.data.user,
      })

      //saving the data into cookies 
      Cookies.set("user-role", resData.data.user.role, { expires: 2 / 24 });
      Cookies.set("user-email", resData.data.user.email, { expires: 2 / 24 });
      Cookies.set("user-name", resData.data.user.name, { expires: 2 / 24 });
      // toast.success(response.data.message);
      setToastTimeout("success", response.data.message, 1500);
      await asyncTimeout(0, resData.data.user.role);
    } else {
      toast.error(response.data.message);
    }
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    //handle Validation  *****

    setLoading(true);

    try {
      const data = { ...loginData, action: "LOGIN" };
      console.log(data);
      const response = await axios.post(`${apiRoutes.otp}/send`, data);
      if (response.data.ok) {
        setIsOtpSent(true);
        toast.success(response.data.message);
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (err) {
      console.error(`ERROR (login): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message);
    }
    setLoading(false);
  }
  return (
    <>
      {loading && <SyncLoadingScreen message={"Sending OTP via email..."}/>}
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

    </>
  );
}
