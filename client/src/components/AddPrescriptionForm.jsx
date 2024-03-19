import React, { useState, useEffect } from "react";
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
  Tooltip,
  IconButton,
  Textarea,
} from "@material-tailwind/react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";

export default function AddPrescriptionForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientID: "",
    doctor: "",
    date: "",
    temperature: "",
    bloodPressure: "",
    patientName: "",
    pulseRate: "",
    spO2: "",
    symptoms: "",
    diagnosis: "",
  });

  const doctors = ["Dr. John Doe", "Dr. Jane Doe", "Dr. John Smith"];
  const frequencyList = ["OD", "BD", "TDS", "SOS"];

  const TABLE_HEAD = ["Medicine Name", "Dosage", "Frequency", "Action"];
  const [dataArray, setDataArray] = useState([
    { name: "", dosage: "", frequency: "" },
  ]);

  // const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // Fetch doctors list when the component mounts
    // fetchDoctors();
    fetchMedicines();
  }, []);

  // const fetchDoctors = async () => {
  //   try {
  //     const response = await axios.get(
  //       apiRoutes.doctor
  //     );
  //     // console.log(response.data);
  //     setDoctors(response.data.data); // Assuming the response is an array of suppliers
  //   } catch (error) {
  //     console.error(`ERROR (fetch-doctor-in-add-prescription): ${error?.response?.data?.message}`);
  //   }
  // };

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(apiRoutes.medicine);
      // console.log(response.data.data);
      setMedicines(response.data.data); // Assuming the response is an array of medicines
    } catch (error) {
      console.error(
        `ERROR (fetch-medicines-in-add-purchase): ${error?.response?.data?.message}`
      );
      toast.error(
        error?.response?.data?.message || "Failed to fetch Medicines"
      );
    }
  };

  // const handleDoctorChange = (selectedDoctor) => {
  //   console.log(selectedDoctor.value);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     doctor: selectedDoctor,
  //   }));
  // };

  const handleInputChange = (key, index, value) => {
    // console.log(dataArray)
    console.log(key, index, value);
    const updatedArray = [...dataArray];
    console.log(updatedArray);
    updatedArray[index][key] = value;
    setDataArray(updatedArray);
  };

  const handleMedicineChange = (selectedMedicine, index) => {
    console.log(selectedMedicine.value);
    setDataArray((prevData) => {
      const updatedArray = [...prevData];
      updatedArray[index].name = selectedMedicine;
      console.log(updatedArray);
      return updatedArray;
    });
  };

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

  const handleAddRow = () => {
    setDataArray((prevData) => [
      ...prevData,
      { name: "", dosage: "", frequency: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    if (dataArray.length === 1) {
      return;
    }
    setDataArray((prev) => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
    });
  };

  return (
    <Card className="h-max w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-3">
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
                navigate("/prescription");
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
                  Patient ID <span className="text-red-800">*</span>:
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
                  Patient Name <span className="text-red-800">*</span>:
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
                <label htmlFor="temperature">Temperature</label>:
              </div>
              <Input
                id="temperature"
                size="md"
                name="temperature"
                label="Temperature"
                className="w-full"
                value={formData.temperature}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="pulseRate">Pulse Rate</label>:
              </div>
              <Input
                id="pulseRate"
                size="md"
                name="pulseRate"
                label="Pulse Rate"
                className="w-full"
                value={formData.pulseRate}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="pulseRate">SpO2</label>:
              </div>
              <Input
                id="spO2"
                size="md"
                name="spO2"
                label="SpO2"
                className="w-full"
                value={formData.spO2}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="bloodPressure">Blood pressure</label>:
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
                  Date<span className="text-red-800">*</span>:
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
                  Doctor <span className="text-red-800">*</span>:
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
                {/* <Select
                  id="doctor"
                  options={doctors.map((doctor) => ({
                    value: doctor.id, // Assuming supplier object has a unique identifier 'id'
                    label: doctor.name, // Assuming supplier object has a property 'name'
                  }))}
                  value={formData.doctor}
                  onChange={handleDoctorChange}
                  isClearable={true}
                  placeholder="Select Doctor"
                  className="w-full"
                /> */}
                {doctors.map((doctor) => (
                  <Option key={doctor} value={doctor}>
                    {doctor}
                  </Option>
                ))}
              </MaterialSelect>
            </div>

            <div className="flex-col md:flex md:flex-row items-start justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="date">
                  Diagnosis<span className="text-red-800">*</span>:
                </label>
              </div>
              <Textarea
                id="diagnosis"
                size="md"
                label="Diagnosis"
                name="diagnosis"
                type="text"
                className="w-full border-blue-gray-200 border h-10 px-3 rounded-lg min-w-[200px]"
                value={formData.diagnosis}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>

            <div className="flex-col md:flex md:flex-row items-start justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="date">Symptoms:</label>
              </div>
              <Textarea
                id="symptoms"
                size="md"
                label="Symptoms"
                name="symptoms"
                type="text"
                className="w-full border-blue-gray-200 border h-10 px-3 rounded-lg min-w-[200px]"
                value={formData.symptoms}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
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
                {dataArray.map((data, index) => (
                  <tr className="even:bg-blue-gray">
                    <td className="p-4">
                      {/* <Select
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
                      /> */}
                      <Select
                        id="medicine"
                        options={medicines.map((medicine) => ({
                          value: medicine.id,
                          label: medicine.brandName,
                        }))}
                        value={data["name"]}
                        onChange={(selectedMedicine) =>
                          handleMedicineChange(selectedMedicine, index)
                        }
                        isClearable={true}
                        placeholder="Select Medicine"
                        className="w-full"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        className="w-full border-blue-gray-200 border h-10 px-3 rounded-lg min-w-[200px]"
                        placeholder="Dosage"
                        value={data["dosage"]}
                        onChange={(e) =>
                          handleInputChange("dosage", index, e.target.value)
                        }
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                        <MaterialSelect
                          id="frequency"
                          size="md"
                          label="Frequency"
                          name="frequency"
                          className="w-full"
                          value={data["frequency"]}
                          onChange={(value) =>
                            handleInputChange("frequency", index, value)
                          }
                        >
                          {frequencyList.map((frequency) => (
                            <Option key={frequency} value={frequency}>
                              {frequency}
                            </Option>
                          ))}
                        </MaterialSelect>
                      </div>

                      {/* <input
                        type="number"
                        className="w-full border-blue-gray-200 border h-10 px-3 rounded-lg min-w-[200px]"
                        placeholder="Frequency"
                        value={data["frequency"]}
                        onChange={(e) =>
                          handleInputChange('frequency', index,  e.target.value)
                        }
                      /> */}
                    </td>
                    <td className="p-4">
                      <Tooltip content="Delete">
                        <IconButton
                          variant="text"
                          onClick={() => handleDeleteRow(index)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="p-4">
                    <div className="flex justify-center items-center gap-2">
                      <Tooltip content="Add">
                        <IconButton variant="text" onClick={handleAddRow}>
                          <PlusCircleIcon className="h-5 w-5" />
                        </IconButton>
                      </Tooltip>
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
  );
}
