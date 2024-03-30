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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";

export default function AddScheduleForm() {
  const navigate = useNavigate();
  
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({
    name: "",
    role: "",
    department: "",
  });
  
  const [formData, setFormData] = useState({
    day: "",
    shift: "",
  });

  const handleStaffChange = (selectedStaff) => {
    // console.log("selectedstaff : ", selectedStaff);
    setSelectedStaff(selectedStaff);
    // setFormData((prevData) => ({
    //   ...prevData,
    //   staff: selectedStaff.value
    // }));
  };

  const fetchStaffList = async () => {
    try {
      const response = await axios.get(apiRoutes.staff);
      const staffList = response.data.data; 

      // console.log("staffList : ", staffList);
      setStaff(staffList);
    } catch (error) {
      console.error(`ERROR (fetch-staff-add-schedule): ${error?.response?.data?.message}`);
      toast.error(error?.response?.data?.message || 'Failed to fetch Staff List');
    }
  };

  useEffect(() => {
    fetchStaffList();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("selected staff : ", selectedStaff);
    
    const data = {
      staffId: selectedStaff.value.id,
      day: formData.day,
      shift: formData.shift,
    };

    try {
      const response = await axios.post(apiRoutes.schedule, data);
      const resData = response.data;
      
      if (resData.ok) {
        console.log("Schedule added successfully");
        toast.success(resData.message); 
        setTimeout(() => {
          navigate("/schedule");
        }, 1000);
      } else {
        console.log("Adding Schedule Failed : ", response?.data?.data?.message);
        toast.error(response?.data?.data?.message); 
      }
    } catch (err) {
      console.log(`ERROR (add-schedule): ${err?.response?.data?.data?.message}`);
      toast.error(err?.response?.data?.data?.message); 
    }
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
                  Staff Name <span className="text-red-800">*</span>:
                </label>
              </div>
              <Select
                id="staff"
                options={staff.map((staffPerson) => ({
                  value: staffPerson, 
                  label: staffPerson.name,
                }))}
                name="staff"
                value={selectedStaff}
                onChange={handleStaffChange}
                isClearable={true}
                placeholder="Select Staff"
                className="w-full"
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
                <label htmlFor="role">
                  Role:
                </label>
              </div>
              <Input
                id="role"
                size="md"
                disabled
                name="role"
                label="Role"
                value={selectedStaff?.value?.role || "Role"}
                // onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            {selectedStaff?.value?.role === "DOCTOR" && <div className="flex-col md:flex md:flex-row items-center justify-around p-1">
              <div className="flex mr-2 md:w-72 w-full justify-end">
                <label htmlFor="department">
                  Department:
                </label>
              </div>
              <Input
                id="department"
                size="md"
                disabled
                name="department"
                label="Department"
                value={selectedStaff.value.department}
                // onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>}
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
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
