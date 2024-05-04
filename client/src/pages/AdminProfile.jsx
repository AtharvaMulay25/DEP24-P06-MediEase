import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

import DialogBox from "../components/DialogBox";
import Layout from "../layouts/PageLayout";
import { useAuthContext } from "../hooks/useAuthContext";
import { apiRoutes } from "../utils/apiRoutes";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import { useLogout } from "../hooks/useLogout";

const getAdminData = async (userEmail) => {
  try {
    const response = await axios.get(
      `${apiRoutes.profile}/admin/${userEmail}`,
      {
        withCredentials: true,
      }
    );


    toast.success("Admin profile fetched successfully");
    return response.data.data;
  } catch (error) {
    console.error(`ERROR: ${error?.response?.data?.message}`);
    toast.error(
      error?.response?.data?.message || "Failed to fetch Admin Profile"
    );
  }
};

export default function AdminProfile({ edit = false }) {
  const { userEmail } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { logout } = useLogout();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(false);

  const [adminDetail, setAdminDetail] = useState({
    name: "John Doe",
    role: "Admin",
    email: "john@gmail.com",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      if (userEmail) {
        setLoading(true);
        const data = await getAdminData(userEmail);

        const adminData = {
          name: data.name,
          role: data.role,
          email: data.email,
        };

        setAdminDetail(adminData);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [page, edit]);

	const handleSave = async () => {
		try {
			setLoading(true);
      console.log(adminDetail);
			const response = await axios.put(
				`${apiRoutes.profile}/admin/${userEmail}`,
				adminDetail,
				{
					withCredentials: true,
				}
			);
			toast.success(response.data.message);
      setPage(!page);
			navigate("/profile/admin");
		} catch (error) {
			console.error(`ERROR: ${error?.response?.data?.message}`);
			toast.error(
				error?.response?.data?.message || "Failed to update Admin Profile"
			);
		}
		setLoading(false);
	};

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${apiRoutes.profile}/admin/${userEmail}`, {
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

  const [radius, setRadius] = useState(1);
  
  useEffect(() => {
    const id = setInterval(() => {
      setRadius((prev) => prev+10);
    }, 1000);

    return () => {
      clearInterval(id);
    }  
  }, []);
  
  const radiusStyle = {

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
                {edit && "Update"} Admin Profile
              </Typography>
            </CardHeader>
            <CardBody className="flex justify-center">
            <div
              className={`border border-black m-10 rounded-full h-[11] w-[${radius}px]`}
              style={radiusStyle}
            >
              {radius}
            </div>
              <div className="flex flex-col sm:w-2/5 w-full min-w-fit justify-center gap-8 p-4 border border-blue-gray-100">
                <div className="flex justify-center">
                  <img
                    src="/src/assets/img/patient.png"
                    alt="admin"
                    className="rounded-full w-48 h-48 "
                  />
                </div>
                <div className="content-center text-center grid sm:grid-cols-2 gap-y-3">
                  <Typography
                    variant="h6"
                    className="text-start sm:text-center"
                  >
                    Name{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <input
                      placeholder="Full Name"
                      className="px-2 py-1 border border-blue-gray-200 rounded-md"
                      value={adminDetail.name}
                      onChange={(e) =>
                        setAdminDetail({ ...adminDetail, name: e.target.value })
                      }
                    />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
                      {adminDetail.name || "-"}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    className="text-start sm:text-center"
                  >
                    Email{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <Input disabled value={adminDetail.email} />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
                      {adminDetail.email || "-"}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    className="text-start sm:text-center"
                  >
                    Role{edit && <span className="text-red-800">*</span>}:{" "}
                  </Typography>
                  {edit ? (
                    <Input disabled value={adminDetail.role} />
                  ) : (
                    <Typography color="blue-gray" className="text-start">
                      {adminDetail.role || "-"}
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
                      navigate("/profile/admin/edit");
                    }}
                  >
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <Button
                    className="flex items-center gap-3"
                    size="md"
                    onClick={() => {
                      setPage(!page);
                      navigate("/profile/admin");
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
