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
import { apiRoutes } from "../utils/apiRoutes";
import axios from "axios";
import { toast } from "sonner";
import Toaster from "../components/UI/Toaster";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import VerifyOTP from "../components/VerifyOTP";
import { useAuth } from "../hooks/useAuth.jsx";
import Cookies from "js-cookie";

export default function SignUpPage() {
  const { userRole, dispatch } = useAuth();
  const [registrationData, setRegistrationData] = useState({
    email: "",
    role: "",
    name: "",
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
  const asyncTimeout = (delay, redirectUrl) => {
    return new Promise(() => {
      setTimeout(() => {
        navigate(redirectUrl);
      }, delay);
    });
  };
  const signUp = async () => {
    const user = { ...registrationData };
    console.log(user);
    if (user.role !== "PATIENT") {
      // navigate("/staff/profile");
      const response = await axios.post(`${apiRoutes.mail}/pending`, user);
      if (response.data.ok) {
        toast.success(response.data.message);
        await asyncTimeout(3000, "/");
      } else {
        toast.error(response.data.message);
      }
    } else {
      const response = await axios.post(`${apiRoutes.auth}/signup`, user, {
        withCredentials: true
      });
      if (response.data.ok) {
        const resData = response.data;
        dispatch({
          type: "LOGIN",
          payload: resData.data.user,
        });

        //saving the data into cookies
        Cookies.set("user-role", resData.data.user.role, { expires: 7 });
        Cookies.set("user-email", resData.data.user.email, { expires: 7 });
        Cookies.set("user-name", resData.data.user.name, { expires: 7 });

        toast.success(response.data.message);

        await asyncTimeout(2000, "/patient/profile");
      } else {
        toast.error(response.data.message);
      }
    }
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    //handle Validation  *****

    setLoading(true);

    try {
      const data = { email: registrationData.email, action: "SIGNUP" }; //not passing name to /otp/send
      console.log(data);
      const response = await axios.post(`${apiRoutes.otp}/send`, data);
      if (response.data.ok) {
        setIsOtpSent(true);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(`ERROR (signup): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message);
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <>
          {isOtpSent ? (
            <VerifyOTP
              email={registrationData.email}
              setIsOtpSent={setIsOtpSent}
              handler={signUp}
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
                    Sign Up
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <Typography
                    color="blue-gray"
                    className="-mb-2 ml-2 font-medium"
                  >
                    Name<span className="text-red-800">*</span> :
                  </Typography>

                  <Input
                    label="Name"
                    size="lg"
                    name="name"
                    value={registrationData.name}
                    onChange={(e) => {
                      handleChange(e.target.name, e.target.value);
                    }}
                  />
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
                    value={registrationData.email}
                    onChange={(e) => {
                      handleChange(e.target.name, e.target.value);
                    }}
                  />
                  <Typography
                    color="blue-gray"
                    className="-mb-2 ml-2 font-medium"
                  >
                    Role<span className="text-red-800">*</span> :
                  </Typography>
                  <Select
                    label="Select Role"
                    size="lg"
                    name="role"
                    value={registrationData.role}
                    onChange={(value) => handleChange("role", value)}
                  >
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
                  <Typography
                    variant="small"
                    className="mt-6 flex justify-center"
                  >
                    Already have an account?
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
      <Toaster richColors position="top-center" />
    </>
  );
}
