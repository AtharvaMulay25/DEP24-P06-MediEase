import React from "react";
import Button from "../layouts/Button";
import { RiMicroscopeLine } from "react-icons/ri";
import ServicesCard from "../layouts/ServicesCard";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat, FaUserCog, FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const Services = () => {
  const icon1 = <FaUser size={35} className=" text-backgroundColor" />;
  const icon2 = <FaUserDoctor size={35} className=" text-backgroundColor" />;
  const icon3 = <FaUserCog size={35} className=" text-backgroundColor" />;

  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16 bg-red-50">
      <div className=" flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-start">
            Our Services
          </h1>
          <p className=" mt-2 text-center lg:text-start">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
            quidem.
          </p>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-5 pt-14">
        <ServicesCard
          icon={icon1}
          title="Patient"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          praesentium asperiores"
        />
        <ServicesCard
          icon={icon2}
          title="Staff"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          praesentium asperiores unde veniam, perspiciatis neque!"
        />
        <ServicesCard
          icon={icon3}
          title="Admin"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          praesentium asperiores unde veniam, perspiciatis neque!"
        />
      </div>
    </div>
  );
};

export default Services;
