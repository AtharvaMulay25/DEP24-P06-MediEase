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

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddScheduleForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctorName: "",
    department: "",
    email: "",
    day: "",
    shift: "",
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

    const data = {
      doctorName: formData.doctorName,
      department: formData.department,
      email: formData.email,
      day: formData.day,
      shift: formData.shift,
    };
  };

  return (
    <Card className="h-max w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-3">
        <div className="mb-2 sm:flex sm:flex-row flex-col items-center justify-between gap-8">
          <div>
            <div className="flex flex-row items-center justify-between gap-8">
              <Typography variant="h5" color="blue-gray">
                Add Schedule
              </Typography>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:hidden">
                <Button
                  className="flex items-center gap-3"
                  size="md"
                  onClick={() => {
                    navigate("/schedule");
                  }}
                >
                  See Schedule
                </Button>
              </div>
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              Add a new schedule.
            </Typography>
          </div>
          <div className="hidden sm:flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="md"
              onClick={() => {
                navigate("/schedule");
              }}
            >
              See Schedule
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-3 sm:p-6">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
          <div className="grid  sm:grid-cols-2 gap-y-8 gap-x-4 w-full">
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-4 md:w-72 w-full justify-end">
                <label htmlFor="doctorName">
                  Doctor Name <span className="text-red-800">*</span>:
                </label>
              </div>
              <Input
                id="doctorName"
                size="md"
                label="Doctor Name"
                className="w-full"
                name="doctorName"
                value={formData.doctorName}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 md:w-72 w-full justify-end">
                <label htmlFor="mobileNo">
                  Department <span className="text-red-800">*</span>:
                </label>
              </div>
              <Input
                id="department"
                size="md"
                disabled
                name="department"
                label="Department"
                value={formData.department}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 w-full md:w-72 justify-end">
                <label htmlFor="day">Day:</label>
              </div>
              <MaterialSelect
                id="day"
                label="Select Day"
                name="day"
                value={formData.day}
                onChange={(value) => handleChange("day", value)}
              >
                <Option value="Monday">Monday</Option>
                <Option value="Tuesday">Tuesday</Option>
                <Option value="Wednesday">Wednesday</Option>
                <Option value="Thursday">Thursday</Option>
                <Option value="Friday">Friday</Option>
                <Option value="Saturday">Saturday</Option>
                <Option value="Sunday">Sunday</Option>
              </MaterialSelect>
            </div>
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 md:w-72 w-full justify-end">
                <label htmlFor="state">
                  Shift <span className="text-red-800">*</span>:
                </label>
              </div>
              <MaterialSelect
                id="shift"
                label="Select Shift"
                name="shift"
                value={formData.shift}
                onChange={(value) => handleChange("shift", value)}
              >
                <Option value="Morning">Morning</Option>
                <Option value="Afternoon">Afternoon</Option>
              </MaterialSelect>
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
