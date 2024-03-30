import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import {toast} from 'sonner';

const TABLE_HEAD = {
  id: "#",
  brandName: "Medicine Name (Brand)",
  saltName: "Salt Name",
  category: "Category",
};

// const getMedicinesData = async () => {
//   try {
//     const response = await axios.get(apiRoutes.medicine);
//     // console.log(response.data.data);
//     toast.success('Medicine List fetched successfully')
//     return response.data.data;
//   } catch (error) {
//     console.error(`ERROR (get-medicine-list): ${error?.response?.data?.message}`);
//     toast.error(error?.response?.data?.message || 'Failed to fetch Medicine List')
//   }
// };

import MockData from "../assets/MOCK_DATA_expired.json";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";

export default function ExpiredMedicineList() {
  const [expiredMedicines, setExpiredMedicines] = useState(MockData);
  const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getMedicinesData();
//       // console.log("data out", data);
//       setMedicines(data);
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

  const handleMedicineDelete = () => {};

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Expired Medicines"
            data={expiredMedicines}
            detail="See information about all expired medicines."
            text=""
            addLink=""
            handleDelete={handleMedicineDelete}
            searchKey={"brandName"}
            actionFlag="false"
          />
        </Layout>
      )}
    </>
  );
}
