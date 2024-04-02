import React from "react";
import img from "../assets/img/about.jpg";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col lg:flex-row justify-evenly lg:justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5 bg-blue-50">
      <div className=" w-full lg:w-3/4 space-y-4">
        <h1 className=" text-4xl font-semibold text-center lg:text-start">
          About Us
        </h1>
        <p className=" text-justify lg:text-start">
          At our institute hospital, we are committed to providing exceptional
          healthcare services tailored to your needs. With a dedicated team of
          professionals, we prioritize patient well-being above all else. Our
          goal is to deliver comprehensive medical care with compassion and
          efficiency, ensuring your health and satisfaction.
        </p>
        <p className="text-justify lg:text-start">
          Our patient-centric approach ensures that individuals have easy access
          to their medical history, prescriptions, and studnets have the ability
          to apply for medical leave using our page, with the medical history we
          provided. conveniently. On the staff side, our doctors benefit from
          streamlined scheduling processes and access to patient records,
          facilitating efficient and personalized care. Meanwhile, our
          paramedical staff can effectively manage medical stock, update
          inventory, and oversee supplier relations, ensuring seamless
          operations.
        </p>
      </div>
      <div className=" w-full lg:w-3/4">
        <img className=" rounded-lg" src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;
