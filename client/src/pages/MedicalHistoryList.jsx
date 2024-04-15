import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { apiRoutes } from "../utils/apiRoutes";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import { useAuthContext } from "../hooks/useAuthContext";

const TABLE_HEAD = {
  id: "#",
  doctorName: "Doctor",
  staffName: "Paramedical Staff",
  date: "Date",
  diagnosis: "Diagnosis",
  symptoms: "Symptoms",
  action: "Action",
};

import Layout from "../layouts/PageLayout";

const getMedicalHistory = async (email) => {
  try {
    const response = await axios.get(`${apiRoutes.checkup}/patient/${email}`, {
      withCredentials: true,
    });
    console.log("response", response.data.data);
    toast.success("Medical History fetched successfully");
    return response.data.data;
  } catch (error) {
    console.error(
      `ERROR (get-medical-history): ${error?.response?.data?.message}`
    );
    toast.error(error?.response?.data?.message || "Failed to fetch Medical History");
  }
};

export default function MedicalHistory() {
  const navigate = useNavigate();
  const { userEmail } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMedicalHistory(userEmail);
      // console.log("data out", data);
      setHistory(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleHistoryDelete = async (e, id) => {};
  const handleHistoryDetail = async (e, id, idx) => {
    console.log("History Detail", id);
    navigate(`/prescription/${id}^${idx}`);
  };
  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Medical History List"
            data={history}
            detail="See information about all previous checkups."
            text=""
            addLink=""
            handleDelete={handleHistoryDelete}
            searchKey="doctorName"
            handleDetail={handleHistoryDetail}
            detailsFlag={true}
          />
        </Layout>
      )}
    </>
  );
}
