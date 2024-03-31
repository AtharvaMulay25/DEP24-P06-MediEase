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
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16">
      <div className=" flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-start">
            Our Services
          </h1>
          <p className=" mt-2 text-center lg:text-start">
            We provide the following services based on the roles you login with.
          </p>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row gap-5 pt-14">
        <ServicesCard
          icon={icon1}
          title="Patient"
          content={
            <div>
              <ul>
                <li>• Access past prescriptions effortlessly.</li>
                <li>• Convenient medical leave application for students.</li>
              </ul>
            </div>
          }
        />
        <ServicesCard
          icon={icon2}
          title="Medical Staff"
          content={
            <div>
              <ul>
                <li>• Doctors: Manage schedules and patient records.</li>
                <li>• Paramedical Staff: Monitor stock and suppliers.</li>
                <li>
                  • Both can issue prescriptions and access personalized
                  dashboards.
                </li>
              </ul>
            </div>
          }
        />
        <ServicesCard
          icon={icon3}
          title="Admin"
          content={
            <div>
              <ul>
                <li>• Complete access to all data and functions.</li>
                <li>• Exclusive management of admin accounts.</li>
              </ul>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Services;
