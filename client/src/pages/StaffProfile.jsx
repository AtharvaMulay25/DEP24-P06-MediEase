import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import Layout from "../layouts/PageLayout";

export default function StaffProfile() {
  const [staffDetail, setStaffDetail] = useState({
    name: "Dr. John Doe",
    role: "Doctor",
    phoneNumber: "+91 9876543210",
    email: "john@gmail.com",
    gender: "Male",
    department: "General Medicine",
    specialisation: "Surgeon",
    noOfCheckups: 100,
    appointments: 10,
  });

  const [scheduleData, setScheduleData] = useState([
    { day: "Sunday", shift: "Morning" },
    { day: "Monday", shift: "Morning" },
    { day: "Tuesday", shift: "Morning" },
    { day: "Wednesday", shift: "Morning" },
    { day: "Thursday", shift: "Morning" },
    { day: "Friday", shift: "Morning" },
    { day: "Saturday", shift: "Morning" },
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      <Card className="flex w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <Typography variant="h3" color="blue-gray" className="text-center ">
            Staff Profile
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col justify-between md:flex-row gap-y-4">
          <div className="flex flex-col md:w-2/5 w-full min-w-fit justify-center gap-8 p-4 border border-blue-gray-100 ">
            <div className="flex justify-center">
              <img
                src="/src/assets/img/doctor.png"
                alt="staff"
                className="rounded-full w-48 h-48 "
              />
            </div>
            <div className="content-center text-center grid sm:grid-cols-2 gap-y-3">
              <Typography variant="h6" className=" sm:text-center">
                Name:{" "}
              </Typography>
              <Typography color="blue-gray">
                {staffDetail.name}
              </Typography>
              <Typography variant="h6" >
                Role:{" "}
              </Typography>
              <Typography color="blue-gray">
                {staffDetail.role}
              </Typography>
              <Typography variant="h6" >
                Mobile:{" "}
              </Typography>
              <Typography color="blue-gray">
                {staffDetail.phoneNumber}
              </Typography>
              <Typography variant="h6" >
                Email:{" "}
              </Typography>
              <Typography color="blue-gray">
                {staffDetail.email}
              </Typography>
              <Typography variant="h6" >
                Gender:{" "}
              </Typography>
              <Typography color="blue-gray">
                {staffDetail.gender}
              </Typography>
            </div>
          </div>
          <div className="px-4 md:w-1/3 flex flex-col gap-4">
            <div className="flex flex-col border border-blue-gray-100 p-4 w-full rounded-xl text-center">
              <Typography variant="h6" color="gray" className="mb-2">
                Department
              </Typography>
              <Typography variant="h4" color="blue-gray">
                {staffDetail.department}
              </Typography>
            </div>
            <div className="flex flex-col border border-blue-gray-100 p-4 w-full rounded-xl text-center">
              <Typography variant="h6" color="gray" className="mb-2">
                Specialisation
              </Typography>
              <Typography variant="h4" color="blue-gray">
                {staffDetail.specialisation}
              </Typography>
            </div>
            <div className="flex flex-col border border-blue-gray-100 p-4 w-full rounded-xl text-center">
              <Typography variant="h6" color="gray" className="mb-2">
                No. of Checkups
              </Typography>
              <Typography variant="h4" color="blue-gray">
                {staffDetail.noOfCheckups}
              </Typography>
            </div>
            <div className="flex flex-col border border-blue-gray-100 p-4 w-full rounded-xl text-center">
              <Typography variant="h6" color="gray" className="mb-2">
                Today Appointments
              </Typography>
              <Typography variant="h4" color="blue-gray">
                {staffDetail.appointments}
              </Typography>
            </div>
          </div>
          <div className="text-center md:w-1/3">
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 bg-blue-gray-100 rounded p-2 border border-black"
            >
              Working Hours
            </Typography>

            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th
                    key="day"
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Day
                    </Typography>
                  </th>
                  <th
                    key="shift"
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Shift
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((rowData, index) => {
                  return (
                    <tr key={rowData.day}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {rowData.day}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {rowData.shift}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button
            className="flex items-center gap-3"
            size="md"
            onClick={() => {}}
          >
            Edit Profile
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  );
}
