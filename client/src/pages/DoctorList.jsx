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
  gender: "Gender",
  email: "Email",
  mobileNumber: "Mobile Number",
  action: "Action",
};

import MockData from "../assets/MOCK_DATA_doctor.json";
import Layout from "../layouts/PageLayout";

export default function DoctorList() {
  //   const [loading, setLoading] = useState(true);
  return (
    <>
      {/* {loading && <SyncLoadingScreen />} */}
      {/* {!loading && ( */}
      <Layout>
        <SortableTable
          tableHead={TABLE_HEAD}
          title="Doctor List"
          data={MockData}
          detail="See all the doctors available."
          text="Add Doctor"
          addLink="/doctor/add"
          searchKey="name"
        />
      </Layout>
      {/* )} */}
    </>
  );
}
