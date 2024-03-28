import React, { useState } from "react";
import {
  CardBody,
  Input,
  Card,
  CardHeader,
  Typography,
  Button,
  CardFooter,
  Select as MaterialSelect,
  Option,
} from "@material-tailwind/react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";

export default function AddStaffForm() {
  const navigate = useNavigate();

  const departments = ["Ayurvedic", "Gynecology", "Homeopathy"];
  const roles = ["Doctor", "Paramedical"];

  const [formData, setFormData] = useState({
    staffName: "",
    role: "",
    department: "",
    gender: "",
    email: "",
    mobileNumber: "",
  });

  const handleChange = (name, value) => {
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.staffName,
      role: formData.role.toUpperCase(),
      department: formData.department.toUpperCase(),
      email: formData.email,
      gender: formData.gender.toUpperCase(),
      mobileNumber: formData.mobileNumber,
    };

    try {
      const response = await axios.post(apiRoutes.staff, data, {
        withCredentials: true
      });
      console.log(response);
      toast.success("Staff added successfully");
      setTimeout(() => {
        navigate("/staff");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to add Staff");
    }
  };

  return (
    <Card className="h-max w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-3">
        <div className="mb-2 sm:flex sm:flex-row flex-col items-center justify-between gap-8">
          <div>
            <div className="flex flex-row items-center justify-between gap-8">
              <Typography variant="h5" color="blue-gray">
                Add Staff
              </Typography>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:hidden">
                <Button
                  className="flex items-center gap-3"
                  size="md"
                  onClick={() => {
                    navigate("/staff");
                  }}
                >
                  Staff List
                </Button>
              </div>
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              Add a new staff.
            </Typography>
          </div>
          <div className="hidden sm:flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="md"
              onClick={() => {
                navigate("/staff");
              }}
            >
              Staff List
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-3 sm:p-6">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
          <div className="grid  sm:grid-cols-2 gap-y-8 gap-x-4 w-full">
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-4 md:w-72 w-full justify-end">
                <label htmlFor="staffName">
                  Staff Name <span className="text-red-800">*</span>:
                </label>
              </div>
              <Input
                id="staffName"
                size="md"
                label="Staff Name"
                className="w-full"
                name="staffName"
                value={formData.staffName}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 md:w-72 w-full justify-end">
                <label htmlFor="mobileNo">
                  Role <span className="text-red-800">*</span>:
                </label>
              </div>
              <MaterialSelect
                id="role"
                size="md"
                name="role"
                label="Role"
                value={formData.role}
                onChange={(value) => handleChange("role", value)}
              >
                {roles.map((group) => (
                  <Option key={group} value={group}>
                    {group}
                  </Option>
                ))}
              </MaterialSelect>
            </div>
            {formData.role === "Doctor" && <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 md:w-72 w-full justify-end">
                <label htmlFor="mobileNo">Department :</label>
              </div>
              <MaterialSelect
                id="department"
                size="md"
                name="department"
                label="Department"
                value={formData.department}
                onChange={(value) => handleChange("department", value)}
              >
                {departments.map((group) => (
                  <Option key={group} value={group}>
                    {group}
                  </Option>
                ))}
              </MaterialSelect>
            </div>}
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="day">
                  Email <span className="text-red-800">*</span>:
                </label>
              </div>
              <Input
                id="email"
                size="md"
                label="Email"
                className="w-full"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 md:w-72 w-full justify-end">
                <label htmlFor="state">
                  Gender <span className="text-red-800">*</span>:
                </label>
              </div>
              <MaterialSelect
                id="gender"
                label="Select Gender"
                name="gender"
                value={formData.gender}
                onChange={(value) => handleChange("gender", value)}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </MaterialSelect>
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="day">Mobile Number:</label>
              </div>
              <Input
                id="mobileNumber"
                size="md"
                label="Mobile Number"
                className="w-full"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
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
