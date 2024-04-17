import React, { useState } from "react";
import feedbackimg from "../assets/img/feedback.png";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { toast } from "sonner";

const Feedback = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  function autoResize(textarea) {
    textarea.height = "auto";
    // textarea.style.height = textarea.height + "px";
  }

  async function handleFeedbackSubmit() {
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
    } catch (error) {
      console.error(
        `ERROR (feedback-sumbit): ${error?.response?.data?.message}`
      );
      toast.error(
        error?.response?.data?.message || "Failed to submit feedback"
      );
    }
  }

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex flex-col items-center justify-center min-h-screen bg-blue-50"
    >
      <div className="bg-white m-4 p-8 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <Typography variant="h2" color="black">
          Feedback
        </Typography>
        <form className="mt-8 mb-2 w-96 max-w-screen-lg">
          <div className="mb-1 flex flex-col gap-3">
            <img
              className=" h-64 w-full rounded-lg mb-3"
              src={feedbackimg}
              alt="img"
            />
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
          </div>
          <Button
            className="mt-6 mb-6"
            fullWidth
            onClick={handleFeedbackSubmit}
          >
            send
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default Feedback;
