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
    <Card className="h-max w-full">
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
          <div className="grid grid-cols-2  gap-y-8 gap-x-4 w-full">
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-4 w-72 justify-end">
                <label htmlFor="medicineName">
                  Medicine Name <span className="text-red-800">*</span>:
                </label>
              </div>
              <Input
                id="medicineName"
                size="md"
                label="Medicine Name"
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="strength">Strength:</label>
              </div>
              <Input id="strength" size="md" label="Strength" />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="genericName">Generic Name:</label>
              </div>
              <Input id="genericName" size="md" label="Generic Name" />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="shelf">Shelf:</label>
              </div>
              <Input id="shelf" size="md" label="Shelf" />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="shelf">Shelf:</label>
              </div>
              <Input id="shelf" size="md" label="Shelf" />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="medicineDetails">Medicine Details:</label>
              </div>
              <Input id="medicineDetails" size="md" label="Medicine Details" />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="category">Category:</label>
              </div>
              <Select id="category" label="Select Category">
                <Option>Injection</Option>
                <Option>Syrup</Option>
                <Option>Tablet</Option>
                <Option>Capsule</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="medicineType">Medicine Type:</label>
              </div>
              <Select id="medicineType" label="Select Type">
                <Option>Generic</Option>
                <Option>Medical Kit</Option>
                <Option>Injection</Option>
                <Option>Surgicals</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="supplier">Select Supplier:</label>
              </div>
              <Select id="supplier" label="Select Supplier">
                <Option>Supplier1</Option>
                <Option>Supplier2</Option>
                <Option>Supplier3</Option>
                <Option>Supplier4</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="boxSize">Box Size:</label>
              </div>
              <Select id="boxSize" label="Select Leaf Pattern">
                <Option>14 per leaf</Option>
                <Option>20 per leaf</Option>
                <Option>21 per leaf</Option>
                <Option>25 per leaf</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="supplier">Select Supplier:</label>
              </div>
              <Select id="supplier" label="Select Supplier">
                <Option>Supplier1</Option>
                <Option>Supplier2</Option>
                <Option>Supplier3</Option>
                <Option>Supplier4</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="boxSize">Box Size:</label>
              </div>
              <Select id="boxSize" label="Select Leaf Pattern">
                <Option>14 per leaf</Option>
                <Option>20 per leaf</Option>
                <Option>21 per leaf</Option>
                <Option>25 per leaf</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="supplier">Select Supplier:</label>
              </div>
              <Select id="supplier" label="Select Supplier">
                <Option>Supplier1</Option>
                <Option>Supplier2</Option>
                <Option>Supplier3</Option>
                <Option>Supplier4</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="boxSize">Box Size:</label>
              </div>
              <Select id="boxSize" label="Select Leaf Pattern">
                <Option>14 per leaf</Option>
                <Option>20 per leaf</Option>
                <Option>21 per leaf</Option>
                <Option>25 per leaf</Option>
              </Select>
            </div>
            {/* <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="supplier">Select Supplier:</label>
              </div>
              <Select id="supplier" label="Select Supplier">
                <Option>Supplier1</Option>
                <Option>Supplier2</Option>
                <Option>Supplier3</Option>
                <Option>Supplier4</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="boxSize">Box Size:</label>
              </div>
              <Select id="boxSize" label="Select Leaf Pattern">
                <Option>14 per leaf</Option>
                <Option>20 per leaf</Option>
                <Option>21 per leaf</Option>
                <Option>25 per leaf</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="supplier">Select Supplier:</label>
              </div>
              <Select id="supplier" label="Select Supplier">
                <Option>Supplier1</Option>
                <Option>Supplier2</Option>
                <Option>Supplier3</Option>
                <Option>Supplier4</Option>
              </Select>
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="boxSize">Box Size:</label>
              </div>
              <Select id="boxSize" label="Select Leaf Pattern">
                <Option>14 per leaf</Option>
                <Option>20 per leaf</Option>
                <Option>21 per leaf</Option>
                <Option>25 per leaf</Option>
              </Select>
            </div> */}
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
