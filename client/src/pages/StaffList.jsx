import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  GridLoadingScreen,
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = {
  id: "#",
  name: "Name",
  role: "Role",
  department: "Department",
  gender: "Gender",
  email: "Email",
  mobileNumber: "Mobile Number",
  action: "Action",
};

const getStaffData = async () => {
  try {
    const response = await axios.get(apiRoutes.staff, {
      withCredentials: true
    });
    console.log("staffs: ", response.data.data);
    toast.success("Staff List fetched successfully");
    return response.data.data;
  } catch (error) {
    console.error(`ERROR (get-staff-list): ${error?.response?.data?.message}`);
    toast.error("Failed to fetch Staff List");
  }
};

import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";

export default function StaffList() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffList = async () => {
      const data = await getStaffData();
      setStaff(data);
      setLoading(false);
    };
    fetchStaffList();
  }, []);

  const handleStaffUpdate = (id) => {
    console.log("id : ", id);
    if (id) navigate(`/staff/update/${id}`);
  };

  const handleStaffDelete = async (e, id) => {
    try {
      const res = await axios.delete(`${apiRoutes.staff}/${id}`, {
        withCredentials: true
      });
      console.log(res);
      if (res) {
        const data = res?.data;
        if (data && data.ok) {
          console.log("backend message : ", data.message);
          toast.success(data?.message);
          setStaff((prev) => prev.filter((p) => p.id !== id));
        } else {
          console.log(`ERROR (get-staff-list): ${data?.message || "NO DATA"}`);
        }
      }
    } catch (err) {
      console.error(`ERROR (delete-staff): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message || "Failed to delete Staff");
    }
  };

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Staff List"
            data={staff}
            detail="See all the staff available."
            text="Add Staff"
            addLink="/staff/add"
            handleDelete={handleStaffDelete}
            handleUpdate={handleStaffUpdate}
            searchKey="name"
          />
        </Layout>
      )}
    </>
  );
}
