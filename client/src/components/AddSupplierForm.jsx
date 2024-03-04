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

export function AddSupplierForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    supplierName: "",
    mobileNo: "",
    email: "",
    contact: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    address1: "",
    address2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
              Supplier Form
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="md"
              onClick={() => {
                navigate("/supplier/list");
              }}
            >
              Supplier List
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4 w-full">
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-4 w-72 justify-end">
                <label htmlFor="supplierName">
                  Supplier Name <span className="text-red-800">*</span>:
                </label>
              </div>
              <Input
                id="supplierName"
                size="md"
                label="Supplier Name"
                className="w-full"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="mobileNo">Mobile No:</label>
              </div>
              <Input
                id="mobileNo"
                size="md"
                label="Mobile No"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="email">Email:</label>
              </div>
              <Input
                id="email"
                size="md"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="contact">Contact:</label>
              </div>
              <Input
                id="contact"
                size="md"
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="phone">Phone:</label>
              </div>
              <Input
                id="phone"
                size="md"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="city">City:</label>
              </div>
              <Input
                id="city"
                size="md"
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="state">State:</label>
              </div>
              <Input
                id="state"
                size="md"
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="zip">ZIP:</label>
              </div>
              <Input
                id="zip"
                size="md"
                label="ZIP"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="address1">Address Line 1:</label>
              </div>
              <Input
                id="address1"
                size="md"
                label="Address Line 1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="address2">Address Line 2:</label>
              </div>
              <Input
                id="address2"
                size="md"
                label="Address Line 2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="state">State:</label>
              </div>
              <Input
                id="state"
                size="md"
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="zip">ZIP:</label>
              </div>
              <Input
                id="zip"
                size="md"
                label="ZIP"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="address1">Address Line 1:</label>
              </div>
              <Input
                id="address1"
                size="md"
                label="Address Line 1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="address2">Address Line 2:</label>
              </div>
              <Input
                id="address2"
                size="md"
                label="Address Line 2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="state">State:</label>
              </div>
              <Input
                id="state"
                size="md"
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="zip">ZIP:</label>
              </div>
              <Input
                id="zip"
                size="md"
                label="ZIP"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="address1">Address Line 1:</label>
              </div>
              <Input
                id="address1"
                size="md"
                label="Address Line 1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-around p-1">
              <div className="flex mr-2 w-72 justify-end">
                <label htmlFor="address2">Address Line 2:</label>
              </div>
              <Input
                id="address2"
                size="md"
                label="Address Line 2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
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
