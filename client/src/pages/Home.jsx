import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import About from "../components/About";
import Services from "../components/Services";
import Staff from "../components/Staff";
import Blogs from "../components/Blogs";
import Feedback from "../components/Feedback";
import { useAuthContext } from "../hooks/useAuthContext";
import { Element } from "react-scroll";

const Home = () => {
  const { userRole } = useAuthContext();
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

          {userRole && (
            <Element id="feedback">
              <Feedback />
            </Element>
          )}
        </div>
      </HomeLayout>
    </>
  );
};

export default Home;
