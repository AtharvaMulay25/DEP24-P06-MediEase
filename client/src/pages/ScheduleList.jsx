import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  GridLoadingScreen,
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  day: "Day",
  shift: "Shift",
  name: "Doctor Name",
  department: "Department",
  email: "Email",
  action: "Action",
};

import MockData from "../assets/MOCK_DATA_schedule.json";
import Layout from "../layouts/PageLayout";

export default function ScheduleList() {
  //   const [loading, setLoading] = useState(true);
  return (
    <>
      {/* {loading && <SyncLoadingScreen />} */}
      {/* {!loading && ( */}
      <Layout>
        <SortableTable
          tableHead={TABLE_HEAD}
          title="Schedule"
          data={MockData}
          detail="See the current schedule of all doctors."
          text="Add Schedule"
          addLink="/schedule/add"
          searchKey="day"
        />
      </Layout>
      {/* )} */}
    </>
  );
}
