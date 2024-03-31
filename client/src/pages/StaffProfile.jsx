import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Layout from "../layouts/PageLayout";

export default function StaffProfile() {
  const [staffDetail, setStaffDetail] = useState({
    name: "Dr. John Doe",
    role: "Doctor",
    department: "General Medicine",
    phoneNumber: "+91 9876543210",
    email: "john@gmail.com",
    address: "123, ABC Street, XYZ City",
  });

	const [scheduleData, setScheduleData] = useState([
		{ day: "Sunday", shift: "9:00 AM - 5:00 PM" },
		{ day: "Monday", shift: "9:00 AM - 5:00 PM" },
		{ day: "Tuesday", shift: "9:00 AM - 5:00 PM" },
		{ day: "Wednesday", shift: "9:00 AM - 5:00 PM" },
		{ day: "Thursday", shift: "9:00 AM - 5:00 PM" },
		{ day: "Friday", shift: "9:00 AM - 5:00 PM" },
		{ day: "Saturday", shift: "9:00 AM - 5:00 PM" },
	]);
  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      <Typography variant="h3" color="blue-gray" className="text-center">
        Staff Profile
      </Typography>
      <div className="flex gap-3">
        <Card className="flex w-full">
          <CardBody className="flex justify-evenly">
            <img
              src="https://via.placeholder.com/150"
              alt="staff"
              className="rounded-full w-48 h-48"
            />
            <div className="content-center text-center grid grid-cols-2 gap-2">
              <Typography variant="h6" className="text-end">
                Name:{" "}
              </Typography>
              <Typography color="blue-gray" className="text-start pl-2">
                {staffDetail.name}
              </Typography>
              <Typography variant="h6" className="text-end">
                Designation:{" "}
              </Typography>
              <Typography color="blue-gray" className="text-start pl-2">
                {staffDetail.role}
              </Typography>
              <Typography variant="h6" className="text-end">
                Department:{" "}
              </Typography>
              <Typography color="blue-gray" className="text-start pl-2">
                {staffDetail.department}
              </Typography>
              <Typography variant="h6" className="text-end">
                Mobile:{" "}
              </Typography>
              <Typography color="blue-gray" className="text-start pl-2">
                {staffDetail.phoneNumber}
              </Typography>
              <Typography variant="h6" className="text-end">
                Email:{" "}
              </Typography>
              <Typography color="blue-gray" className="text-start pl-2">
                {staffDetail.email}
              </Typography>
              <Typography variant="h6" className="text-end">
                Address:{" "}
              </Typography>
              <Typography color="blue-gray" className="text-start pl-2">
                {staffDetail.address}
              </Typography>
            </div>
          </CardBody>
        </Card>
        <Card className="flex w-1/2">
          <CardBody className="text-center">
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
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
