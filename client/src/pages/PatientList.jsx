import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import {
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  name: "Name",
  department: "Department",
  age: "Age",
  email: "Email",
  // dob: "DOB",
  allergy: "Allergy",
  bloodGroup: "Blood Group",
  category: "Category",
  program: "Program",
  fatherOrSpouseName: "Father/Spouse",
  gender: "Gender",
  action: "Action",
};

const getPatientsData = async () => {
  try {
    const response = await axios.get(apiRoutes.patient, {
      withCredentials: true
    });
    console.log(response.data.data);
    toast.success('Patient List fetched successfully')
    return response.data.data;
  } catch (error) {
    console.error(`ERROR (get-patient-list): ${error?.response?.data?.message}`);
    toast.error('Failed to fetch Patient List')
  }
}

import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";

export default function PatientList() {
  const navigate = useNavigate();

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

  const handlePatientUpdate = (id) => {
    console.log("id : ", id);
    if (id) navigate(`/patient/update/${id}`);
  };

  const handlePatientDelete = async (e, id) => {
    try {
      const res = await axios.delete(`${apiRoutes.patient}/${id}`, {
        withCredentials: true
      });
      console.log(res);
      if (res) {
        const data = res?.data;
        if (data && data.ok) {
          console.log("backend message : ", data.message);
          toast.success(data?.message);
          setPatients((prev) => prev.filter(p => p.id !== id));
        } else {
          console.log(`ERROR (get-patient-list): ${data?.message || "NO DATA"}`);
        }
      }
    } catch (err) {
      console.error(`ERROR (delete-patient): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message || 'Failed to delete Patient');

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
            handleUpdate={handlePatientUpdate}
          />
        </Layout>
      )}
    </>
  );
}
