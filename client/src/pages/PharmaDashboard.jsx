import React from "react";
import { useState, useEffect } from "react";
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
import Layout from "../layouts/PageLayout";
import { useNavigate } from "react-router-dom";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const PharmaDashboard = () => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  const chartConfigBar = {
    type: "bar",
    height: 300,
    width:
      width < 720
        ? width * (18 / 24)
        : (width >= 720) & (width <= 1150)
        ? width * (19 / 24)
        : width * (13 / 24),
    series: [
      {
        name: "Checkups",
        data: [
          50, 40, 30, 32, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
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
        enabled: true,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "60%",
          borderRadius: 5,
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
            fontWeight: 500,
          },
        },
        categories: [
          "01/03/2024",
          "02/03/2024",
          "03/03/2024",
          "04/03/2024",
          "05/03/2024",
          "06/03/2024",
          "07/03/2024",
          "08/03/2024",
          "09/03/2024",
          "10/03/2024",
          "11/03/2024",
          "12/03/2024",
          "13/03/2024",
          "14/03/2024",
          "15/03/2024",
          "16/03/2024",
          "17/03/2024",
          "18/03/2024",
          "19/03/2024",
          "20/03/2024",
          "21/03/2024",
          "22/03/2024",
          "23/03/2024",
          "24/03/2024",
          "25/03/2024",
          "26/03/2024",
          "27/03/2024",
          "28/03/2024",
          "29/03/2024",
          "30/03/2024",
          "31/03/2024",
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
    width:
      width < 720
        ? width * (1 / 2)
        : (width >= 720) & (width <= 1150)
        ? width * (1 / 3)
        : width * (1 / 5),
    height:
      width < 720
        ? width * (1 / 2)
        : (width >= 720) & (width <= 1150)
        ? width * (1 / 3)
        : width * (1 / 5),
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
      labels: ["Dolo", "Crocin", "Combiflam", "Ibuprofen", "Omeprazole"],
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: true,
      },
    },
  };

  return (
    <>
      <Layout>
        <div>
          <div className="md:grid md:grid-cols-4">
            <div
              className={`mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl col-span-${
                width > 1150 ? "1" : "2"
              }`}
            >
              <div className="p-6">
                <h5 className="flex items-center mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  <GiMedicines
                    className="h-8 w-8 mr-2"
                    style={{ color: "black" }}
                  />
                  Total Medicines
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  350
                </p>
              </div>
              <div className="p-6 pt-0">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                  onClick={() => navigate("/medicine")}
                >
                  See Medicine List
                </button>
              </div>
            </div>
            <div
              className={`mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl col-span-${
                width > 1150 ? "1" : "2"
              }`}
            >
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
                  type="button"
                  onClick={() => navigate("/stock")}
                >
                  See Stock
                </button>
              </div>
            </div>
            <div
              className={`mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl col-span-${
                width > 1150 ? "1" : "2"
              }`}
            >
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
                  type="button"
                  onClick={() => navigate("/purchase")}
                >
                  See Purchase List
                </button>
              </div>
            </div>
            <div
              className={`mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl col-span-${
                width > 1150 ? "1" : "2"
              }`}
            >
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
                  type="button"
                  onClick={() => navigate("/supplier")}
                >
                  See Supplier List
                </button>
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-3">
            <Card className={`mt-6 ml-4 col-span-${width > 1150 ? "2" : "3"}`}>
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
                    Number of Checkups this month
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="max-w-sm font-normal"
                  >
                    Graphed data for the month's checkups.
                  </Typography>
                </div>
              </CardHeader>
              <hr className="mt-4" />
              <CardBody className="-mt-3 grid place-items-center px-2">
                <Chart {...chartConfigBar} />
              </CardBody>
            </Card>
            <Card className={`mt-6 ml-4 col-span-${width > 1150 ? "1" : "3"}`}>
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
              <CardBody className="mt-2 grid place-items-center px-2">
                <Chart {...chartConfigPie} />
              </CardBody>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PharmaDashboard;
