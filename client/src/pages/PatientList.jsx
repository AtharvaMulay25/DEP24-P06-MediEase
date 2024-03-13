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
  fatherOrSpouseName: "Father Name",
  gender: "Gender",
  action: "Action",
};


// import MockData from "../assets/MOCK_DATA_patient.json";
import Layout from "../layouts/PageLayout";

export default function PatientList() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
 
  useEffect(() => {
    // setLoading(true);

    const fetchPatientList = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/patient');
        if (res) {
          const data = res?.data;
          if (data && data.ok) {
            setPatients(data.data);
          } else {
            console.log(`ERROR (get-patient-list): ${data?.message || "NO DATA"}`);
          }
        }
      } catch (err) {
        console.error(`ERROR (get-patient-list): ${err.message}`);
      } 
      
    };
    fetchPatientList();

    setLoading(false);
  }, []);

  const handlePatientDelete = async (e, id) => {
    try {
      const res = await axios.delete('http://localhost:4000/api/patient', {
        data: {
          id
        }
      });
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
        console.error(`ERROR (delete-patient): ${err.message}`);
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
            text=""
            addLink="/patient/add_patient"
            handleDelete={handlePatientDelete}
            searchKey="name"
          />
        </Layout>
      )}
    </>
  );
}
