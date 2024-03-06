import React, { useState } from "react";
import {
  CardBody,
  Input,
  Card,
  CardHeader,
  Typography,
  Button,
  CardFooter,
  Select,
  Option,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export function AddMedicineForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    medicineName: "",
    medicineType: "",
    category: "",
    medicineDetails: "",
    boxSize: "",
    genericName: "",
    brandName: "",
    strength: ""
  });


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
      name: formData.medicineName,
      medicineType: formData.medicineType,
      category: formData.category,
      medicineDetails: formData.medicineDetails,
      boxSize: formData.boxSize,
      genericName: formData.genericName,
      brandName: formData.brandName,
      strength: formData.strength
    };
    try {
      const response = await axios.post("http://localhost:4000/api/medicine/create", data);
      console.log(response);
      navigate("/medicine/list");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="h-max w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-3">
        <div className="mb-2 sm:flex sm:flex-row flex-col items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Medicine Form
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="md"
              onClick={() => {
                navigate("/medicine/list");
              }}
            >
              Medicine List
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
          <div className="grid md:grid-cols-2 gap-y-8 gap-x-4 w-full">
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-4 w-full md:w-72 justify-end">
                <label htmlFor="medicineName">
                  Medicine Name <span className="text-red-800">*</span>:
                </label>
              </div>
              <Input
                id="medicineName"
                size="md"
                label="Medicine Name"
                className="w-full"
                name="medicineName"
                value={formData.medicineName}
                onChange={(e)=>handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end ">
                <label htmlFor="strength">Strength:</label>
              </div>
              <Input id="strength" size="md" label="Strength" 
              name="strength"
              value={formData.strength}
              onChange={(e)=>handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="genericName">Generic Name:</label>
              </div>
              <Input id="genericName" size="md" label="Generic Name" 
              name="genericName"
              value={formData.genericName}
              onChange={(e)=>handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="brandName">Brand Name <span className="text-red-800">*</span>:</label>
              </div>
              <Input id="brandName" size="md" label="Brand Name" 
              name="brandName"
              value={formData.brandName}
              onChange={(e)=>handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="medicineDetails">Medicine Details:</label>
              </div>
              <Input id="medicineDetails" size="md" label="Medicine Details" 
              name="medicineDetails"
              value={formData.medicineDetails}
              onChange={(e)=>handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="category">Category <span className="text-red-800">*</span>:</label>
              </div>
              <Select id="category" label="Select Category" 
              name="category"
              value={formData.category}
              onChange={(value) => handleChange("category", value)}
              >
                <Option value="Injection">Injection</Option>
                <Option value="Syrup">Syrup</Option>
                <Option value="Tablet">Tablet</Option>
                <Option value="Capsule">Capsule</Option>
              </Select>
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="medicineType">Medicine Type:</label>
              </div>
              <Select id="medicineType" label="Select Type"
              name="medicineType"
              value={formData.medicineType}
              onChange={(value) => handleChange("medicineType", value)}
              >
                <Option value="Generic">Generic</Option>
                <Option value="Medical Kit">Medical Kit</Option>
                <Option value="Injection">Injection</Option>
                <Option value="Surgicals">Surgicals</Option>
              </Select>
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="boxSize">Box Size <span className="text-red-800">*</span>:</label>
              </div>
              <Select id="boxSize" label="Select Leaf Pattern"
              name="boxSize"
              value={formData.boxSize}
              onChange={(value) => handleChange("boxSize", value)}
              >
                <Option value="14 per leaf">14 per leaf</Option>
                <Option value="20 per leaf">20 per leaf</Option>
                <Option value="21 per leaf">21 per leaf</Option>
                <Option value="25 per leaf">25 per leaf</Option>
              </Select>
            </div>
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
