import React from "react";
import Layout2 from "../layouts/PageLayout2";
import About from "../components/About";
import Services from "../components/Services";
import Doctors from "../components/Doctors";
import Blogs from "../components/Blogs";
import Toaster from "../components/UI/Toaster";
const App = () => {
  return (
    <>
      <Layout2>
        <div>
            <div id="about">
              <About />
            </div>

            <div id="services">
              <Services />
            </div>

            <div id="doctors">
              <Doctors />
            </div>

            <div id="blog">
              <Blogs />
            </div>
        </div>
        <Toaster richColors position="top-center" />
      </Layout2>
    </>
  );
};

export default App;