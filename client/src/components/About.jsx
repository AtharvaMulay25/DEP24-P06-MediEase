import React from "react";
import img from "../assets/img/about.jpg";
import "../styles/About.css";
const About = () => {
  const tagline = "Healthcare reimagined for you...";
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-evenly lg:justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5 bg-blue-50">
      <div className="w-full lg:w-3/4 space-y-4">
        <h2 className="text-2xl md:text-4xl font-semibold text-center lg:text-start text-typing">
          <p>{tagline}</p>
        </h2>
        <p className="text-justify lg:text-start">
          Exceptional healthcare tailored to you. Prioritizing your well-being
          with compassion and efficiency. Accessible medical history,
          prescriptions, and leave applications. Streamlined scheduling and
          personalized care for doctors. Efficient medical stock management for
          seamless operations.
        </p>
      </div>
      <div className="w-full lg:w-3/4">
        <img className="rounded-lg" src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;
