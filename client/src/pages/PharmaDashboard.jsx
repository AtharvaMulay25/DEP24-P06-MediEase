import React, { useState, useEffect } from "react";
import "../index.css";
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
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import { GiMedicines } from "react-icons/gi";
import Layout from "../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import {
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";

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
  const [loading, setLoading] = useState();

  const [checkupStat, setCheckupStat] = useState([]);
  const [topMedicineStat, setTopMedicineStat] = useState([]);
  const [totalMedicines, setTotalMedicine] = useState(0);
  const [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    setLoading(true);

    const fetchCheckupData = async () => {
      try {
        const res = await axios.get(`${apiRoutes.dashboard}/checkup`, {
          withCredentials: true
        });
        const { data } = res;
        if (data.ok) {
          // console.log(data.data.message);
          // console.log("dashboard-checkup-stats: ", data.data.checkup)
          setCheckupStat(data.data.checkup);
        } else {
          console.log("dashboard stats checkup fetch failed, Error: ", data.error);
        }
      } catch (err) {
        console.log("dashboard stats checkup fetch failed, Error: " + err.message);
      }
    };

    const fetchMedicineData = async () => {
      try {
        const res = await axios.get(`${apiRoutes.dashboard}/medicine`, {
          withCredentials: true
        });
        const { data } = res;
        if (data.ok) {
          // console.log(data.data.message);
          // console.log("dashboard-medicine-stats: ", data.data.medicine);
          setTopMedicineStat(data.data.medicine);
          setTotalMedicine(data.data.totalM);
          setTotalStock(data.data.totalS);
        } else {
          console.log("dashboard top medicine stats fetch failed");
        }
      } catch (err) {
        console.log("dashboard top medicine stats fetch failed, Error: " + err.message);
      }
    };


    fetchCheckupData();
    fetchMedicineData();
    setLoading(false);
  }, []);

  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  const chartConfigBar = {
    type: "bar",
    height: 300,
    width:
      width < 720
        ? width * (18 / 24)
        : (width >= 720) & (width <= 1200)
          ? width * (16 / 24)
          : width * (10 / 24),
    series: [
      {
        name: "Checkups",
        data: checkupStat.map(it => it.total),
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
        categories: checkupStat.map(it => it.date),
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
    width: width < 720 ? 330 : (width >= 720) & (width <= 1200) ? 400 : 340,
    height: width < 720 ? 330 : (width >= 720) & (width <= 1200) ? 400 : 340,
    series: topMedicineStat.map(it => it.qty),
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
      labels: topMedicineStat.map(it => it.saltName),
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"].slice(0, topMedicineStat.length),
      legend: {
        show: true,
      },
    },
  };

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && <Layout>
        <div>
          <div className="grid-container -mt-7">
            <div className="mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl grid-item">
              <div className="p-6">
                <h5 className="flex items-center mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  <GiMedicines
                    className="h-8 w-8 mr-2"
                    style={{ color: "black" }}
                  />
                  Total Medicines
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {totalMedicines}
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
            <div className="mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl grid-item">
              <div className="p-6">
                <h5 className="flex items-center mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  <ChartBarIcon className="h-7 w-7 mr-2" />
                  Current Stock
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {totalStock}
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
            <div className="mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl grid-item">
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
            <div className="mt-6 ml-4 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl grid-item">
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
          <div className="grid-container2">
            <Card className="mt-4 ml-4 grid-item21">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex gap-4 rounded-none md:items-center"
              >
                <div className="w-max rounded-lg bg-gray-900 p-3 text-white">
                  <ClipboardDocumentCheckIcon className="h-6 w-6" />
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
            <Card className="mt-4 ml-4 grid-item22">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex gap-4 rounded-none md:items-center"
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
      </Layout>}
    </>
  );
};

export default PharmaDashboard;
