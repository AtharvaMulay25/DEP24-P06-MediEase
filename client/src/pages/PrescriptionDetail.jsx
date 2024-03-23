import React, { Component } from "react";
import { useParams } from "react-router-dom";

import { PrinterIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import Layout from "../layouts/PageLayout";

const TABLE_HEAD = ["Medicine", "Dosage", "Frequency"];

const PrescriptionDetail = () => {
  const { id } = useParams();
  const prescriptionData = {
    opdID: "123",
    patientName: "John Doe",
    doctor: "Dr. Jane Doe",
    date: "12/12/2021",
    temperature: "98.6",
    bloodPressure: "120/80",
    spO2: "98",
    pulse_rate: "72",
    diagnosis: "Fever due to cold weather and viral infection in the area. Take rest and drink plenty of water. ",
    symptoms: "Headache, Bodyache and fever.",
    medicines: [
      {
        name: "Paracetamol",
        dosage: "2-0-1",
        frequency: "Daily",
      },
      {
        name: "Azithromycin",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
      {
        name: "Medicine 1",
        dosage: "1-0-1",
        frequency: "Daily",
      },
    ],
  };
  return (
    <Layout>
      <div className="flex flex-col self-center lg:w-2/3 h-max">
        <div className="flex flex-col sm:flex-row justify-between py-2">
          <div>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Prescription Detail
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Date: {prescriptionData.date}
            </Typography>
          </div>
          <div className="flex gap-x-2 h-10">
            <Button size="md"  ripple={true}>
              Edit
            </Button>
            <Button
              size="md"
              ripple={true}
              className="flex gap-x-1 px-4"
            >
              <PrinterIcon className="h-4" /> Print
            </Button>
          </div>
        </div>
        <Card className="w-full h-fit min-h-lvh">
          <CardBody>
            <div className="flex border-b border-black p-2 ">
              {/* <img
                src="\src\assets\img\iitrprbanner.png"
                alt="logo"
                className="w-4/5 h-20 rounded-none"
              /> */}
              <img
                src="\src\assets\img\iitroparlogo0.jpg"
                alt="logo"
                className="px-4 w-fit h-24 rounded-none"
              />
              <div className="w-full">
                <Typography variant="h3" color="blue-grey" className="">
                  Indian Institute of Technology Ropar
                </Typography>
                <Typography variant="h5" color="blue-grey" className="">
                  Medical center / Rupnagar - 140001, Punjab, India
                </Typography>
                <Typography variant="h5" color="blue-grey" className="text-end">
                  OPD Slip
                </Typography>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 pt-4 pl-10 justify-items-left">
              <Typography variant="small">OPD Id</Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {prescriptionData.opdID}
              </Typography>

              <Typography variant="small">Doctor</Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {prescriptionData.doctor}
              </Typography>
            
              <Typography variant="small">Patient Name</Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {prescriptionData.patientName}
              </Typography>
            
              <Typography variant="small">Date</Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {prescriptionData.date}
              </Typography>
            
              <Typography variant="small">Temperature</Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {prescriptionData.temperature}
              </Typography>
            
              <Typography variant="small">Blood Pressure</Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {prescriptionData.bloodPressure}
              </Typography>
            
              <Typography variant="small">SpO2</Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {prescriptionData.spO2}
              </Typography>
            
              <Typography variant="small">Pulse Rate</Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                {prescriptionData.pulse_rate}
              </Typography>
            
              <Typography variant="small">Diagnosis</Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 font-medium col-span-3"
              >
                {prescriptionData.diagnosis}
              </Typography>
              <Typography variant="small">Symptoms</Typography>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 font-medium col-span-3"
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
                          {head === "Dosage" && '*'}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prescriptionData.medicines.map((medicine) => (
                    <tr className="text-center border-b border-blue-gray-50">
                      <td className="">
                        <Typography
                          variant="small"
                          // color="blue-gray"
                          className="font-normal p-4"
                        >
                          {medicine.name}
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
                          {medicine.frequency}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
          <CardFooter className="p-4">
            <Typography variant="small">
              * Dosage: 1-0-1 means 1 tablet in the morning, 0 in the afternoon
              and 1 tablet in the evening.
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default PrescriptionDetail;
