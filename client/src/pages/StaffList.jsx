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
  role: "Role",
  department: "Department",
  gender: "Gender",
  email: "Email",
  mobileNumber: "Mobile Number",
  action: "Action",
};

import MockData from "../assets/MOCK_DATA_staff.json";
import Layout from "../layouts/PageLayout";

export default function StaffList() {
  //   const [loading, setLoading] = useState(true);
  return (
    <>
      {/* {loading && <SyncLoadingScreen />} */}
      {/* {!loading && ( */}
      <Layout>
        <SortableTable
          tableHead={TABLE_HEAD}
          title="Staff List"
          data={MockData}
          detail="See all the staff available."
          text="Add Staff"
          addLink="/staff/add"
          searchKey="name"
        />
      </Layout>
      {/* )} */}
    </>
  );
}
