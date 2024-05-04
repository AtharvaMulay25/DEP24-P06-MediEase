import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReenaImg from "../assets/img/reena.jpg";
import CharanjitImg from "../assets/img/charnjit.jpg";
import GurvinderImg from "../assets/img/gurvinder.png";
import DiptiImg from "../assets/img/Dipti.jpg";
import VikasImg from "../assets/img/vikas.jpg";
import VijayImg from "../assets/img/vijay.jpg";

const Staff = () => {
  const data = [
    {
      img: ReenaImg,
      name: "Dr. Reena Rani",
      specialties: "Doctor – Allopathy",
    },
    {
      img: CharanjitImg,
      name: "Dr. Charanjit Singh",
      specialties: "Doctor – Allopathy",
    },
    {
      img: GurvinderImg,
      name: "Dr. Gurvinder Kaur Saini",
      specialties: "Doctor – Ayurveda",
    },
    {
      img: DiptiImg,
      name: "Dr. Dipti Borad",
      specialties: "Doctor – Homeopathy",
    },
    {
      img: VikasImg,
      name: "Mr. Vikas",
      specialties: "Pharmacist",
    },
    {
      img: VijayImg,
      name: "Mr. Vijay Singh",
      specialties: "Pharmacist",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoPlay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-start mx-auto bg-blue-50  px-5 pt-24 lg:pt-32 lg:px-32">
      <div className="items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <h1 className=" text-4xl font-semibold text-center lg:text-start">
          Our Staff
        </h1>
        <p className=" mt-2 text-center lg:text-start">
          Presenting our esteemed staff, from skilled doctors to dedicated
          medical staff.
        </p>
      </div>
      <div className="w-3/4 mx-auto my-32">
        <Slider {...settings}>
          {data.map((d) => (
            <div className="h-[400px] w-[270px] bg-white text-black rounded-xl">
              <div className="rounded-top-xl bg-blue-500 flex justify-center items-center rounded-t-xl h-[270px]">
                <img
                  src={d.img}
                  alt={d.name}
                  className="h-44 w-44 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-1 p-4">
                <p className="text-xl font-semibold">{d.name}</p>
                <p>{d.specialties}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Staff;
