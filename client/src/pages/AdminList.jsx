import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  // name: "Name",
  email: "Email",
  action: "Action",
};

const getAdminData = async () => {
  try {
    const response = await axios.get(apiRoutes.admin);
    console.log(response.data.data);
    toast.success("Admin List fetched successfully");
    return response.data.data;
  } catch (error) {
    console.error(`ERROR (get-admin-list): ${error?.response?.data?.message}`);
    toast.error("Failed to fetch Admin List");
  }
};

import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminList = async () => {
      const data = await getAdminData();
      setAdmins(data);
      setLoading(false);
    };
    fetchAdminList();
  }, []);

  const handleAdminDelete = async (e, id) => {
    try {
      const res = await axios.delete(`${apiRoutes.admin}/${id}`);
      console.log(res);
      if (res) {
        const data = res?.data;
        if (data && data.ok) {
          console.log("backend message : ", data.message);
          toast.success(data?.message);
          setAdmins((prev) => prev.filter((p) => p.id !== id));
        } else {
          console.log(`ERROR (get-admin-list): ${data?.message || "NO DATA"}`);
        }
      }
    } catch (err) {
      console.error(`ERROR (delete-admin): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message || "Failed to delete Admin");
    }
  };
  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Admin List"
            data={admins}
            detail="See information about all admins."
            text="Add Admin"
            addLink="/admin/add"
            handleDelete={handleAdminDelete}
            searchKey="email"
          />
        </Layout>
      )}
    </>
  );
}
