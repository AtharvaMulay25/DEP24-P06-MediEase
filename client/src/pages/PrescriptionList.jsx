import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  patientName: "Patient Name",
  doctor: "Doctor",
  date: "Date",
  diagnosis: "Diagnosis",
  symptoms: "Symptoms",
  action: "Action",
};

import MockData from "../assets/MOCK_DATA_prescription.json";
import Layout from "../layouts/PageLayout";

export default function PrescriptionList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePrescriptionDelete = async (e, id) => {};
  const handlePrescriptionDetail = async (e, id) => {
    console.log("Prescription Detail", id);
    navigate(`/prescription/${id}`);
  };
  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Prescription List"
            data={MockData}
            detail="See information about all OPDs."
            text="Add Prescription"
            addLink="/prescription/add"
            handleDelete={handlePrescriptionDelete}
            searchKey="patientName"
            handleDetail={handlePrescriptionDetail}
            detailsFlag={true}
          />
        </Layout>
      )}
    </>
  );
}
