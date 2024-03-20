import React, { useEffect, useState } from "react";
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
  Option
} from "@material-tailwind/react";
import { SyncLoadingScreen } from "./UI/LoadingScreen";
import axios from "axios";
import {toast} from "sonner";
import { apiRoutes } from "../utils/apiRoutes";
const VerifyOTP = ({email, setIsOtpSent, handler, otpSubmitHandler}) => {
    const [data, setData] = useState(
        {
          otp: ""
        }
      )
      const [loading, setLoading] = useState(false);
      const [showResend, setShowResend] = useState(false);
      useEffect(()=>{
        setTimeout(()=>{
          setShowResend(true);
        }, 10000)
      }, [])
      const handleChange = (name, value) => {
        console.log(name, value);
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      // const handleOtpResend = (e) =>
      // {
      //   otpSubmitHandler(e);
      // }
      const handleOTPSubmit = async(e)=>
      {
        e.preventDefault();
        //handle Validation  *****
        console.log(data);
        setLoading(true);
        try
        {
          const response = await axios.post(`${apiRoutes.otp}/verify`, {email: email, otp: data.otp});
          if(response.data.ok){
            toast.success(response.data.message);  //toast messages are not yet integrated**** (no toaster in this branch)
            console.log("verified");
            await handler();
            setIsOtpSent(false);
          }
          else
          {
            toast.error(response.data.message);
            console.log("here");
          }
        }
        catch(err)
        {
          console.log(err);
          toast.error(err?.response?.data?.message);
          if(err.response.status<400 && err.response.status>=500)  //in else case, problem with the request of client 
          {
            setIsOtpSent(false);
          }
        }
        
        setLoading(false);
        
      }
      return (
        <>
        {loading && <SyncLoadingScreen />}
        {!loading &&(
          <div className="flex justify-center items-center w-screen h-screen">   
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Verify OTP
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
          <Typography color="blue-gray" className="-mb-2 ml-2 font-medium">
                OTP<span className="text-red-800">*</span> :
              </Typography>
            <Input label="Enter your Otp" size="lg" type="number" name="otp" value={data.otp} onChange={(e)=>{handleChange(e.target.name, e.target.value)}} />
        
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleOTPSubmit}>
              Verify OTP
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t receive otp?
              <Typography
                as="a"
                variant="small"
                color={showResend ? "blue-gray" : "#d1d5db"}
                // style={showResend?  }
                className={showResend ? "ml-1 font-bold cursor-pointer": "ml-1 font-light cursor-pointer"}
                onClick={showResend && otpSubmitHandler}
              >
                Resend Otp {!showResend  && <span>in 10 secs..</span>}
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
        </div>
        )}
        </>
        
      );
}

export default VerifyOTP