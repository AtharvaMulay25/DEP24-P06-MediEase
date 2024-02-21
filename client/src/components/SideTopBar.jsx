import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { GiMedicines } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";

import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  ShoppingCartIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
 
export function SideTopBar()  {
  const [open, setOpen] = React.useState(0); 
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const toggleCollapse = () => {
    setIsCollapsed(prevState => !prevState);
  };

  return (
    <>
        <div className="flex h-screen overflow-hidden">
            <div className="transition-width duration-300" style={{ width: (isCollapsed & !isHovered) ? '55px' : '250px', backgroundColor: '#0a141f' }}
                        onMouseEnter={() => setIsHovered(true)}     onMouseLeave={() => {setIsHovered(false); setOpen(0);}}
            >
                <div className="flex p-4" style={{ backgroundColor: '#0a141f' }}>
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
                <Bars3Icon className="h-8 w-8 stroke-2 m-3 mt-6  hover:bg-blue-gray-50 hover:bg-opacity-80 rounded" 
                    onClick={toggleCollapse} style = {{ color: '#f1ffea' }} />
			
                <ul className="list-none flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal h-full" style = {{ color: '#f1ffea' }}>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                        hover:bg-blue-gray-50 hover:bg-opacity-80"> 
                        <MdSpaceDashboard className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Dashboard
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <>
                    {/* <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li>
                    <li className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all
                         hover:bg-blue-gray-50 hover:bg-opacity-80">
                        <ChartBarIcon className="h-5 w-5 mr-4" />
                        {!(isCollapsed & !isHovered) && (<Typography className="font-normal">
                        Stock
                        </Typography>)}
                    </li> */}
                    </>
                    <Accordion 
                        open={open === 1}
                        icon={
                            !(isCollapsed & !isHovered) && (<ChevronDownIcon
                            style = {{ color: '#f1ffea' }}
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                            open === 1 ? "rotate-180" : ""
                            }`}
                        />)
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
                            {!(isCollapsed & !isHovered) && (<Typography style = {{ color: '#f1ffea' }} className="mr-auto font-normal">
                                Medicine
                                </Typography>)}
                        </AccordionHeader>
                        </ListItem>
                        {!(isCollapsed & !isHovered) && (
                            <AccordionBody className="py-1">
                                <List className="p-0" style = {{ color: '#f1ffea' }}>
                                    <ListItem className="ml-9" onClick = { () => navigate('/medicine/add_medicine') }>
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
                        !(isCollapsed & !isHovered) && (<ChevronDownIcon
                        style = {{ color: '#f1ffea' }}
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${
                        open === 2 ? "rotate-180" : ""
                        }`}
                    />)
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
                        {!(isCollapsed & !isHovered) && (<Typography style = {{ color: '#f1ffea' }} className="mr-auto font-normal">
                        Purchase
                        </Typography>)}
                    </AccordionHeader>
                    </ListItem>
                    {!(isCollapsed & !isHovered) && (
                        <AccordionBody className="py-1">
                            <List className="p-0" style = {{ color: '#f1ffea' }}>
                                <ListItem className="ml-9" onClick = { () => navigate('/purchase/add_purchase') }>
                                    Add Purchase
                                </ListItem>
                                <ListItem className="ml-9" onClick = { () => navigate('/purchase/list') }>
                                    Purchase List
                                </ListItem>
                            </List>
                        </AccordionBody>
                    )}
                </Accordion>
                <Accordion
                    open={open === 3}
                    icon={
                        !(isCollapsed & !isHovered) && (<ChevronDownIcon
                        style = {{ color: '#f1ffea' }}
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${
                        open === 3 ? "rotate-180" : ""
                        }`}
                    />)
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
                        {!(isCollapsed & !isHovered) && (<Typography style = {{ color: '#f1ffea' }} className="mr-auto font-normal">
                        Supplier
                        </Typography>)}
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
                </ul>
            </div>
        </div>
    </>
  );
}

// export default SideTopBar;