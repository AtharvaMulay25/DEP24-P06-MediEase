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
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";

export function AddPatient() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    gender: "",
    dob: "",
    category: "",
    patientAge: "",
    email: "",
    department: "",
  });
  
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  
  const handleChange = (name, value) => {
    // console.log(e.target);
    // const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle the submission of the form
    const sendData = {
      name: formData.patientName,
      department: formData.department,
      dob: new Date(formData.dob),
      age: parseInt(formData.patientAge),
      email: formData.email,
      bloodGroup: formData.bloodGroup,
      program: formData.program,
      fatherOrSpouseName: formData.fatherName,
      category: formData.category.toUpperCase(),
      gender: formData.gender.toUpperCase(),
    };

    try {
      const res = await axios.post(apiRoutes.patient, sendData);
      console.log("res : ", res);

      const data = res?.data;
      if (data && data?.ok) {
        console.log("patient record saved successfully");
        navigate("/patient/list");
      } else {
        console.log(`ERROR (create-patient-record): ${data?.message || "NO-DATA"}`);
      }
    } catch (err) {
      console.log(`ERROR (create-patient-record): ${err.message}`);
    }
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
                Patient Details
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
                Patient List
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
            <div className="grid md:grid-cols-2 gap-y-8 gap-x-4 w-full">
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-4 w-full md:w-72 justify-end">
                  <label htmlFor="patientName">
                    Full Name <span className="text-red-800">*</span>
                  </label>
                </div>
                <Input
                  id="patientName"
                  size="md"
                  label="Full Name"
                  className="w-full"
                  name="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end ">
                  <label htmlFor="department">Department</label>
                </div>
                <Input
                  id="department"
                  size="md"
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="patientAge">
                    Age <span className="text-red-800">*</span>
                  </label>
                </div>
                <Input
                  id="patientAge"
                  size="md"
                  label="Age"
                  type="number"
                  min={1}
                  max={100}
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="email">
                    Email <span className="text-red-800">*</span>
                  </label>
                </div>
                <Input
                  id="email"
                  size="md"
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="dob">
                    Date of Birth <span className="text-red-800">*</span>
                  </label>
                </div>
                <Input
                  id="dob"
                  size="md"
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="gender">
                    Gender <span className="text-red-800">*</span>
                  </label>
                </div>
                <Select
                  id="gender"
                  label="Select"
                  name="gender"
                  value={formData.gender}
                  onChange={(value) => handleChange("gender", value)}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  {/* <Option value="Other">Other</Option> */}
                </Select>
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="bloodGroup">
                    Blood Group <span className="text-red-800">*</span>
                  </label>
                </div>
                <Select
                  id="bloodGroup"
                  label="Select Type"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={(value) => handleChange("bloodGroup", value)}
                >
                  {bloodGroups.map((group) => (
                    <Option key={group} value={group}>
                      {group}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="category">
                    Category <span className="text-red-800">*</span>
                  </label>
                </div>
                <Select
                  id="category"
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={(value) => handleChange("category", value)}
                >
                  <Option value="Student">Student</Option>
                  <Option value="Faculty">Faculty</Option>
                  <Option value="Staff">Staff</Option>
                  <Option value="Visitor">Visitor</Option>
                </Select>
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="program">
                    Program 
                  </label>
                </div>
                <Input
                  id="program"
                  size="md"
                  label="Program"
                  name="program"
                  value={formData.program}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="fatherName">
                    Father's or Spouse's Name 
                  </label>
                </div>
                <Input
                  id="fatherName"
                  size="md"
                  label="Father's Name"
                  name="fatherName"
                  value={formData.fatherName}
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
    </Layout>
  );
}
