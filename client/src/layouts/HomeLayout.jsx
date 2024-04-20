import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useAuthContext } from "../hooks/useAuthContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact";
import { useLogout } from "../hooks/useLogout";
import Footer from "../components/Footer";
import { toast } from "sonner";

const HomeLayout = ({ children }) => {
  const { userRole } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged Out Successfully");
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 890px)").matches
  );

  const handleDashboardClick = () => {
    if (userRole === "ADMIN") {
      navigate("/admindashboard");
    } else if (userRole === "PARAMEDICAL") {
      navigate("/pharmadashboard");
    } else if (userRole === "DOCTOR") {
      navigate("/doctordashboard");
    } else if (userRole === "PATIENT") {
      navigate("/schedule/doctor");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 890px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div className="h-screen flex">
      {/* navbar */}
      <div className="fixed top-0 w-full z-10 text-white">
        <div>
          {/* <div className=" flex flex-row justify-between p-5 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"> */}
          <div className=" flex flex-row justify-between items-center py-3 px-5 md:px-8 text-black font-light bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className="flex">
              <div className="h-12 w-12 flex-shrink-0">
                <a href="/">
                  <img
                    src="/src/assets/img/logo.png"
                    alt="Logo"
                    className="-ml-3 -mr-2 cursor-pointer"
                    style={{ width: "100%", height: "100%" }}
                  />
                </a>
              </div>
              <div className=" flex flex-row items-center cursor-pointer">
                <Link to="home" spy={true} smooth={true} duration={500}>
                  <h1 className=" text-2xl font-semibold">
                    <span style={{ color: "#0eb8fc" }}>Medi</span>
                    <span style={{ color: "#fe055c" }}>Ease</span>
                  </h1>
                </Link>
              </div>
            </div>

            <nav className=" hidden lg:flex flex-row items-center text-lg font-medium gap-8">
              {userRole && (
                <Link
                  to="#about"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer p-4 rounded-lg"
                  onClick={() => handleDashboardClick()}
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="#about"
                spy={true}
                smooth={true}
                duration={500}
                className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer p-4 rounded-lg"
                onClick={() => scrollToSection("about")}
              >
                About Us
              </Link>
              <Link
                to="#services"
                spy={true}
                smooth={true}
                duration={500}
                className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer p-4 rounded-lg"
                onClick={() => scrollToSection("services")}
              >
                Services
              </Link>
              <Link
                to="#staff"
                spy={true}
                smooth={true}
                duration={500}
                className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer p-4 rounded-lg"
                onClick={() => scrollToSection("staff")}
              >
                Staff
              </Link>
              <Link
                to="#blogs"
                spy={true}
                smooth={true}
                duration={500}
                className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer p-4 rounded-lg"
                onClick={() => scrollToSection("blogs")}
              >
                Blog
              </Link>
              {userRole && userRole !== "ADMIN" && (
                <Link
                  to="#blogs"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer p-4 rounded-lg"
                  onClick={() => scrollToSection("feedback")}
                >
                  Feedback
                </Link>
              )}
            </nav>
            {/* <SignedOut> */}
            {userRole ? (
              <div className=" hidden lg:flex">
                <button
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out font-semibold"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className=" hidden lg:flex">
                <button
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out font-semibold"
                  // onClick={openForm}
                  onClick={() => navigate("/signin")}
                >
                  Login
                </button>
              </div>
            )}
            {/* </SignedOut> */}
            {/* <SignedIn> */}
            {/* <UserButton afterSignOutUrl="/signin" /> */}

            {/* </SignedIn> */}
            {showForm && <Contact closeForm={closeForm} />}

            <div className=" lg:hidden flex items-center">
              {menu ? (
                <AiOutlineClose size={28} onClick={handleChange} />
              ) : (
                <AiOutlineMenu size={28} onClick={handleChange} />
              )}
            </div>
          </div>
          <div
            className={`${
              menu ? "translate-x-0" : "-translate-x-full"
            } lg:hidden flex flex-col absolute bg-white text-black left-0 top-16 font-semibold text-2xl text-center gap-2 w-full h-fit transition-transform duration-300`}
          >
            {/* <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:bg-gray-300 transition-all cursor-pointer rounded-lg"
            onClick={closeMenu}
          >
            Home
          </Link> */}
            {userRole && (
              <Link
                to="#about"
                spy={true}
                smooth={true}
                duration={500}
                className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer p-4 rounded-lg"
                onClick={() => handleDashboardClick()}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="#about"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer rounded-lg p-2"
              onClick={() => {
                closeMenu();
                scrollToSection("about");
              }}
            >
              About Us
            </Link>
            <Link
              to="#services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer rounded-lg p-2"
              onClick={() => {
                closeMenu();
                scrollToSection("services");
              }}
            >
              Services
            </Link>
            <Link
              to="#staff"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer rounded-lg p-2"
              onClick={() => {
                closeMenu();
                scrollToSection("staff");
              }}
            >
              Staff
            </Link>
            <Link
              to="#blogs"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:bg-gray-300 hover:text-gray-700 transition-all cursor-pointer rounded-lg p-2"
              onClick={() => {
                closeMenu();
                scrollToSection("blogs");
              }}
            >
              Blog
            </Link>
            {userRole ? (
              <div className=" lg:flex">
                <button
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out font-semibold"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="lg:flex mb-2">
                <button
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out font-semibold"
                  // onClick={openForm}
                  onClick={() => navigate("/signin")}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content of page */}
      <div className="flex-auto flex flex-col justify-between shadow-lg bg-gray-50 h-screen overflow-y-auto">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
