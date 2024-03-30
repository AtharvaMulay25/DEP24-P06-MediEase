import React, { useState } from "react";
import { Link } from "react-scroll";
import Button from "../layouts/Button";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact";
import { UserButton , SignedIn, SignedOut} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { toast } from "sonner";

const Navbar = () => {
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

  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged Out Successfully");
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  return (
    <div className=" fixed top-0 w-full z-10 text-white">
      <div>
        {/* <div className=" flex flex-row justify-between p-5 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"> */}
        <div className=" flex flex-row justify-between p-5 md:px-32 px-5 text-white font-light bg-gray-800 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className=" flex flex-row items-center cursor-pointer">
            <Link to="home" spy={true} smooth={true} duration={500}>
              <h1 className=" text-2xl font-semibold">MediEase</h1>
            </Link>
          </div>

          <nav className=" hidden lg:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
              onClick={() => navigate("/pharmadashboard")}
            >
              Dashboard
            </Link>
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              About Us
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Services
            </Link>
            <Link
              to="doctors"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Doctors
            </Link>
            <Link
              to="blog"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Blog
            </Link>
          </nav>
          {/* <SignedOut> */}
          {userRole ? <div className=" hidden lg:flex">
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div> : <div className=" hidden lg:flex">
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
              // onClick={openForm}
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
          </div>}
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
          } lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            to="services"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Services
          </Link>
          <Link
            to="doctors"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Doctors
          </Link>
          <Link
            to="blog"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Blog
          </Link>

          <div className=" lg:hidden">
            <button
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out"
              // onClick={openForm}
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;