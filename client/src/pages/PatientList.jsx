import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  name: "Name",
  department: "Department",
  age: "Age",
  email: "Email",
  dob: "DOB",
  bloodGroup: "Blood Group",
  category: "Category",
  program: "Program",
  fatherOrSpouseName: "Father/Spouse",
  gender: "Gender",
  action: "Action",
};

const getPatientsData = async()=>
{
  try {
    const response = await axios.get(apiRoutes.patient);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(`ERROR (get-patient-list): ${error?.response?.data?.message}`);
  }
}

// import MockData from "../assets/MOCK_DATA_patient.json";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchPatientList = async () => {      
        const data = await getPatientsData();
        setPatients(data);
        setLoading(false);      
    };
    fetchPatientList();
  }, []);

  const handlePatientDelete = async (e, id) => {
    try {
      const res = await axios.delete(`${apiRoutes.patient}/${id}`);
      if (res) {
        const data = res?.data;
        if (data && data.ok) {
          setPatients((prev) => prev.filter(p => p.id !== id));
          console.log("backend message : ", data.message);
        } else {
          console.log(`ERROR (get-patient-list): ${data?.message || "NO DATA"}`);
        }
      }
    } catch (err) {
        console.error(`ERROR (delete-patient): ${err?.response?.data?.message}`);
    } 
  };
  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Patient List"
            data={patients}
            detail="See information about all patients."
            text="Add Patient"
            addLink="/patient/add"
            handleDelete={handlePatientDelete}
            searchKey="name"
          />
        </Layout>
      )}
    </>
  );
}
