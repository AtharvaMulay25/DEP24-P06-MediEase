import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import Toaster from "../components/UI/Toaster";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { useAuthContext } from "../hooks/useAuthContext";
export default function CompleteProfilePatient() {
  const navigate = useNavigate();
  const { userName , userEmail} = useAuthContext();
  console.log(userName, userEmail)
  const [formData, setFormData] = useState({
    name: userName,
    department:"",
    age : "",
    email: userEmail,
    bloodGroup: "",
    allergy: "",
    program:"", 
    fatherOrSpouseName:"", 
    category: "",
    gender: ""
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
      name: userName,
      age: parseInt(formData.age),
      email: userEmail,
      bloodGroup: formData.bloodGroup,
      category: formData.category.toUpperCase(),
      gender: formData.gender.toUpperCase(),
    };
    if(formData.department) sendData.department = formData.department;
    if(formData.allergy) sendData.allergy = formData.allergy;
    if(formData.program) sendData.program = formData.program;
    if(formData.fatherOrSpouseName) sendData.fatherOrSpouseName = formData.fatherOrSpouseName;
    
    try {
      const res = await axios.post(apiRoutes.patient, sendData);
      console.log("res : ", res);

      const data = res?.data;
      if (data && data?.ok) {
        console.log("patient record saved successfully");
        toast.success("Profile updated successfully.");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.error(
          `ERROR (create-patient-record): ${data?.message || "NO-DATA"}`
        );
      }
    } catch (error) {
      console.error(
        `ERROR (create-patient-record): ${error?.response?.data?.message}`        
        );
      toast.error(error?.response?.data?.message || "Failed to update profile.");
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
                  Patient Profile
                </Typography>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
            <div className="grid md:grid-cols-2 gap-y-8 gap-x-4 w-full">
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-4 w-full md:w-72 justify-end">
                  <label htmlFor="name">
                    Full Name <span className="text-red-800">*</span>:
                  </label>
                </div>
                <Input
                  id="name"
                  size="md"
                  label="Name"
                  className="w-full"
                  name="name"
                  value={userName}
                  disabled
                  />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="department">Department:</label>
                </div>
                <Select
                  id="department"
                  label="Select"
                  name="department"
                  value={formData.department}
                  onChange={(value) => handleChange("department", value)}
                >
                  <Option value="COMPUTER_SCIENCE">Computer Science</Option>
                  <Option value="ELECTRICAL">Electrical</Option>
                  <Option value="MECHANICAL">Mechanical</Option>
                  <Option value="MATHEMATICS_COMPUTING">
                    Mathematics & Computing
                  </Option>
                  <Option value="CHEMICAL">Chemical</Option>
                  <Option value="CIVIL">Civil</Option>
                  <Option value="METALLURGY">Metallurgy</Option>
                  <Option value="ENGINEERING_PHYSICS">
                    Engineering Physics
                  </Option>
                  <Option value="PHYSICS">Physics</Option>
                  <Option value="CHEMISTRY">Chemistry</Option>
                  <Option value="BIOLOGY">Biology</Option>
                  <Option value="MATHEMATICS">Mathematics</Option>
                  <Option value="HUMANITIES">Humanities</Option>
                </Select>
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="age">
                    Age <span className="text-red-800">*</span>:
                  </label>
                </div>
                <Input
                  id="age"
                  size="md"
                  label="Age"
                  type="number"
                  min={1}
                  max={100}
                  name="age"
                  value={formData.age}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="email">
                    Email <span className="text-red-800">*</span>:
                  </label>
                </div>
                <Input
                  id="email"
                  size="md"
                  label="Email"
                  name="email"
                  type="email"
                  value={userEmail}
                  disabled
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="allergy">Allergies(if any):</label>
                </div>
                <Input
                  id="allergy"
                  size="md"
                  label="Allergies"
                  name="allergy"
                  type="allergy"
                  value={formData.allergy}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="gender">
                    Gender <span className="text-red-800">*</span>:
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
                    Blood Group <span className="text-red-800">*</span>:
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
                    Category <span className="text-red-800">*</span>:
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
                  <label htmlFor="program">Program</label>:
                </div>
                <Select
                  id="program"
                  label="Select"
                  name="program"
                  value={formData.program}
                  onChange={(value) => handleChange("program", value)}
                >
                  <Option value="BTECH">BTech</Option>
                  <Option value="MTECH">MTech</Option>
                  <Option value="DUAL DEGREE">Dual Degree</Option>
                  <Option value="PHD">PHD</Option>
                </Select>
              </div>
              <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                <div className="flex mr-2 w-full md:w-72 justify-end">
                  <label htmlFor="fatherOrSpouseName">Father's/Spouse's Name</label>:
                </div>
                <Input
                  id="fatherOrSpouseName"
                  size="md"
                  label="Father's Name"
                  name="fatherOrSpouseName"
                  value={formData.fatherOrSpouseName}
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
    <Toaster position="top-center" richColors/>
    </>
  );
}
