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

export default function MedicalHistory() {
  const [loading, setLoading] = useState(false);

  const handleMedicalHistoryDelete = async (e, id) => {};
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
