import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

const Feedback = () => {
  function autoResize(textarea) {
    textarea.height = "auto";
    // textarea.style.height = textarea.height + "px";
  }

  return (
    <Card
      color="transparent"
      shadow={false}
      className="flex flex-col items-center justify-center"
    >
      <div className="bg-white m-4 p-8 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <Typography variant="h2" color="black">
          Feedback
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="h6" color="black" className="-mb-3">
              Message
            </Typography>
            <Input
              size="lg"
              placeholder="Message"
              className=" !border-t-black-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
          <Button className="mt-6 mb-6" fullWidth>
            send
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default Feedback;
