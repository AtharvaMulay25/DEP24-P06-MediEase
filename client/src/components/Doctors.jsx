import React, { useRef } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Doctors = () => {
  const data = [
    {
      img: "/src/assets/img/reena.jpg",
      name: "Dr. Reena Rani",
      specialties: "Medical Officer – Allopathy",
    },
    {
      img: "/src/assets/img/charnjit.jpg",
      name: "Dr.Charanjit Singh",
      specialties: "Medical Officer – Allopathy",
    },
    {
      img: "/src/assets/img/gurvinder.png",
      name: "Dr. Gurvinder Kaur Saini",
      specialties: "Medical Officer – Ayurveda",
    },
    {
      img: "/src/assets/img/Dipti.jpg",
      name: "Dr. Dipti Borad",
      specialties: "Medical Officer – Homeopathy",
    },
    {
      img: "/src/assets/img/vikas.jpg",
      name: "Mr. Vikas",
      specialties: "Pharmacist",
    },
    {
      img: "/src/assets/img/vijay.jpg",
      name: "Mr. Vijay Singh",
      specialties: "Pharmacist",
    },
  ];

  const slider = useRef(null);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16 bg-yellow-50">
      <div className=" flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-start">
            Our Doctors
          </h1>
          <p className=" mt-2 text-center lg:text-start">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
            quidem.
          </p>
        </div>
      </div>
      <div className="mt-5">
        <Carousel
          className="rounded-xl"
          style={{
            height: 600,
            width: 400,
          }}
          loop={true}
          autoplay={true}
          autoplayDelay={3000}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-3 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer -mb-1 rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-6 bg-white" : "w-3 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {data.map((item, index) => (
            <div key={index} className="h-full w-full relative">
              <img
                src={item.img}
                alt={`image ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm">{item.specialties}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Doctors;
