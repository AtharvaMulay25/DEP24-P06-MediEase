import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { Typography } from "@material-tailwind/react";
import { useAuthContext } from "../hooks/useAuthContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact";
import { useLogout } from "../hooks/useLogout";
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

  const LINKS = [
    {
      title: "",
      items: ["", "", ""],
    },
    {
      title: "",
      items: ["", "", ""],
    },
    {
      title: "Services",
      items: ["Patient", "Medical Staff", "Admin"],
    },
    {
      title: "Contact us",
      items: [
        "Medical Center, IIT ROPAR, Punjab - 140001, India",
        "support@care.com,", //Yet to get one better one
        "+91-1881-242124, +91-1881-242279",
        "https://maps.app.goo.gl/dNnoBpedyywiuX4b8",
      ],
    },
  ];
  const currentYear = new Date().getFullYear();

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
              {userRole && (
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
        <footer className="w-full mt-5 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 py-5">
            <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
              <Typography variant="h5" className="mb-6">
                MediEase
              </Typography>
              <div className="grid grid-cols-4 justify-between gap-4">
                {LINKS.map(({ title, items }) => (
                  <ul key={title}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-medium opacity-40"
                    >
                      {title}
                    </Typography>
                    {items.map((link, index) => (
                      <li key={index}>
                        {index === items.length - 1 &&
                        link.startsWith("https://") ? (
                          <Typography
                            as="a"
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="gray"
                            className="py-0.5 font-normal transition-colors hover:text-blue-gray-900"
                          >
                            Location
                          </Typography>
                        ) : (
                          <Typography
                            color="gray"
                            className="py-0.5 font-normal"
                          >
                            {link}
                          </Typography>
                        )}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            <div className="mt-3 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-2 md:flex-row md:justify-between">
              <Typography
                variant="small"
                className="mb-0 text-center font-normal text-blue-gray-900 md:mb-0"
              >
                &copy; {currentYear}{" "}
                <a href="https://material-tailwind.com/">MediEase</a>. All
                Rights Reserved.
              </Typography>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomeLayout;
