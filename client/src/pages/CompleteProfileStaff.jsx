import React, { useState, useEffect } from "react";
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
import {toast} from "sonner";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";

export default function CompleteProfileStaff() {
  const navigate = useNavigate();
  const { userName , userEmail, userRole} = useAuthContext();
  const departments = ["Ayurvedic", "Gynecology", "Homeopathy"];
  const roles = ["Doctor", "Paramedical Staff"];

  const [formData, setFormData] = useState({
    staffName: userName,
    role: userRole,
    department: "",
    gender: "",
    email: userEmail,
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
      name: userName,
      role: userRole,      
      email: userEmail,
      gender: formData.gender.toUpperCase(),
    };
    if(formData.department) data.department = formData.department.toUpperCase();
    if(formData.mobileNumber) data.mobileNumber = formData.mobileNumber;
    console.log(data);
    try {
      const response = await axios.post(apiRoutes.staff, data, {
        withCredentials: true
      });
      console.log(response);
      if (response.data.ok) {
        console.log("Staff Profile Created");
        toast.success("Staff Profile Updated Successfully!"); 
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error(
        `ERROR (create-staff-record): ${error?.response?.data?.message}`        
        );
      toast.error(error?.response?.data?.message|| "Failed to update Staff Profile");
    }
  };

  return (
    <>
    
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <Card
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <CardHeader
          floated={false}
          shadow={false}
          className="flex rounded-lg pb-3 pt-3 justify-center bg-black h-28"
        >
          <div className="mb-2 sm:flex sm:flex-row flex-col items-center justify-between gap-8">
            <div>
              <div className="flex flex-row items-center justify-between gap-8">
                <Typography variant="h3" color="white">
                  Staff Profile
                </Typography>
              </div>
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
                  value={userName}
                  disabled
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
                  value={userRole}
                  disabled
                >
                  {roles.map((group) => (
                    <Option key={group} value={group}>
                      {group}
                    </Option>
                  ))}
                </MaterialSelect>
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
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
              </div>
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
                  value={userEmail}
                  disabled
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
    </div>
    </>
  );
}
