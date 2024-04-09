import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { GiMedicines } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { FaUserCog, FaExclamation, FaUserEdit } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ShoppingCartIcon,
  UserGroupIcon,
  ChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { toast } from "sonner";
import roleMap from "../utils/rolesMap.js";
import Toaster from "../components/UI/Toaster";
const Layout = ({ children }) => {
  const { userRole, userName } = useAuthContext();
  const { logout } = useLogout();
  const [roleArr, setRoleArr] = useState([]);

  useEffect(() => {
    setRoleArr(roleMap(userRole));  
  }, [userRole]);

  const [open, setOpen] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const handleLogout = async() => {
    await logout();
    toast.success("Logged Out Successfully");
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  const LINKS = [
    {
      title: "About Us",
      items: ["Overview", "Servies", "Staff"],
    },
    {
      title: "Services",
      items: ["Lab Test", "Health Check", "Heart Check"],
    },
    {
      title: "Contact us",
      items: [
        "Medical Center, IIT ROPAR, Punjab - 140001, India",
        "support@care.com,",
        "+91 1234567890",
      ],
    },
  ];
  const currentYear = new Date().getFullYear();

  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 890px)").matches
  );

  useEffect(() => {
    setRoleArr(roleMap(userRole)); 
  }, [userRole]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 890px)");
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const triggers = {
    onMouseEnter: () => setOpenMenu(true),
    onMouseLeave: () => setOpenMenu(false),
  }

  return (
    <div className="h-screen flex">
      {roleArr.length !== 0 && <div className="fixed h-screen z-10 top-0 left-0">
        <div className="flex">
          <div
            className={`transition-width duration-300 h-screen overflow-x-hidden`}
            style={{
              width: isCollapsed && !isHovered ? "60px" : "250px",
              scrollbarWidth: "thin",
              backgroundColor: "#0a141f",
              overflowY: isCollapsed && !isHovered ? "hidden" : "auto",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setOpen(0);
            }}
          >
            <div className="flex p-4" style={{ backgroundColor: "#0a141f" }}>
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
              <div className="flex-shrink-0">
                <a href="/">
                  <Typography variant="h4" className="mt-1 cursor-pointer">
                    <span style={{ color: "#0eb8fc" }}>Medi</span>
                    <span style={{ color: "#fe055c" }}>Ease</span>
                  </Typography>
                </a>
              </div>
            </div>
            <ul
              className="list-none flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal"
              style={{ color: "#f1ffea" }}
            >
              <a>
                <li className="flex items-center w-full p-1 rounded-lg text-start leading-tight transition-all cursor-pointer">
                  <Menu
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                    open={openMenu}
                    handler={setOpenMenu}
                  >
                    <MenuHandler { ... triggers }>
                      <div className="flex w-full">
                        <UserCircleIcon className="h-8 w-8 mr-4" />
                        <div>
                          {!(isCollapsed & !isHovered) && (
                            <Typography className="font-semibold text-lg">
                              {userName || ""}
                            </Typography>
                          )}
                          {!(isCollapsed & !isHovered) && (
                            <Typography className="font-normal text-xs">
                              {userRole || ""}
                            </Typography>
                          )}
                        </div>
                      </div>
                    </MenuHandler>
                    <MenuList { ... triggers }>
                      <MenuItem onClick={() => navigate("/profile")} className="flex gap-2">
                        <UserCircleIcon className="w-4 h-4" />
                        My Profile
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/profile")} className="flex gap-2">
                        <FaUserEdit className="w-4 h-4" />
                        Edit Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout} className="flex gap-2">
                        <LuLogOut className="h-4 w-4" /> Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </li>
              </a>
            </ul>
            {isCollapsed ? (
              <Bars3Icon
                className="h-8 w-8 stroke-2 m-3 mt-6  hover:bg-blue-gray-50 hover:bg-opacity-80 rounded cursor-pointer"
                onClick={toggleCollapse}
                style={{ color: "#f1ffea" }}
              />
            ) : (
              <XMarkIcon
                className="h-8 w-8 stroke-2 m-3 mt-6  hover:bg-blue-gray-50 hover:bg-opacity-80 rounded cursor-pointer"
                onClick={toggleCollapse}
                style={{ color: "#f1ffea" }}
              />
            )}

            <ul
              className="list-none flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal overflow-y-auto"
              style={{ color: "#f1ffea" }}
            >
              {roleArr.includes("PHARMA_DASHBOARD") && <a href="/pharmadashboard">
                <li
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                >
                  <MdSpaceDashboard className="h-5 w-5 mr-4" />
                  {!(isCollapsed & !isHovered) && (
                    <Typography className="font-normal">Dashboard</Typography>
                  )}
                </li>
              </a>}
              {roleArr.includes("DOCTOR_DASHBOARD") && <a href="/doctordashboard">
                <li
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                >
                  <MdSpaceDashboard className="h-5 w-5 mr-4" />
                  {!(isCollapsed & !isHovered) && (
                    <Typography className="font-normal">Dashboard</Typography>
                  )}
                </li>
              </a>}
              {roleArr.includes("ADMIN_DASHBOARD") && <a href="/admindashboard">
                <li
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                >
                  <MdSpaceDashboard className="h-5 w-5 mr-4" />
                  {!(isCollapsed & !isHovered) && (
                    <Typography className="font-normal">Dashboard</Typography>
                  )}
                </li>
              </a>}
              {roleArr.includes("ADMIN") && <a href="/requests">
                <li
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                >
                  <FaExclamation className="h-5 w-5 mr-4" />
                  {!(isCollapsed & !isHovered) && (
                    <Typography className="font-normal">Requests</Typography>
                  )}
                </li>
              </a>}

              {/* doctor schedule only for patient */}
              {roleArr.includes("DOCTOR_SCHEDULE") && <a href="/schedule/doctor">
                <li
                  className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                >
                  <DocumentTextIcon className="h-5 w-5 mr-4" />
                  {!(isCollapsed & !isHovered) && (
                    <Typography className="font-normal">Doctor Schedule</Typography>
                  )}
                </li>
              </a>}
              {roleArr.includes("STOCK") && <Accordion
                open={open === 9}
                icon={
                  !(isCollapsed & !isHovered) && (
                    <ChevronDownIcon
                      style={{ color: "#f1ffea" }}
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 9 ? "rotate-180" : ""
                      }`}
                    />
                  )
                }
              >
                <ListItem className="p-0" selected={open === 9}>
                  <AccordionHeader
                    onClick={() => handleOpen(9)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <ChartBarIcon
                        className="h-5 w-5"
                        style={{ color: "#f1ffea" }}
                      />
                    </ListItemPrefix>
                    {!(isCollapsed & !isHovered) && (
                      <Typography
                        style={{ color: "#f1ffea" }}
                        className="mr-auto font-normal"
                      >
                        Stock
                      </Typography>
                    )}
                  </AccordionHeader>
                </ListItem>
                {!(isCollapsed & !isHovered) && (
                  <AccordionBody className="py-1">
                    <List className="p-0" style={{ color: "#f1ffea" }}>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/stock")}
                      >
                        Stock List
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/stock/outofstock")}
                      >
                        Out of Stock
                      </ListItem>
                    </List>
                  </AccordionBody>
                )}
              </Accordion>}
              {roleArr.includes("MEDICINE") && <Accordion
                open={open === 1}
                icon={
                  !(isCollapsed & !isHovered) && (
                    <ChevronDownIcon
                      style={{ color: "#f1ffea" }}
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 1 ? "rotate-180" : ""
                      }`}
                    />
                  )
                }
              >
                <ListItem className="p-0" selected={open === 1}>
                  <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <GiMedicines
                        className="h-5 w-5"
                        style={{ color: "#f1ffea" }}
                      />
                    </ListItemPrefix>
                    {!(isCollapsed & !isHovered) && (
                      <Typography
                        style={{ color: "#f1ffea" }}
                        className="mr-auto font-normal"
                      >
                        Medicine
                      </Typography>
                    )}
                  </AccordionHeader>
                </ListItem>
                {!(isCollapsed & !isHovered) && (
                  <AccordionBody className="py-1">
                    <List className="p-0" style={{ color: "#f1ffea" }}>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/medicine/category/add")}
                      >
                        Add Category
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/medicine/category")}
                      >
                        Category List
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/medicine/add")}
                      >
                        Add Medicine
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/medicine")}
                      >
                        Medicine List
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/medicine/expired")}
                      >
                        Expired Medicines
                      </ListItem>
                    </List>
                  </AccordionBody>
                )}
              </Accordion>}

              {roleArr.includes("PURCHASE") && <Accordion
                open={open === 2}
                icon={
                  !(isCollapsed & !isHovered) && (
                    <ChevronDownIcon
                      style={{ color: "#f1ffea" }}
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 2 ? "rotate-180" : ""
                      }`}
                    />
                  )
                }
              >
                <ListItem className="p-0" selected={open === 2}>
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <ShoppingCartIcon
                        className="h-5 w-5"
                        style={{ color: "#f1ffea" }}
                      />
                    </ListItemPrefix>
                    {!(isCollapsed & !isHovered) && (
                      <Typography
                        style={{ color: "#f1ffea" }}
                        className="mr-auto font-normal"
                      >
                        Purchase
                      </Typography>
                    )}
                  </AccordionHeader>
                </ListItem>
                {!(isCollapsed & !isHovered) && (
                  <AccordionBody className="py-1">
                    <List className="p-0" style={{ color: "#f1ffea" }}>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/purchase/add")}
                      >
                        Add Purchase
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/purchase")}
                      >
                        Purchase List
                      </ListItem>
                    </List>
                  </AccordionBody>
                )}
              </Accordion>}
              {roleArr.includes("SUPPLIER") && <Accordion
                open={open === 3}
                icon={
                  !(isCollapsed & !isHovered) && (
                    <ChevronDownIcon
                      style={{ color: "#f1ffea" }}
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 3 ? "rotate-180" : ""
                      }`}
                    />
                  )
                }
              >
                <ListItem className="p-0" selected={open === 3}>
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <UserGroupIcon
                        className="h-5 w-5"
                        style={{ color: "#f1ffea" }}
                      />
                    </ListItemPrefix>
                    {!(isCollapsed & !isHovered) && (
                      <Typography
                        style={{ color: "#f1ffea" }}
                        className="mr-auto font-normal"
                      >
                        Supplier
                      </Typography>
                    )}
                  </AccordionHeader>
                </ListItem>
                {!(isCollapsed & !isHovered) && (
                  <AccordionBody className="py-1">
                    <List className="p-0" style={{ color: "#f1ffea" }}>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/supplier/add")}
                      >
                        Add Supplier
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/supplier")}
                      >
                        Supplier List
                      </ListItem>
                    </List>
                  </AccordionBody>
                )}
              </Accordion>}
              {roleArr.includes("PATIENT") && <Accordion
                open={open === 4}
                icon={
                  !(isCollapsed & !isHovered) && (
                    <ChevronDownIcon
                      style={{ color: "#f1ffea" }}
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 4 ? "rotate-180" : ""
                      }`}
                    />
                  )
                }
              >
                <ListItem className="p-0" selected={open === 4}>
                  <AccordionHeader
                    onClick={() => handleOpen(4)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <UserIcon
                        className="h-5 w-5"
                        style={{ color: "#f1ffea" }}
                      />
                    </ListItemPrefix>
                    {!(isCollapsed & !isHovered) && (
                      <Typography
                        style={{ color: "#f1ffea" }}
                        className="mr-auto font-normal"
                      >
                        Patient
                      </Typography>
                    )}
                  </AccordionHeader>
                </ListItem>
                {!(isCollapsed & !isHovered) && (
                  <AccordionBody className="py-1">
                    <List className="p-0" style={{ color: "#f1ffea" }}>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/patient/add")}
                      >
                        Add Patient
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/patient")}
                      >
                        Patient List
                      </ListItem>
                    </List>
                  </AccordionBody>
                )}
              </Accordion>}
              {roleArr.includes("PRESCRIPTION") && <Accordion
                open={open === 5}
                icon={
                  !(isCollapsed & !isHovered) && (
                    <ChevronDownIcon
                      style={{ color: "#f1ffea" }}
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 5 ? "rotate-180" : ""
                      }`}
                    />
                  )
                }
              >
                <ListItem className="p-0" selected={open === 5}>
                  <AccordionHeader
                    onClick={() => handleOpen(5)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <ClipboardDocumentListIcon
                        className="h-5 w-5"
                        style={{ color: "#f1ffea" }}
                      />
                    </ListItemPrefix>
                    {!(isCollapsed & !isHovered) && (
                      <Typography
                        style={{ color: "#f1ffea" }}
                        className="mr-auto font-normal"
                      >
                        Prescription
                      </Typography>
                    )}
                  </AccordionHeader>
                </ListItem>
                {!(isCollapsed & !isHovered) && (
                  <AccordionBody className="py-1">
                    <List className="p-0" style={{ color: "#f1ffea" }}>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/prescription/add")}
                      >
                        Add Prescription
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/prescription")}
                      >
                        Prescription List
                      </ListItem>
                    </List>
                  </AccordionBody>
                )}
              </Accordion>}
              {roleArr.includes("STAFF") && <Accordion
                open={open === 6}
                icon={
                  !(isCollapsed & !isHovered) && (
                    <ChevronDownIcon
                      style={{ color: "#f1ffea" }}
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 6 ? "rotate-180" : ""
                      }`}
                    />
                  )
                }
              >
                <ListItem className="p-0" selected={open === 6}>
                  <AccordionHeader
                    onClick={() => handleOpen(6)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <FaUserDoctor
                        className="h-5 w-5"
                        style={{ color: "#f1ffea" }}
                      />
                    </ListItemPrefix>
                    {!(isCollapsed & !isHovered) && (
                      <Typography
                        style={{ color: "#f1ffea" }}
                        className="mr-auto font-normal"
                      >
                        Staff
                      </Typography>
                    )}
                  </AccordionHeader>
                </ListItem>
                {!(isCollapsed & !isHovered) && (
                  <AccordionBody className="py-1">
                    <List className="p-0" style={{ color: "#f1ffea" }}>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/staff/add")}
                      >
                        Add Staff
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/staff")}
                      >
                        Staff List
                      </ListItem>
                    </List>
                  </AccordionBody>
                )}
              </Accordion>}
              {roleArr.includes("SCHEDULE") && <Accordion
                open={open === 7}
                icon={
                  !(isCollapsed & !isHovered) && (
                    <ChevronDownIcon
                      style={{ color: "#f1ffea" }}
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 7 ? "rotate-180" : ""
                      }`}
                    />
                  )
                }
              >
                <ListItem className="p-0" selected={open === 7}>
                  <AccordionHeader
                    onClick={() => handleOpen(7)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <DocumentTextIcon
                        className="h-5 w-5"
                        style={{ color: "#f1ffea" }}
                      />
                    </ListItemPrefix>
                    {!(isCollapsed & !isHovered) && (
                      <Typography
                        style={{ color: "#f1ffea" }}
                        className="mr-auto font-normal"
                      >
                        Schedule
                      </Typography>
                    )}
                  </AccordionHeader>
                </ListItem>
                {!(isCollapsed & !isHovered) && (
                  <AccordionBody className="py-1">
                    <List className="p-0" style={{ color: "#f1ffea" }}>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/schedule/add")}
                      >
                        Add Schedule
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/schedule")}
                      >
                        Schedule List
                      </ListItem>
                    </List>
                  </AccordionBody>
                )}
              </Accordion>}
              {roleArr.includes("ADMIN") && <Accordion
                open={open === 8}
                icon={
                  !(isCollapsed & !isHovered) && (
                    <ChevronDownIcon
                      style={{ color: "#f1ffea" }}
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 8 ? "rotate-180" : ""
                      }`}
                    />
                  )
                }
              >
                <ListItem className="p-0" selected={open === 8}>
                  <AccordionHeader
                    onClick={() => handleOpen(8)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <FaUserCog
                        className="h-5 w-5"
                        style={{ color: "#f1ffea" }}
                      />
                    </ListItemPrefix>
                    {!(isCollapsed & !isHovered) && (
                      <Typography
                        style={{ color: "#f1ffea" }}
                        className="mr-auto font-normal"
                      >
                        Admin
                      </Typography>
                    )}
                  </AccordionHeader>
                </ListItem>
                {!(isCollapsed & !isHovered) && (
                  <AccordionBody className="py-1">
                    <List className="p-0" style={{ color: "#f1ffea" }}>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/admin/add")}
                      >
                        Add Admin
                      </ListItem>
                      <ListItem
                        className="ml-9"
                        onClick={() => navigate("/admin")}
                      >
                        Admin List
                      </ListItem>
                    </List>
                  </AccordionBody>
                )}
              </Accordion>}
            </ul>
          </div>
        </div>
      </div>}

      {/* Content of page */}
      <div
        className="flex-auto flex flex-col justify-between p-4 shadow-lg bg-gray-50 h-screen overflow-y-auto transition-all duration-300 ease-in-out"
        // style={{ marginLeft: isCollapsed && !isHovered ? "60px" : "250px" }}
        style={{
          marginLeft: isLargeScreen
            ? isCollapsed && !isHovered
              ? "60px"
              : "250px"
            : "60px",
        }}
      >
        {children}
        <footer className="w-full mt-5 bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 py-2">
            <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
              <Typography variant="h5" className="mb-6">
                MediEase
              </Typography>
              <div className="grid grid-cols-3 justify-between gap-4">
                {LINKS.map(({ title, items }) => (
                  <ul key={title}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-3 font-medium opacity-40"
                    >
                      {title}
                    </Typography>
                    {items.map((link) => (
                      <li key={link}>
                        <Typography
                          as="a"
                          href="#"
                          color="gray"
                          className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                        >
                          {link}
                        </Typography>
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
              <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
                <Typography
                  as="a"
                  href="#"
                  className="opacity-80 transition-opacity hover:opacity-100"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Typography>
                <Typography
                  as="a"
                  href="#"
                  className="opacity-80 transition-opacity hover:opacity-100"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Typography>
                <Typography
                  as="a"
                  href="#"
                  className="opacity-80 transition-opacity hover:opacity-100"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Typography>
                <Typography
                  as="a"
                  href="#"
                  className="opacity-80 transition-opacity hover:opacity-100"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Typography>
                <Typography
                  as="a"
                  href="#"
                  className="opacity-80 transition-opacity hover:opacity-100"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Typography>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <Toaster richColors position="top-center"/>
    </div>
    
  );
};

export default Layout;
