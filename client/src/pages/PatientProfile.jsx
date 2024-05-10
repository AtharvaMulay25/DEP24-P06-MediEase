import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import patientImg from "../assets/img/patient.png";
import DialogBox from "../components/DialogBox";
import { useAuthContext } from "../hooks/useAuthContext";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";
import { useLogout } from "../hooks/useLogout";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const getPatientData = async (userEmail) => {
  try {
    const response = await axios.get(
      `${apiRoutes.profile}/patient/${userEmail}`,
      {
        withCredentials: true,
      }
    );

    toast.success("Patient Profile fetched successfully");
    return response.data.data;
  } catch (error) {
    console.error(`ERROR: ${error}`);
    toast.error(
      error?.response?.data?.message || "Failed to fetch Patient Profile"
    );
  }
};

export default function PatientProfile({ edit = false }) {
  const navigate = useNavigate();
  const { userEmail } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { logout } = useLogout();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(false);

  const [patientDetail, setPatientDetail] = useState({
    name: "John Doe",
    category: "Student",
    department: "Computer Science",
    program: "Btech",
    email: "john@gmail.com",
    age: "25",
    gender: "Male",
    bloodGroup: "O+",
    fatherOrSpouseName: "Jane Doe",
    allergy: "None",
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      const data = await getPatientData(userEmail);

      const patientData = {
        name: data.name,
        category: data.category,
        department: data.department,
        program: data.program,
        email: data.email,
        age: data.age,
        gender: data.gender,
        bloodGroup: data.bloodGroup,
        fatherOrSpouseName: data.fatherOrSpouseName,
        allergy: data.allergy,
      };

      setPatientDetail(patientData);
      setLoading(false);
    };

    fetchPatientData();
  }, [page, edit]);

  const handleSave = async () => {
    const sendData = {
      name: patientDetail.name,
      age: parseInt(patientDetail.age),
      email: patientDetail.email,
      bloodGroup: patientDetail.bloodGroup,
      category: patientDetail.category.toUpperCase(),
      gender: patientDetail.gender.toUpperCase(),
      department: patientDetail.department,
      allergy: patientDetail.allergy,
      program: patientDetail.program,
      fatherOrSpouseName: patientDetail.fatherOrSpouseName,
    };

    console.log(sendData);
    try {
      setLoading(true);
      const response = await axios.put(
        `${apiRoutes.profile}/patient/${userEmail}`,
        sendData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      setPage(!page);
      navigate("/profile/patient");
    } catch (error) {
      console.error(`ERROR: ${error?.response?.data?.message}`);
      toast.error(
        error?.response?.data?.message || "Failed to update Patient Profile"
      );
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${apiRoutes.profile}/patient/${userEmail}`,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      if (response) {
        const data = response?.data;
        if (data && data.ok) {
          await logout();
          navigate("/signin");
          console.log(data?.message);
          toast.success(data?.message);
        } else {
          console.log(`ERROR: ${data?.message || "NO DATA"}`);
        }
      }
    } catch (error) {
      console.error(
        `ERROR (delete-profile): ${error?.response?.data?.message}`
      );
      toast.error(error?.response?.data?.message || "Failed to delete Profile");
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <Card className="flex w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <Typography
                variant="h3"
                color="blue-gray"
                className="text-center "
              >
                {edit && "Update "}Patient Profile
              </Typography>
            </CardHeader>
            <CardBody className="flex justify-center">
              <div className="flex flex-col sm:w-2/5 w-full min-w-fit justify-center gap-8 p-4 border border-blue-gray-100">
                <div className="flex justify-center">
                  <img
                    src={patientImg}
                    alt="Patient"
                    className="rounded-full w-48 h-48 "
                  />
                </div>
                <div className="content-center text-center grid sm:grid-cols-2 gap-y-3">
                  <Typography variant="h6">
                    Name{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Full Name"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.name}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.name || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6">
                    Category{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <Input disabled value={patientDetail.category} />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.category || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6">Department: </Typography>
                  {edit ? (
                    <select
                      placeholder="Department"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.department}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          department: e.target.value,
                        })
                      }
                    >
                      <option value="COMPUTER_SCIENCE">Computer Science</option>
                      <option value="ELECTRICAL">Electrical</option>
                      <option value="MECHANICAL">Mechanical</option>
                      <option value="MATHEMATICS_COMPUTING">
                        Mathematics & Computing
                      </option>
                      <option value="CHEMICAL">Chemical</option>
                      <option value="CIVIL">Civil</option>
                      <option value="METALLURGY">Metallurgy</option>
                      <option value="ENGINEERING_PHYSICS">
                        Engineering Physics
                      </option>
                      <option value="PHYSICS">Physics</option>
                      <option value="CHEMISTRY">Chemistry</option>
                      <option value="BIOLOGY">Biology</option>
                      <option value="MATHEMATICS">Mathematics</option>
                      <option value="HUMANITIES">Humanities</option>
                    </select>
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.department || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6">
                    Age{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      type="number"
                      min={1}
                      placeholder="Age"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.age}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          age: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.age || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6">
                    Gender{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <select
                      name="gender"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.gender}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option key="Male" value="MALE">
                        MALE
                      </option>
                      <option key="Female" value="FEMALE">
                        FEMALE
                      </option>
                    </select>
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.gender || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6">Program: </Typography>
                  {edit ? (
                    <select
                      placeholder="Program"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.program}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          program: e.target.value,
                        })
                      }
                    >
                      <option value="BTECH">BTech</option>
                      <option value="MTECH">MTech</option>
                      <option value="DUAL_DEGREE">Dual Degree</option>
                      <option value="PHD">PHD</option>
                    </select>
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.program || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6">
                    Email{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <Input disabled value={patientDetail.email} />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.email || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6">
                    Blood Group{edit && <span className="text-red-800">*</span>}
                    :{" "}
                  </Typography>
                  {edit ? (
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.bloodGroup}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          bloodGroup: e.target.value,
                        })
                      }
                    >
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.bloodGroup || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6">Father's/Spouse's Name: </Typography>
                  {edit ? (
                    <input
                      placeholder="Name"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.fatherOrSpouseName}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          fatherOrSpouseName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.fatherOrSpouseName || "-"}
                    </Typography>
                  )}
                  <Typography variant="h6">Allergies: </Typography>
                  {edit ? (
                    <input
                      placeholder="Allergies"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.allergy}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          allergy: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.allergy || "-"}
                    </Typography>
                  )}
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-end">
              {!edit ? (
                <div className="flex w-full justify-between">
                  <Button
                    className="flex items-center gap-3"
                    color="red"
                    size="md"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    Delete Account
                  </Button>
                  <Button
                    className="flex items-center gap-3"
                    size="md"
                    onClick={() => {
                      setPage(!page);
                      navigate("/profile/patient/edit");
                    }}
                  >
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <div className="flex w-full justify-between">
                  <Button
                    className="flex items-center gap-3"
                    size="md"
                    onClick={() => {
                      setPage(!page);
                      navigate("/profile/patient");
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
