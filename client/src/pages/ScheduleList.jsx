import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  day: "Day",
  shift: "Shift",
  name: "Staff Name",
  department: "Department",
  email: "Email",
  action: "Action",
};

// import MockData from "../assets/MOCK_DATA_schedule.json";
import Layout from "../layouts/PageLayout";
import { toast } from "sonner";
import { apiRoutes } from "../utils/apiRoutes";

const getScheduleData = async () => {
  try {
    const response = await axios.get(apiRoutes.schedule);
    console.log("response : ", response);
    toast.success("Schedule List fetched successfully");
    return response.data.data;
  } catch (error) {
    console.log("ERROR : ", error);
    console.error(
      `ERROR (get-schedule-list): ${error?.response?.data?.message}`
    );
    toast.error("Failed to fetch Schedule List");
  }
};

export default function ScheduleList() {
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScheduleData();
      console.log("data : ", data);
      setSchedules(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleScheduleDelete = async (e, id) => {
    try {
      const res = await axios.delete(`${apiRoutes.schedule}/${id}`);
      const { data } = res;

      if (data?.ok) {
        console.log(`Schedule deleted successfully`);
        toast.success(data?.message);

        setSchedules((prev) => prev.filter((p) => p.id !== id));
      } else {
        console.log(`ERROR (schedule_list_delete): ${data.message}`);
        toast.error(
          "Failed to delete Schedule Category"
        );
      }
    } catch (err) {
      console.error(
        `ERROR (schedule_list_delete): ${err?.response?.data?.message}`
      );
    }
  };

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
      <Layout>
        <SortableTable
          tableHead={TABLE_HEAD}
          title="Schedule"
          data={schedules}
          detail="See the current schedule of staff."
          text="Add Schedule"
          addLink="/schedule/add"
          searchKey="day"
          handleDelete={handleScheduleDelete}
        />
      </Layout>
      )}
    </>
  );
}
