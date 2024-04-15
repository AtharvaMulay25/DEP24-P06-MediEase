import React, { useState, useEffect } from "react";
import Select from "react-select";
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
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import { SyncLoadingScreen } from "./UI/LoadingScreen";
import Layout from "../layouts/PageLayout";

export default function UpdateScheduleForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({
    email: "",
    name: "",
    role: "",
    department: "",
    staffId: "",
  });

  const [formData, setFormData] = useState({
    day: "",
    shift: "",
  });

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiRoutes.schedule}/${id}`, {
          withCredentials: true,
        });
        const resData = response.data;
        if (resData.ok) {
          const { data } = resData;
          console.log("fetched schedule: ", data);

          setSelectedStaff({
            email: data.email,
            name: data.name,
            role: data.role,
            department: data.department,
            staffId: data.staffId,
          });

          setFormData({
            day: data.day,
            shift: data.shift,
          });

          console.log("Schedule details fetched successfully");
        } else {
          console.log("ERROR (fetch-schedule-details): ", resData.error);
        }
      } catch (error) {
        console.error(
          `ERROR (fetch-schedule-details): ${error?.response?.data?.message}`
        );
        toast.error(
          error?.response?.data?.message || "Failed to fetch Schedule details"
        );
      }
      setLoading(false);
    };

    fetchScheduleDetails();
  }, []);

  const handleChange = (name, value) => {
    // console.log(e.target);
    // const { name, value } = e.target;
    // console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log("selected staff : ", selectedStaff);

    const data = {
      email: selectedStaff.email || "",
      //email is being passed just to show correct error validation (in case of empty staff email field)
      staffId: selectedStaff.staffId || "",
      day: formData.day,
      shift: formData.shift,
    };
    // console.log("sendData: ", data);
    try {
      const response = await axios.put(`${apiRoutes.schedule}/${id}`, data, {
        withCredentials: true,
      });
      const resData = response.data;

      console.log("Schedule updated successfully");
      // console.log(response);
      toast.success(resData.message);
      setTimeout(() => {
        navigate("/schedule");
      }, 1000);
    } catch (err) {
      console.log(`ERROR (update-schedule): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <Card className="h-max w-full">
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none pb-3"
            >
              <div className="mb-2 sm:flex sm:flex-row flex-col items-center justify-between gap-8">
                <div>
                  <div className="flex flex-row items-center justify-between gap-8">
                    <Typography variant="h5" color="blue-gray">
                      Update Schedule For Staff
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
                    Update Schedule
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
              <form onSubmit={handleUpdate} className="flex flex-wrap gap-6">
                <div className="grid  sm:grid-cols-2 gap-y-8 gap-x-4 w-full">
                  <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                    <div className="flex mr-4 md:w-72 w-full justify-end">
                      <label htmlFor="email">
                        Staff Email <span className="text-red-800">*</span>:
                      </label>
                    </div>
                    <Input
                      id="email"
                      size="md"
                      label="Email"
                      className="w-full"
                      name="email"
                      value={selectedStaff.email}
                      disabled
                    />
                    {/* <Input
                                id="doctorName"
                                size="md"
                                label="Doctor Name"
                                className="w-full"
                                name="doctorName"
                                value={formData.doctorName}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            /> */}
                  </div>
                  <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                    <div className="flex mr-2 md:w-72 w-full justify-end">
                      <label htmlFor="name">Name:</label>
                    </div>
                    <Input
                      id="name"
                      size="md"
                      disabled
                      name="name"
                      label="Name"
                      value={selectedStaff.name || ""}
                      // onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  </div>
                  <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                    <div className="flex mr-2 md:w-72 w-full justify-end">
                      <label htmlFor="role">Role:</label>
                    </div>
                    <Input
                      id="role"
                      size="md"
                      disabled
                      name="role"
                      label="Role"
                      value={selectedStaff.role || ""}
                      // onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  </div>
                  {selectedStaff.role === "DOCTOR" && (
                    <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                      <div className="flex mr-2 md:w-72 w-full justify-end">
                        <label htmlFor="department">Department:</label>
                      </div>
                      <Input
                        id="department"
                        size="md"
                        disabled
                        name="department"
                        label="Department"
                        value={selectedStaff.department}
                        // onChange={(e) => handleChange(e.target.name, e.target.value)}
                      />
                    </div>
                  )}
                  <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
                    <div className="flex mr-2 w-full md:w-72 justify-end">
                      <label htmlFor="day">
                        Day <span className="text-red-800">*</span>:
                      </label>
                    </div>
                    <MaterialSelect
                      id="day"
                      label="Select Day"
                      name="day"
                      value={formData.day}
                      onChange={(value) => handleChange("day", value)}
                    >
                      <Option value="MONDAY">Monday</Option>
                      <Option value="TUESDAY">Tuesday</Option>
                      <Option value="WEDNESDAY">Wednesday</Option>
                      <Option value="THURSDAY">Thursday</Option>
                      <Option value="FRIDAY">Friday</Option>
                      <Option value="SATURDAY">Saturday</Option>
                      <Option value="SUNDAY">Sunday</Option>
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
                      <Option value="MORNING">Morning</Option>
                      <Option value="AFTERNOON">Afternoon</Option>
                      <Option value="NIGHT">Night</Option>
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
                  onClick={handleUpdate}
                >
                  Save
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Layout>
      )}
    </>
  );
}
