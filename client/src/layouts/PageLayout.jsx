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
import {
  FaUserCog,
  FaExclamation,
  FaUserEdit,
  FaNotesMedical,
} from "react-icons/fa";
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
import Footer from "../components/Footer.jsx";
import roleMap from "../utils/rolesMap.js";
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

  const handleLogout = async () => {
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
  };

  return (
    <div className="h-screen flex">
      {roleArr.length !== 0 && (
        <div className="fixed h-screen z-10 top-0 left-0">
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
                      <MenuHandler {...triggers}>
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
                      <MenuList {...triggers}>
                        <MenuItem
                          onClick={() => navigate("/profile")}
                          className="flex gap-2"
                        >
                          <UserCircleIcon className="w-4 h-4" />
                          My Profile
                        </MenuItem>
                        <MenuItem
                          onClick={() => navigate("/profile")}
                          className="flex gap-2"
                        >
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
                {roleArr.includes("PHARMA_DASHBOARD") && (
                  <a href="/pharmadashboard">
                    <li
                      className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                    >
                      <MdSpaceDashboard className="h-5 w-5 mr-4" />
                      {!(isCollapsed & !isHovered) && (
                        <Typography className="font-normal">
                          Dashboard
                        </Typography>
                      )}
                    </li>
                  </a>
                )}
                {roleArr.includes("DOCTOR_DASHBOARD") && (
                  <a href="/doctordashboard">
                    <li
                      className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                    >
                      <MdSpaceDashboard className="h-5 w-5 mr-4" />
                      {!(isCollapsed & !isHovered) && (
                        <Typography className="font-normal">
                          Dashboard
                        </Typography>
                      )}
                    </li>
                  </a>
                )}
                {roleArr.includes("ADMIN_DASHBOARD") && (
                  <a href="/admindashboard">
                    <li
                      className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                    >
                      <MdSpaceDashboard className="h-5 w-5 mr-4" />
                      {!(isCollapsed & !isHovered) && (
                        <Typography className="font-normal">
                          Dashboard
                        </Typography>
                      )}
                    </li>
                  </a>
                )}
                {roleArr.includes("ADMIN") && (
                  <a href="/requests">
                    <li
                      className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                    >
                      <FaExclamation className="h-5 w-5 mr-4" />
                      {!(isCollapsed & !isHovered) && (
                        <Typography className="font-normal">
                          Requests
                        </Typography>
                      )}
                    </li>
                  </a>
                )}

                {roleArr.includes("MEDICAL_HISTORY") && (
                  <a href="/prescription/patient">
                    <li
                      className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                    >
                      <FaNotesMedical className="h-5 w-5 mr-4" />
                      {!(isCollapsed & !isHovered) && (
                        <Typography className="font-normal">
                          Med History
                        </Typography>
                      )}
                    </li>
                  </a>
                )}

                {/* doctor schedule only for patient */}
                {roleArr.includes("DOCTOR_SCHEDULE") && (
                  <a href="/schedule/doctor">
                    <li
                      className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80 cursor-pointer h-full"
                    >
                      <DocumentTextIcon className="h-5 w-5 mr-4" />
                      {!(isCollapsed & !isHovered) && (
                        <Typography className="font-normal">
                          Doctor Schedule
                        </Typography>
                      )}
                    </li>
                  </a>
                )}

                {roleArr.includes("STOCK") && (
                  <Accordion
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
                            onClick={() => navigate("/stock/out")}
                          >
                            Out of Stock
                          </ListItem>
                        </List>
                      </AccordionBody>
                    )}
                  </Accordion>
                )}
                {roleArr.includes("MEDICINE") && (
                  <Accordion
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
                  </Accordion>
                )}

                {roleArr.includes("PURCHASE") && (
                  <Accordion
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
                  </Accordion>
                )}
                {roleArr.includes("SUPPLIER") && (
                  <Accordion
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
                  </Accordion>
                )}
                {roleArr.includes("PATIENT") && (
                  <Accordion
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
                  </Accordion>
                )}
                {roleArr.includes("PRESCRIPTION") && (
                  <Accordion
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
                  </Accordion>
                )}
                {roleArr.includes("STAFF") && (
                  <Accordion
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
                  </Accordion>
                )}
                {roleArr.includes("SCHEDULE") && (
                  <Accordion
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
                  </Accordion>
                )}
                {roleArr.includes("ADMIN") && (
                  <Accordion
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
                  </Accordion>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

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
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
