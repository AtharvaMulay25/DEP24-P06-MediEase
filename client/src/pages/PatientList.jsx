import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  GridLoadingScreen,
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
	fatherName: "Father Name",
	gender: "Gender",
	action: "Action",
};


import MockData from "../assets/MOCK_DATA_patient.json";
import Layout from "../layouts/PageLayout";

export default function PatientList() {
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getPurchaseData();
  //     // console.log("data out", data);
  //     setPurchase(data);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  const handlePatientDelete = async(e, id) => {

  };
  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Patient List"
            data={MockData}
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
