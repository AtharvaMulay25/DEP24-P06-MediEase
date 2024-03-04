import React from "react";
import Chart from "react-apexcharts";
import { 
    Card, 
    CardHeader, 
    CardBody, 
    Typography,
} from "@material-tailwind/react";
import {
    UserGroupIcon,
    ShoppingCartIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";
import { GiMedicines } from "react-icons/gi";
import { SideTopBar } from "../components/SideTopBar";
import { useNavigate } from "react-router-dom"; 

const PharmaDashboard = () => {
    const navigate = useNavigate();
    
    const chartConfigBar = {
        type: "bar",
        height: 240,
        series: [
          {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          title: {
            show: "",
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#020617"],
          plotOptions: {
            bar: {
              columnWidth: "40%",
              borderRadius: 2,
            },
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
            categories: [
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          yaxis: {
            labels: {
              style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
          },
          grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          fill: {
            opacity: 0.8,
          },
          tooltip: {
            theme: "dark",
          },
        },
    };

    const chartConfigPie = {
        type: "pie",
        width: 280,
        height: 280,
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
            toolbar: {
                show: false,
            },
            },
            title: {
            show: "",
            },
            dataLabels: {
            enabled: false,
            },
            colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
            legend: {
            show: false,
            },
        },
    };

  return (
    <>
      <div className="h-screen z-0 flex bg-gray-50">
        <div>
        <SideTopBar />
        </div>
        <div>
            <div className="relative flex flex-col mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                <div className="p-6">
                    <h5 className="flex items-center mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    <GiMedicines className="h-8 w-8 mr-2" style = {{ color: 'black' }}/>
                    Total Medicines Registered 
                    </h5>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    350
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button" onClick = { () => navigate('/medicine/list') }>
                    See Medicine List
                    </button>
                </div>
            </div>
            <div className="relative flex flex-col mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                <div className="p-6">
                    <h5 className="flex items-center mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    <ChartBarIcon className="h-7 w-7 mr-2" />
                    Current Stock
                    </h5>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    350
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button" onClick = { () => navigate('/stock') }>
                    See Stock
                    </button>
                </div>
            </div>
            <div className="relative flex flex-col mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                <div className="p-6">
                    <h5 className="flex items-center mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    <ShoppingCartIcon className="h-7 w-7 mr-2" />
                    Purchase Details
                    </h5>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        All the purchases done.
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button" onClick = { () => navigate('/stock') }>
                    See Purchase List
                    </button>
                </div>
            </div>
            <div className="relative flex flex-col mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                <div className="p-6">
                    <h5 className="flex items-center mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    <UserGroupIcon className="h-7 w-7 mr-2" />
                    Supplier Details
                    </h5>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        All the faithful suppliers.
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button" onClick = { () => navigate('/supplier/list') }>
                    See Supplier List
                    </button>
                </div>
            </div>
        </div>
        <div>
            <Card className="mt-6 ml-4">
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                    <div className="w-max rounded-lg bg-gray-900 p-3 text-white">
                    <ShoppingCartIcon className="h-6 w-6" />
                    </div>
                    <div>
                    <Typography variant="h6" color="blue-gray">
                        Monthly Purchase
                    </Typography>
                    <Typography
                        variant="small"
                        color="gray"
                        className="max-w-sm font-normal"
                    >
                        Graphed data for the monthly medicine purchase.
                    </Typography>
                    </div>
                </CardHeader>
                <hr className="mt-4" />
                <CardBody className="-mt-3 grid place-items-center px-2">
                    <Chart {...chartConfigBar} />
                </CardBody>
            </Card>
            <Card className="mt-6 ml-4">
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                    <div className="w-max rounded-lg bg-gray-900 p-3 text-white">
                    <GiMedicines className="h-7 w-7" />
                    </div>
                    <div>
                    <Typography variant="h6" color="blue-gray">
                        Medicines
                    </Typography>
                    <Typography
                        variant="small"
                        color="gray"
                        className="max-w-sm font-normal"
                    >
                        Top medicines currently present in our stock.
                    </Typography>
                    </div>
                </CardHeader>
                <hr className="mt-4" />
                <CardBody className="-mt-3 grid place-items-center px-2">
                    <Chart {...chartConfigPie} />
                </CardBody>
            </Card>
        </div>
        
      </div>
    </>
  );
};

export default PharmaDashboard;
