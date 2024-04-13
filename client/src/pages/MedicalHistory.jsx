import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  doctor: "Doctor",
  date: "Date",
  temperature: "Temperature",
  bloodPressure: "Blood Pressure",
  diagnosis: "Diagnosis",
  symptoms: "Symptoms",
  action: "Action",
};

import MockData from "../assets/MOCK_DATA_prescription.json";
import Layout from "../layouts/PageLayout";

const getMedicalHistory = async (email) => {
  try {
    const response = await axios.get(`${apiRoutes.checkup}?patientEmail=${email}`);
    console.log("response", response.data.data);
    toast.success("Medical History fetched successfully");
    return response.data.data;
  } catch (error) {
    console.error(
      `ERROR (get-medical-history): ${error?.response?.data?.message}`
    );
    toast.error("Failed to fetch Medical History");
  }
};

export default function MedicalHistory() {
  const navigate = useNavigate();
  const { userRole, userName, userEmail } = useAuthContext();
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

  const handleHistoryDelete = async (e, id) => {
    try {
      const res = await axios.delete(`${apiRoutes.checkup}/${id}`);
      const { data } = res;

      if (data?.ok) {
        console.log(`MESSAGE : ${data?.message}`);
        toast.success(data?.message);
        setHistory((prev) => prev.filter((p) => p.id !== id));
      } else {
        // TODO: show an error message
        console.log(`ERROR (history_list_delete): ${data.message}`);
        toast.error("Failed to delete history data");
      }
    } catch (err) {
      console.error(
        `ERROR (history_list_delete): ${err?.response?.data?.message}`
      );
    }
  };
  const handleHistoryDetail = async (e, id, idx) => {
    console.log("Checkup Detail", id);
    navigate(`/history/${id}^${idx}`);
  };
  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Medical History"
            data={MockData}
            detail="See your medical history."
            text=""
            handleDelete={handleMedicalHistoryDelete}
            searchKey="doctor"
          />
        </Layout>
      )}
    </>
  );
}
