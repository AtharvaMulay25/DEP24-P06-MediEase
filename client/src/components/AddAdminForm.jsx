import React, { useEffect, useState } from "react";
import {
  CardBody,
  Input,
  Card,
  CardHeader,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
export default function AddAdminForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
  });

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
      name: formData.adminName,
      email: formData.email,
      role: "ADMIN",
    };

    try {
      const res = await axios.post(apiRoutes.admin, sendData, {
        withCredentials: true
      });
      console.log("res : ", res);

      const data = res?.data;
      if (data && data?.ok) {
        console.log("admin record saved successfully");
        toast.success("Admin added successfully");
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        console.error(
          `ERROR (create-admin-record): ${data?.message || "NO-DATA"}`
        );
        toast.error(error?.response?.data?.message || "Failed to add Admin");
      }
    } catch (error) {
      console.error(
        `ERROR (create-admin-record): ${error?.response?.data?.message}`
      );
    }
  };
  return (
    <Card className="h-max w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-3">
        <div className="mb-2 sm:flex sm:flex-row flex-col items-center justify-between gap-8">
          <div>
            <div className="flex flex-row items-center justify-between gap-8">
              <Typography variant="h5" color="blue-gray">
                Admin Form
              </Typography>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:hidden">
                <Button
                  className="flex items-center gap-3"
                  size="md"
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  Admin List
                </Button>
              </div>
            </div>
            <Typography color="gray" className="mt-1 font-normal">
              Add new admin.
            </Typography>
          </div>
          <div className="hidden sm:flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="md"
              onClick={() => {
                navigate("/admin");
              }}
            >
              Admin List
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
          <div className="grid md:grid-cols-2 gap-y-8 gap-x-4 w-full">
            <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-4 w-full md:w-72 justify-end">
                <label htmlFor="adminName">
                  Full Name <span className="text-red-800">*</span>:
                </label>
              </div>
              <Input
                id="adminName"
                size="md"
                label="Full Name"
                className="w-full"
                name="adminName"
                value={formData.adminName}
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
                value={formData.email}
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
