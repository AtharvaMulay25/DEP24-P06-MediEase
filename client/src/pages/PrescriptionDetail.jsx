import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRoutes } from "../utils/apiRoutes";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { PrinterIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import Layout from "../layouts/PageLayout";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import { toast } from "sonner";
import { setToastTimeout } from "../utils/customTimeout";
const TABLE_HEAD = ["Medicine", "Dosage", "Quantity"];

const PrescriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const params = id.split("^");
  const prescriptionId = params[0];
  const opdId = params[1];
  // console.log(prescriptionId)
  const [loading, setLoading] = useState(true);
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: "-",
    doctorName: "-",
    date: "-",
    temperature: "-",
    bloodPressure: "-",
    spO2: "-",
    pulseRate: "-",
    diagnosis: "-",
    symptoms: "-",
    checkupMedicines: [],
  });
  const handlePrint = () => {
    const element = document.getElementById("prescriptionDetail");
    const pdfName = `Prescription_${prescriptionData.patientName}_${prescriptionData.date}`;
    html2pdf().from(element).set({ filename: pdfName }).save();
  };

  const fetchPrescriptionDetail = async () => {
    try {
      const response = await axios.get(
        apiRoutes.checkup + `/${prescriptionId}`,
        {
          withCredentials: true,
        }
      );
      console.log("response", response.data.data);
      setToastTimeout(
        "success",
        "Prescription Details fetched successfully",
        1000
      );
      return response.data.data;
    } catch (error) {
      console.error(
        `ERROR (get-prescription-detail): ${error?.response?.data?.message}`
      );
      setToastTimeout("error", "Failed to fetch Prescription Details", 1000);
    }
  };

  useEffect(
    () => async () => {
      const data = await fetchPrescriptionDetail();
      console.log("data out", data);

      const data_ = {
        patientName: data.patientName || "-",
        doctorName: data.doctorName || "-",
        date: data.date || "-",
        temperature: data.temperature || "-",
        bloodPressure: data.bloodPressure || "-",
        spO2: data.spO2 || "-",
        pulseRate: data.pulseRate || "-",
        diagnosis: data.diagnosis || "-",
        symptoms: data.symptoms || "-",
        checkupMedicines: data.checkupMedicines,
      }
      setPrescriptionData(data_);
      setLoading(false);
    },
    []
  );
  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <div className="flex flex-col self-center lg:w-2/3 h-max">
            <div className="flex flex-col sm:flex-row justify-between py-2">
              <div>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Prescription Details
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Date: {prescriptionData.date}
                </Typography>
              </div>
              <div className="flex gap-x-2 h-10">
                <Button size="md" ripple={true}>
                  Edit
                </Button>
                <Button
                  size="md"
                  ripple={true}
                  className="flex gap-x-1 px-4"
                  onClick={handlePrint}
                >
                  <PrinterIcon className="h-4" /> Print
                </Button>
                <Button
                  size="md"
                  ripple={true}
                  onClick={() => navigate("/prescription")}
                >
                  Close
                </Button>
              </div>
            </div>
            <Card id="prescriptionDetail" className="w-full h-fit min-h-lvh">
              <CardBody>
                <div className="flex flex-col sm:flex-row border-b border-black p-2 items-center w-full">
                  <img
                    src="\src\assets\img\iitroparlogo0.jpg"
                    alt="logo"
                    className="px-4 w-fit h-24 rounded-none"
                  />
                  <div className="w-full h-full">
                    <Typography  color="blue-gray" className="text-xl md:text-3xl text-center sm:text-start font-semibold font-serif">
                      Indian Institute of Technology Ropar
                    </Typography>
                    <Typography color="blue-gray" className="text-base md:text-xl text-center sm:text-start font-medium">
                      Medical center / Rupnagar - 140001, Punjab, India
                    </Typography>
                    <Typography
                      className="text-end text-sm md:text-base font-semibold"
                    >
                      OPD Slip
                    </Typography>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 pl-10 justify-items-left">
                    <Typography variant="small">OPD Id</Typography>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {opdId}
                    </Typography>
                    <Typography variant="small">Doctor Name</Typography>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {prescriptionData.doctorName}
                    </Typography>
                    <Typography variant="small">Patient Name</Typography>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {prescriptionData.patientName}
                    </Typography>
                    <Typography variant="small">Date</Typography>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {prescriptionData.date}
                    </Typography>
                    <Typography variant="small">Temperature</Typography>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {prescriptionData.temperature}
                    </Typography>
                    <Typography variant="small">Blood Pressure</Typography>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {prescriptionData.bloodPressure}
                    </Typography>
                    <Typography variant="small">SpO2</Typography>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {prescriptionData.spO2}
                    </Typography>
                    <Typography variant="small">Pulse Rate</Typography>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {prescriptionData.pulseRate}
                    </Typography>
                    <Typography variant="small">Diagnosis</Typography>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium md:col-span-3"
                    >
                      {prescriptionData.diagnosis}
                    </Typography>
                    <Typography variant="small">Symptoms</Typography>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-medium md:col-span-3"
                    >
                      {prescriptionData.symptoms}
                    </Typography>
                </div>
                <div className="w-full pt-4">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-y border-blue-gray-100 bg-blue-gray-50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70 text-center"
                            >
                              {head}
                              {head === "Dosage" && "*"}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {prescriptionData.checkupMedicines.map((medicine) => (
                        <tr className="text-center border-b border-blue-gray-50">
                          <td className="">
                            <Typography
                              variant="small"
                              // color="blue-gray"
                              className="font-normal p-4"
                            >
                              {medicine.brandName}
                            </Typography>
                          </td>
                          <td>
                            <Typography
                              variant="small"
                              // color="blue-gray"
                              className="font-normal"
                            >
                              {medicine.dosage}
                            </Typography>
                          </td>
                          <td>
                            <Typography
                              variant="small"
                              // color="blue-gray"
                              className="font-normal"
                            >
                              {medicine.quantity}
                            </Typography>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
        </Layout>
      )}
    </>
  );
};

export default PrescriptionDetail;
