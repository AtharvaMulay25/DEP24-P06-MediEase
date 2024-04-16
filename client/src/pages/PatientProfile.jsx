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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const getPatientData = async (userEmail) => {
	try{
		const response = await axios.get(`${apiRoutes.profile}/patient/${userEmail}`, {
			withCredentials: true
		});

		console.log(response.data.data);
		toast.success('Patient Profile fetched successfully');
		return response.data.data;
	} catch (error) {
		console.error(`ERROR (get-profile-patient): ${error?.response?.data?.message}`);
		toast.error(error?.response?.data?.message || 'Failed to fetch Patient Profile');
	}
};

export default function PatientProfile({ edit = false }) {
  const navigate = useNavigate();
  const {userEmail} = useAuthContext();	

	const [patientDetail, setPatientDetail] = useState({
    name: "John Doe",
    category: "Student",
    department: "Computer Science",
    program: "Btech",
    email: "john@gmail.com",
    age: "25",
    gender: "Male",
    bloodGroup: "O+",
    relativeName: "Jane Doe",
    allergies: "None",
  });
  const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPatientData = async () => {
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
				relativeName: data.fatherOrSpouseName,
				allergies: data.allergy
			}

			setPatientDetail(patientData);
			setLoading(false);
		}

		fetchPatientData();
	} ,[]);

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
                Patient Profile
              </Typography>
            </CardHeader>
            <CardBody className="flex justify-center">
              <div className="flex flex-col sm:w-2/5 w-full min-w-fit justify-center gap-8 p-4 border border-blue-gray-100">
                <div className="flex justify-center">
                  <img
                    src="/src/assets/img/patient.png"
                    alt="staff"
                    className="rounded-full w-48 h-48 "
                  />
                </div>
                <div className="content-center text-center grid sm:grid-cols-2 gap-y-3">
                  <Typography
                    variant="h6"
                    className="text-start sm:text-center"
                  >
                    Name:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Full Name"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.name}
                      onChange={(e) =>
                        setStaffDetail({ ...patientDetail, name: e.target.value })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
                      {patientDetail.name}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    className=" text-start sm:text-center"
                  >
                    Category:{" "}
                  </Typography>
                  {edit ? (
                    <Input disabled value={patientDetail.category} />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
                      {patientDetail.category}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    className=" text-start sm:text-center"
                  >
                    Department:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Department"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.department}
                      onChange={(e) =>
                        setStaffDetail({
                          ...patientDetail,
                          department: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
                      {patientDetail.department}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    className=" text-start sm:text-center"
                  >
                    Age:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      type="number"
                      min={1}
                      placeholder="Age"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.age}
                      onChange={(e) =>
                        setStaffDetail({ ...patientDetail, age: e.target.value })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
                      {patientDetail.age}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    className=" text-start sm:text-center"
                  >
                    Gender:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Gender"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.gender}
                      onChange={(e) =>
                        setStaffDetail({
                          ...patientDetail,
                          gender: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
                      {patientDetail.gender}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    className=" text-start sm:text-center"
                  >
                    Program:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Program"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.program}
                      onChange={(e) =>
                        setStaffDetail({
                          ...patientDetail,
                          program: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
                      {patientDetail.program}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    className=" text-start sm:text-center"
                  >
                    Email:{" "}
                  </Typography>
                  {edit ? (
                    <Input disabled value={patientDetail.email} />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
                      {patientDetail.email}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    className=" text-start sm:text-center"
                  >
                    Blood Group:{" "}
                  </Typography>
                  {edit ? (
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.bloodGroup}
                      onChange={(e) =>
                        setStaffDetail({
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
                    <Typography color="blue-gray" className="text-start">
                      {patientDetail.bloodGroup}
                    </Typography>
                  )}
                  {edit && (
                    <>
                      <Typography
                        variant="h6"
                        className=" text-start sm:text-center"
                      >
                        Father's/Spouse's Name:{" "}
                      </Typography>
                      <input
                        placeholder="Name"
                        className="px-2 py-1 border border-blue-gray-200 rounded-md"
                        value={patientDetail.relativeName}
                        onChange={(e) =>
                          setStaffDetail({
                            ...patientDetail,
                            relativeName: e.target.value,
                          })
                        }
                      />
                    </>
                  )}
                  {patientDetail.relativeName !== "" && !edit && (
                    <>
                      <Typography
                        variant="h6"
                        className=" text-start sm:text-center"
                      >
                        Father's/Spouse's Name:{" "}
                      </Typography>
                      <Typography color="blue-gray" className="text-start">
                        {patientDetail.relativeName}
                      </Typography>
                    </>
                  )}
                  <Typography
                    variant="h6"
                    className=" text-start sm:text-center"
                  >
                    Allergies:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Allergies"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={patientDetail.allergies}
                      onChange={(e) =>
                        setStaffDetail({
                          ...patientDetail,
                          allergies: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
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
								<Button
									className="flex items-center gap-3"
									size="md"
									onClick={() => {handleSave()}}
								>
									Save
								</Button>
							)}
            </CardFooter>
          </Card>
        </Layout>
      )}
    </>
  );
}
