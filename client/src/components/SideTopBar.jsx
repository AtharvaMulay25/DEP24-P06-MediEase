import React, { useState } from "react";
import { DrawerStylesType, DrawerProps } from "@material-tailwind/react";
import { GiMedicines } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";

import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  InboxIcon,
  PowerIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
 
export function SideTopBar() {
  const [open, setOpen] = React.useState(0);
//   const [openAlert, setOpenAlert] = React.useState(true);
//   const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const toggleCollapse = () => {
    setIsCollapsed(prevState => !prevState);
  };


//   const openDrawer = () => setIsDrawerOpen(true);
//   const closeDrawer = () => setIsDrawerOpen(false);
  
  return (
    <>
        <div class="relative flex h-screen">
            <div className="transition-width duration-300" style={{ width: (isCollapsed & !isHovered) ? '55px' : '240px', backgroundColor: '#0a141f' }}
                        onMouseEnter={() => setIsHovered(true)}     onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex m-4 mt-5">
                    <div className="h-12 w-12 flex-shrink-0">
                        <img
                            src="https://takemedisease.files.wordpress.com/2023/04/image_editor_output_image1422845081-1680597484411.png"
                            alt="brand"
                            className="-ml-3 -mr-2"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className="flex-shrink-0">
                        <Typography variant="h4" className="mt-1">
                            <span style = {{ color: "#0eb8fc" }}>Medi</span>
                            <span style = {{ color: "#fe055c" }}>Ease</span>
                        </Typography>
                    </div>
                </div>
                {/* <div className="p-2">
                <Input
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    label="Search"
                />
                </div> */}
                <List style = {{ color: '#f1ffea' }}>
                <ListItem>
                    <ListItemPrefix>
                    <MdSpaceDashboard className="h-5 w-5" />
                    {/* <UserCircleIcon className="h-5 w-5" /> */}
                    </ListItemPrefix>
                    Dashboard
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                    <ChartBarIcon className="h-5 w-5" />
                    {/* <UserCircleIcon className="h-5 w-5" /> */}
                    </ListItemPrefix>
                    Stock
                </ListItem>

                <Accordion 
                    open={open === 1}
                    icon={
                    <ChevronDownIcon
                        style = {{ color: '#f1ffea' }}
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${
                        open === 1 ? "rotate-180" : ""
                        }`}
                    />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                    <AccordionHeader
                        onClick={() => handleOpen(1)}
                        className="border-b-0 p-3"
                    >
                        <ListItemPrefix>
                        <GiMedicines className="h-5 w-5" style = {{ color: '#f1ffea' }}/>
                        </ListItemPrefix>
                            <Typography style = {{ color: '#f1ffea' }} className="mr-auto font-normal">
                            Medicine
                            </Typography>
                    </AccordionHeader>
                    </ListItem>
                    {!(isCollapsed & !isHovered) && (
                        <AccordionBody className="py-1">
                            <List className="p-0" style = {{ color: '#f1ffea' }}>
                                <ListItem className="ml-9">
                                    Add Medicine
                                </ListItem>
                                <ListItem className="ml-9">
                                    Medicine List
                                </ListItem>
                            </List>
                        </AccordionBody>
                    )}
                </Accordion>

                <Accordion
                    open={open === 2}
                    icon={
                    <ChevronDownIcon
                        style = {{ color: '#f1ffea' }}
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${
                        open === 2 ? "rotate-180" : ""
                        }`}
                    />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                    <AccordionHeader
                        onClick={() => handleOpen(2)}
                        className="border-b-0 p-3"
                    >
                        <ListItemPrefix>
                        <ShoppingCartIcon className="h-5 w-5" style = {{ color: '#f1ffea' }}/>
                        </ListItemPrefix>
                        <Typography style = {{ color: '#f1ffea' }} className="mr-auto font-normal">
                        Purchase
                        </Typography>
                    </AccordionHeader>
                    </ListItem>
                    {!(isCollapsed & !isHovered) && (
                        <AccordionBody className="py-1">
                            <List className="p-0" style = {{ color: '#f1ffea' }}>
                                <ListItem className="ml-9">
                                    Add Purchase
                                </ListItem>
                                <ListItem className="ml-9">
                                    Purchase List
                                </ListItem>
                            </List>
                        </AccordionBody>
                    )}
                </Accordion>
                <Accordion
                    open={open === 3}
                    icon={
                    <ChevronDownIcon
                        style = {{ color: '#f1ffea' }}
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${
                        open === 3 ? "rotate-180" : ""
                        }`}
                    />
                    }
                >
                    <ListItem className="p-0" selected={open === 3}>
                    <AccordionHeader
                        onClick={() => handleOpen(3)}
                        className="border-b-0 p-3"
                    >
                        <ListItemPrefix>
                        <UserGroupIcon className="h-5 w-5" style = {{ color: '#f1ffea' }}/>
                        </ListItemPrefix>
                        <Typography style = {{ color: '#f1ffea' }} className="mr-auto font-normal">
                        Supplier
                        </Typography>
                    </AccordionHeader>
                    </ListItem>
                    {!(isCollapsed & !isHovered) && (
                        <AccordionBody className="py-1">
                            <List className="p-0" style = {{ color: '#f1ffea' }}>
                                <ListItem className="ml-9">
                                    Add Supplier
                                </ListItem>
                                <ListItem className="ml-9">
                                    Supplier List
                                </ListItem>
                            </List>
                        </AccordionBody>
                    )}
                </Accordion>
                {/* <hr className="my-2 border-blue-gray-50" /> */}
                {/* <ListItem>
                    <ListItemPrefix>
                    <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Inbox
                    <ListItemSuffix>
                    <Chip
                        value="14"
                        size="sm"
                        variant="ghost"
                        color="blue-gray"
                        className="rounded-full"
                    />
                    </ListItemSuffix>
                </ListItem> */}
                </List>
            </div>
            <div class="flex flex-col w-full z-10">
                <div class="bg-blue-500" style={{ height: '80px' }}>
                    <Bars3Icon className="h-8 w-8 stroke-2 m-3 mt-6" onClick={toggleCollapse}/>
                </div>
                {/* <div class="flex-grow"> */}
                    {/* Right Bottom */}
                {/* </div> */}
            </div>
        </div>
    </>
  );
}

// export default SideTopBar;