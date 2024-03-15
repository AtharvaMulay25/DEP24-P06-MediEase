import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  GridLoadingScreen,
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  patientName: "Patient Name",
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

export default function PrescriptionList() {
  const [loading, setLoading] = useState(false);

  const handlePrescriptionDelete = async (e, id) => {};
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
            addLink="/prescription/add_prescription"
            handleDelete={handlePrescriptionDelete}
            searchKey="patientName"
          />
        </Layout>
      )}
    </>
  );
}
