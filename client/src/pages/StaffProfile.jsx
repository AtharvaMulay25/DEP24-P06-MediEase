import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";

import DialogBox from "../components/DialogBox";
import Layout from "../layouts/PageLayout";
import { useAuthContext } from "../hooks/useAuthContext";
import { apiRoutes } from "../utils/apiRoutes";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import { useLogout } from "../hooks/useLogout";

const DEPARTMENTS = ["AYURVEDIC", "GYNECOLOGY", "HOMEOPATHY", "OTHERS"];
const DAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

const getStaffData = async (userEmail) => {
  try {
    const response = await axios.get(`${apiRoutes.profile}/staff/${userEmail}`, {
      withCredentials: true,
    });

    toast.success("Staff profile fetched successfully");
    return response.data.data;
  } catch (error) {
    console.error(`ERROR: ${error?.response?.data?.message}`);
    toast.error(error?.response?.data?.message || "Failed to fetch Staff Profile");
  }
};

const getScheduleData = async (userEmail) => {
  try {
    const response = await axios.get(`${apiRoutes.profile}/staff/schedule/${userEmail}`, {
      withCredentials: true,
    });

    toast.success("Schedule fetched successfully");
    return response.data.data;
  } catch (error) {
    console.error(`ERROR: ${error?.response?.data?.message}`);
    toast.error(error?.response?.data?.message || "Failed to fetch Schedule");
  }
};

