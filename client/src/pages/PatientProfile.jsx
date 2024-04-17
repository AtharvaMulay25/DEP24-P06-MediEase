import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  CardFooter,
  Button,
} from "@material-tailwind/react";

import { useAuthContext } from "../hooks/useAuthContext";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const getPatientData = async (userEmail) => {
	try{
		const response = await axios.get(`${apiRoutes.profile}/patient/${userEmail}`, {
			withCredentials: true
		});

		toast.success('Patient Profile fetched successfully');
		return response.data.data;
	} catch (error) {
		console.error(`ERROR: ${error?.response?.data?.message}`);
		toast.error(error?.response?.data?.message || 'Failed to fetch Patient Profile');
	}
};

export default function PatientProfile({ edit = false }) {
  const navigate = useNavigate();
  const {userEmail} = useAuthContext();	
  const [loading, setLoading] = useState(false);

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
    allergies: "None",
  });

	useEffect(() => {
		const fetchPatientData = async () => {
      setLoading(true);
			const data = await getPatientData(userEmail);

			const patientData = {
				name: data.name || "",
				category: data.category || "",
				department: data.department,
				program: data.program || "",
				email: data.email,
				age: data.age,
				gender: data.gender,
				bloodGroup: data.bloodGroup,
				fatherOrSpouseName: data.fatherOrSpouseName || "",
				allergies: data.allergy || "",
			}

			setPatientDetail(patientData);
			setLoading(false);
		}

		fetchPatientData();
	} ,[]);

  const handleSave = async () => {

    const sendData = {
      name: patientDetail.name,
      age: parseInt(patientDetail.age),
      email: patientDetail.email,
      bloodGroup: patientDetail.bloodGroup,
      category: patientDetail.category.toUpperCase(),
      gender: patientDetail.gender.toUpperCase(),
    };
    if(patientDetail.department) sendData.department = patientDetail.department;
    if(patientDetail.allergy) sendData.allergy = patientDetail.allergy;
    if(patientDetail.program) sendData.program = patientDetail.program;
    if(patientDetail.fatherOrSpouseName) sendData.fatherOrSpouseName = patientDetail.fatherOrSpouseName;
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
      navigate("/profile/patient");
    } catch (error) {
      console.error(`ERROR: ${error?.response?.data?.message}`);
      toast.error(error?.response?.data?.message || 'Failed to update Patient Profile');
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
                    src="/src/assets/img/patient.png"
                    alt="Patient"
                    className="rounded-full w-48 h-48 "
                  />
                </div>
                <div className="content-center text-center grid sm:grid-cols-2 gap-y-3">
                  <Typography
                    variant="h6"
                  >
                    Name<span className="text-red-800">*</span>:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Full Name"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.name}
                      onChange={(e) =>
                        setPatientDetail({ ...patientDetail, name: e.target.value })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.name}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                  >
                    Category<span className="text-red-800">*</span>:{" "}
                  </Typography>
                  {edit ? (
                    <Input disabled value={patientDetail.category} />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.category}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                  >
                    Department:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Department"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.department}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          department: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.department}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                  >
                    Age<span className="text-red-800">*</span>:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      type="number"
                      min={1}
                      placeholder="Age"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.age}
                      onChange={(e) =>
                        setPatientDetail({ ...patientDetail, age: e.target.value })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.age}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                  >
                    Gender<span className="text-red-800">*</span>:{" "}
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
                      <option key="Male" value="MALE">MALE</option>
                      <option key="Female" value="FEMALE">FEMALE</option>
                    </select>
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.gender}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                  >
                    Program:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Program"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.program}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          program: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.program}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                  >
                    Email<span className="text-red-800">*</span>:{" "}
                  </Typography>
                  {edit ? (
                    <Input disabled value={patientDetail.email} />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.email}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                  >
                    Blood Group<span className="text-red-800">*</span>:{" "}
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
                      {patientDetail.bloodGroup}
                    </Typography>
                  )}
                  {edit && (
                    <>
                      <Typography
                        variant="h6"
                      >
                        Father's/Spouse's Name:{" "}
                      </Typography>
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
                    </>
                  )}
                  {patientDetail.fatherOrSpouseName !== "" && !edit && (
                    <>
                      <Typography
                        variant="h6"
                      >
                        Father's/Spouse's Name:{" "}
                      </Typography>
                      <Typography color="blue-gray">
                        {patientDetail.fatherOrSpouseName}
                      </Typography>
                    </>
                  )}
                  <Typography
                    variant="h6"
                  >
                    Allergies:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Allergies"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.allergies}
                      onChange={(e) =>
                        setPatientDetail({
                          ...patientDetail,
                          allergies: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray">
                      {patientDetail.allergies}
                    </Typography>
                  )}
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-end">
							{!edit ? (
								<Button
									className="flex items-center gap-3"
									size="md"
									onClick={() => {navigate("/profile/patient/edit")}}
								>
									Edit Profile
								</Button>
							) : (
                <div className="flex w-full justify-between">
                  <Button
                    className="flex items-center gap-3"
                    size="md"
                    onClick={() => {navigate("/profile/patient")}}
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
          </Card>
        </Layout>
      )}
    </>
  );
}
