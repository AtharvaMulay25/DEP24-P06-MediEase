import React, { useState } from "react";
import Select from "react-select";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  CardBody,
  Card,
  Input,
  CardHeader,
  Typography,
  Button,
  CardFooter,
  Select as MaterialSelect,
  Option,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../layouts/PageLayout";

export function AddPrescription() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientID: "",
    doctor: "",
    date: "",
    temperature: "",
    bloodPressure: "",
    patientName: "",
  });

  const doctors = ["Dr. John Doe", "Dr. Jane Doe", "Dr. John Smith"];
  const TABLE_HEAD = ["Medicine Name", "Dosage", "Frequency", "Action"];
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "" },
  ]);

  const handleChange = (name, value) => {
    // console.log(e.target);
    // const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle the submission of the form
    const data = {
      patientID: formData.patientID,
      patientName: formData.patientName,
      temperature: formData.temperature,
      bloodPressure: formData.bloodPressure,
      doctor: formData.doctor,
      date: formData.date,
    };
  };

  const addMedicine = () => {
    setMedicines((prevMedicines) => [
      ...prevMedicines,
      { name: "", dosage: "", frequency: "" },
    ]);
  };

  const removeMedicine = (index) => {
    if (medicines.length === 1) {
      return;
    }
    setMedicines((prevMedicines) => {
      const newMedicines = [...prevMedicines];
      newMedicines.splice(index, 1);
      return newMedicines;
    });
  };

  return (
    <Layout>
      <Card className="h-max w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none pb-3"
        >
          <div className="mb-2 sm:flex sm:flex-row flex-col items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Prescription Details
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="md"
                onClick={() => {
                  navigate("/patient/list");
                }}
              >
                Prescription List
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
            <div className="grid md:grid-cols-2 gap-y-8 gap-x-4 w-full">
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-4 w-full md:w-72 justify-end">
                  <label htmlFor="patientID">
                    Patient ID <span className="text-red-800">*</span>
                  </label>
                </div>
                <Input
                  id="patientID"
                  size="md"
                  label="Patient ID"
                  name="patientID"
                  className="w-full"
                  value={formData.patientID}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end ">
                  <label htmlFor="patientName">
                    Patient Name <span className="text-red-800">*</span>
                  </label>
                </div>
                <Input
                  id="patientName"
                  size="md"
                  name="patientName"
                  label="Patient Name"
                  className="w-full"
                  value={formData.patientName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="temperature">Temprature</label>
                </div>
                <Input
                  id="temperature"
                  size="md"
                  name="temperature"
                  label="Temprature"
                  className="w-full"
                  value={formData.temperature}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="bloodPressure">Blood pressure</label>
                </div>
                <Input
                  id="bloodPressure"
                  size="md"
                  name="bloodPressure"
                  label="Blood pressure"
                  className="w-full"
                  value={formData.bloodPressure}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="date">
                    Date<span className="text-red-800">*</span>
                  </label>
                </div>
                <Input
                  id="date"
                  size="md"
                  label="Date"
                  name="date"
                  type="date"
                  className="w-full border-blue-gray-200 border h-10 px-3 rounded-lg min-w-[200px]"
                  value={formData.date}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="doctor">
                    Doctor <span className="text-red-800">*</span>
                  </label>
                </div>
                <MaterialSelect
                  id="doctor"
                  size="md"
                  label="Doctor"
                  name="doctor"
                  className="w-full"
                  value={formData.doctor}
                  onChange={(value) => handleChange("doctor", value)}
                >
                  {doctors.map((doctor) => (
                    <Option key={doctor} value={doctor}>
                      {doctor}
                    </Option>
                  ))}
                </MaterialSelect>
              </div>
            </div>

            <div className="w-full ">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine, index) => (
                  <tr className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Select
                        className="w-full"

                        options={[
                          { label: "Medicine 1", value: "Medicine 1" },
                          { label: "Medicine 2", value: "Medicine 2" },
                          { label: "Medicine 3", value: "Medicine 3" },
                        ]}
                        isClearable={true}
                        placeholder="Select Medicine"
                        onChange={(value) => {
                          const newMedicines = [...medicines];
                          newMedicines[index].name = value;
                          setMedicines(newMedicines);
                        }
                        }
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        className="w-full border-blue-gray-200 border h-10 px-3 rounded-lg min-w-[200px]"
                        placeholder="Dosage"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        className="w-full border-blue-gray-200 border h-10 px-3 rounded-lg min-w-[200px]"
                        placeholder="Frequency"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-2">
                        <TrashIcon 
                        className="cursor-pointer w-6 h-6 text-red-500" 
                        onClick={() => removeMedicine(index)}
                        />
                      </div>
                    </td>
                  </tr>
                  ))}
                  <tr>
                    <td colSpan="4" className="p-4" >
                      <div className="flex justify-center items-center gap-2">
                        <PlusCircleIcon 
                        className="cursor-pointer w-6 h-6" 
                        onClick={addMedicine}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </CardBody>
        <CardFooter divider={true}>
          <div className="flex justify-end">
            <Button
              className="flex items-center gap-3"
              size="lg"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Layout>
  );
}
