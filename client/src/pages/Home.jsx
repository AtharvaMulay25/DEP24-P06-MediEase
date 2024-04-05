import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import About from "../components/About";
import Services from "../components/Services";
import Staff from "../components/Staff";
import Blogs from "../components/Blogs";
import Toaster from "../components/UI/Toaster";
import { Element } from "react-scroll";

const Home = () => {
  return (
    <>
      <HomeLayout>
        <div>
          <Element id="about">
            <About />
          </Element>

          <Element id="services">
            <Services />
          </Element>

          <Element id="staff">
            <Staff />
          </Element>

          <Element id="blogs">
            <Blogs />
          </Element>
        </div>
        <Toaster richColors position="top-center" />
      </HomeLayout>
    </>
  );
};

export default Home;
