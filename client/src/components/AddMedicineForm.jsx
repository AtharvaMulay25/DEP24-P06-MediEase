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

export function AddMedicineForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    status: "",
    supplierPrice: "",
    supplier: "",
    medicineType: "",
    price: "",
    category: "",
    medicineDetails: "",
    shelf: "",
    unit: "",
    boxSize: "",
    genericName: "",
    strength: "",
    medicineName: "",
  });

  const suppliers = [
    { id: 1, name: "Supplier 1" },
    { id: 2, name: "Supplier 2" },
    { id: 3, name: "Supplier 3" },
    { id: 4, name: "Supplier 4" },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission of the form
    console.log(formData);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-3">
        <div className="mb-2 flex items-center justify-between gap-8">
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
          <div className="grid grid-cols-2  gap-y-8 gap-x-56">
            <div className="flex items-center justify-around p-1">
              <label htmlFor="medicineName" className="mr-2 w-72">
                Medicine Name:
              </label>
              <Input id="medicineName" size="md" label="Medicine Name" />
            </div>
            <div className="flex items-center justify-around p-1">
              <label htmlFor="strength" className="mr-2 w-72">
                Strength:
              </label>
              <Input id="strength" size="md" label="Strength" />
            </div>
            <div className="flex items-center justify-around p-1">
              <label htmlFor="genericName" className="mr-2 w-72">
                Generic Name:
              </label>
              <Input id="genericName" size="md" label="Generic Name" />
            </div>
            <div className="flex items-center justify-around p-1">
              <label htmlFor="shelf" className="mr-2 w-72">
                Shelf:
              </label>
              <Input id="shelf" size="md" label="Shelf" />
            </div>
            <div className="flex items-center justify-around p-1">
              <label htmlFor="shelf" className="mr-2 w-72">
                Shelf:
              </label>
              <Input id="shelf" size="md" label="Shelf" />
            </div>
            <div className="flex items-center justify-around p-1">
              <label htmlFor="medicineDetails" className="mr-2 w-72">
                Medicine Details:
              </label>
              <Input id="medicineDetails" size="md" label="Medicine Details" />
            </div>
            <div className="flex items-center justify-around p-1">
              <label htmlFor="category" className="mr-2 w-72">
                Category:
              </label>
              <Select id="category" label="Select Category">
                <Option>Injection</Option>
                <Option>Syrup</Option>
                <Option>Tablet</Option>
                <Option>Capsule</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <label htmlFor="medicineType" className="mr-2 w-72">
                Medicine Type:
              </label>
              <Select id="medicineType" label="Select Type">
                <Option>Generic</Option>
                <Option>Medical Kit</Option>
                <Option>Injection</Option>
                <Option>Surgicals</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <label htmlFor="supplier" className="mr-2 w-72">
                Select Supplier:
              </label>
              <Select id="supplier" label="Select Supplier">
                <Option>Supplier1</Option>
                <Option>Supplier2</Option>
                <Option>Supplier3</Option>
                <Option>Supplier4</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <label htmlFor="boxSize" className="mr-2 w-72">
                Box Size:
              </label>
              <Select id="boxSize" label="Select Leaf Pattern">
                <Option>14 per leaf</Option>
                <Option>20 per leaf</Option>
                <Option>21 per leaf</Option>
                <Option>25 per leaf</Option>
              </Select>
            </div>
          </div>
        </form>
      </CardBody>
      <CardFooter>
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
