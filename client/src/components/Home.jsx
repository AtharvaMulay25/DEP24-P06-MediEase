import React from "react";
import Button from "../layouts/Button";

const Home = () => {
  return (
    <div className=" min-h-screen mt-18 flex flex-col justify-center lg:px-32 px-5 text-black bg-[url('assets/img/bg_img.jpg')] bg-no-repeat bg-cover opacity-90">
      <div className=" w-full h-64 lg:w-4/5 space-y-28 ">
        <h1 className="text-3xl font-bold leading-tight">
        Empowering Medical Centers: Simplifying Healthcare Management ..
        </h1>
        {/* <p>
          Reprehenderit incidunt expedita
          molestiae impedit at sequi dolorem iste sit culpa, optio voluptates
          fugiat vero consequatur?
        </p> */}
        <div className="mt-18">
      
        {/* <Button  title="Get Started" /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;