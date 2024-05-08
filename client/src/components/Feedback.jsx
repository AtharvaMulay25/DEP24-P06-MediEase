import React, { useState } from "react";
import feedbackimg from "../assets/img/feedback.png";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";

const Feedback = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function autoResize(textarea) {
    textarea.height = "auto";
    // textarea.style.height = textarea.height + "px";
  }

  async function handleFeedbackSubmit() {
    setLoading(true);
    try {
      const data = {
        subject,
        message,
      };
      const response = await axios.post(`${apiRoutes.mail}/feedback`, data, {
        withCredentials: true,
      });
      const resData = response.data;
      if (resData.ok) {
        toast.success(resData.message);
        console.log(resData.message);
      }
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(
        `ERROR (feedback-sumbit): ${error?.response?.data?.message}`
      );
      toast.error(
        error?.response?.data?.message || "Failed to submit feedback"
      );
    }
    setLoading(false);
  }

  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="flex flex-col justify-center lg:px-32 px-5 pt-24 min-h-screen bg-blue-50"
      >
       
          <Typography variant="h2" color="black">
            Feedback
          </Typography>
        <CardBody className="flex justify-center">
          <div className="flex flex-col md:flex-row justify-center gap-8 h-full w-full bg-white m-4 xl:mx-24 p-8 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className="">
              <img
                className=" h-64 w-full rounded-lg mb-3"
                src={feedbackimg}
                alt="img"
              />
            </div>
            <form className="mt-8 mb-2 w-full md:w-1/3">
              <div className="mb-1 flex flex-col gap-3">
                <Input
                  id="subject"
                  name="subject"
                  label="Subject"
                  size="lg"
                  className="w-full border-blue-gray-200 border h-5 px-3 rounded-lg min-w-[200px]"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Textarea
                  id="message"
                  size="md"
                  label="Message"
                  name="message"
                  type="text"
                  className="w-full border-blue-gray-200 border h-10 px-3 rounded-lg min-w-[200px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                {/* <textarea
                type="message"
                placeholder="Message"
                className="p-2"
                style={{
                  borderColor: "black",
                  borderRadius: 8,
                  borderWidth: 0.5,
                }}
                onFocus={(event) => {
                  event.target.style.borderWidth = "1.5px";
                  event.target.style.borderColour = "black";
                }}
                onBlur={(event) => {
                  event.target.style.borderWidth = "0.5px"; 
                }}
              /> */}
                <Button
                  className="mt-6 mb-6"
                  fullWidth
                  onClick={handleFeedbackSubmit}
                >
                  {!loading && <p>send</p>}
                  {loading && <ClipLoader color="white" />}
                </Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Feedback;