export default function StaffProfile({ edit = false }) {
  const { userEmail } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { logout } = useLogout();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(false);

  const [staffDetail, setStaffDetail] = useState({
    name: "-",
    role: "-",
    mobileNumber: "-",
    email: "-",
    gender: "-",
    department: "-",
    speciality: "-",
    checkupCount: "-",
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

  useEffect(() => {
    const fetchStaffData = async () => {
      if (userEmail) {
        setLoading(true);
        const data = await getStaffData(userEmail);

        const staffData = {
          name: data.name,
          role: data.role,
          email: data.email,
          mobileNumber: data.mobileNumber,
          gender: data.gender,
          department: data.department,
          speciality: data.speciality,
          checkupCount: data.checkupCount,
        };

        {edit ? setStaffDetail(data) : setStaffDetail(staffData)}

        const schedule = await getScheduleData(userEmail);

        const scheduleData = DAYS.map((day) => {
          const daySchedule = schedule.find((item) => item.day === day);
          return {
            day,
            shift: daySchedule ? daySchedule.shift : "-",
          };
        });
        setScheduleData(scheduleData);
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [page, edit]);

  const handleSave = async () => {
    const sendData = {
      name: staffDetail.name,
      email: staffDetail.email,
      role: staffDetail.role,
      gender: staffDetail.gender,
      mobileNumber: staffDetail.mobileNumber,
      department: staffDetail.department,
      speciality: staffDetail.speciality,
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `${apiRoutes.profile}/staff/${userEmail}`,
        sendData,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setPage(!page);
      navigate("/profile/staff");
    } catch (error) {
      console.error(`ERROR: ${error?.response?.data?.message}`);
      toast.error(
        error?.response?.data?.message || "Failed to update Staff Profile"
      );
    }
    setLoading(false);
  }

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${apiRoutes.profile}/staff/${userEmail}`, {
        withCredentials: true
      });

      console.log(response);
      if(response) {
        const data = response?.data;
        if(data && data.ok) {
          await logout();
          navigate("/signin");
          console.log(data?.message);
          toast.success(data?.message);
        } else {
          console.log(`ERROR: ${data?.message || "NO DATA"}`)
        }
      }
    } catch (error) {
      console.error(`ERROR (delete-profile): ${error?.response?.data?.message}`);
      toast.error(error?.response?.data?.message || 'Failed to delete Profile');
    }
    setLoading(false);
  }

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <Card className="flex w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <Typography variant="h3" color="blue-gray" className="text-center ">
                {edit && "Update"} Staff Profile
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col justify-center md:flex-row gap-y-4">
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
                    Name{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Full Name"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={staffDetail.name}
                      onChange={(e) =>
                        setStaffDetail({ ...staffDetail, name: e.target.value })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {staffDetail.name || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6" >
                    Role{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <Input disabled value={staffDetail.role} />
                  ) : (
                    <Typography color="blue-gray">
                      {staffDetail.role || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6" >
                    Mobile Number:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Mobile"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={staffDetail.mobileNumber}
                      onChange={(e) =>
                        setStaffDetail({ ...staffDetail, mobileNumber: e.target.value })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {staffDetail.mobileNumber || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6" >
                    Email{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <Input disabled value={staffDetail.email} />
                  ) : (
                    <Typography color="blue-gray">
                      {staffDetail.email || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6" >
                    Gender{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <select
                      name="gender"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={staffDetail.gender}
                      onChange={(e) =>
                        setStaffDetail({
                          ...staffDetail,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option key="Male" value="MALE">MALE</option>
                      <option key="Female" value="FEMALE">FEMALE</option>
                    </select>
                  ) : (
                    <Typography color="blue-gray">
                      {staffDetail.gender || "-"}
                    </Typography>
                  )}
                  {edit && (
                    <>
                      <Typography variant="h6" >
                        Department:{" "}
                      </Typography>
                      <select
                        name="department"
                        className="px-2 py-1 border border-blue-gray-200 rounded-md"
                        value={staffDetail.department}
                        onChange={(e) =>
                          setStaffDetail({
                            ...staffDetail,
                            department: e.target.value,
                          })
                        }
                      >
                        {DEPARTMENTS.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                      <Typography variant="h6" >
                        Specialisation:{" "}
                      </Typography>
                      <input
                        placeholder="Specialisation"
                        className="px-2 py-1 border border-blue-gray-200 rounded-md"
                        value={staffDetail.speciality}
                        onChange={(e) =>
                          setStaffDetail({ ...staffDetail, speciality: e.target.value })
                        }
                      />
                    </>
                  )}
                </div>
              </div>
              { !edit && (
              <>
                <div className="px-4 md:w-1/3 flex flex-col justify-around gap-4">
                  <div className="flex flex-col border border-blue-gray-100 p-4 w-full rounded-xl text-center">
                    <Typography variant="h6" color="gray" className="mb-2">
                      Department
                    </Typography>
                    <Typography variant="h4" color="blue-gray">
                      {staffDetail.department || "-"}
                    </Typography>
                  </div>
                  <div className="flex flex-col border border-blue-gray-100 p-4 w-full rounded-xl text-center">
                    <Typography variant="h6" color="gray" className="mb-2">
                      Specialisation
                    </Typography>
                    <Typography variant="h4" color="blue-gray">
                      {staffDetail.speciality || "-"}
                    </Typography>
                  </div>
                  <div className="flex flex-col border border-blue-gray-100 p-4 w-full rounded-xl text-center">
                    <Typography variant="h6" color="gray" className="mb-2">
                      No. of Checkups
                    </Typography>
                    <Typography variant="h4" color="blue-gray">
                      {staffDetail.checkupCount || "-"}
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
              </>
              )}
            </CardBody>
            <CardFooter className="flex justify-end">
              {edit ? (
                <div className="flex w-full justify-between">
                  <Button
                    className="flex items-center gap-3"
                    size="md"
                    onClick={() => {
                      setPage(!page);
                      navigate("/profile/staff");
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex items-center gap-3"
                    size="md"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex w-full justify-between">
                  <Button
                    className="flex items-center gap-3"
                    color="red"
                    size="md"
                    onClick={() => {setOpen(!open)}}
                  >
                    Delete Account
                  </Button>
                  <Button
                    className="flex items-center gap-3"
                    size="md"
                    onClick={() => {
                      setPage(!page);
                      navigate("/profile/staff/edit");
                    }}
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
            </CardFooter>
            <DialogBox
              title="Account"
              open={open}
              setOpen={setOpen}
              handleDelete={handleDelete}
            />
          </Card>
        </Layout>
      )}
    </>
  );
}
