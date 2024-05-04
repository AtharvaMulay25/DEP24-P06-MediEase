import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import {toast} from 'sonner';
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";

const TABLE_HEAD = {
  id: "#",
  brandName: "Brand Name",
  saltName: "Salt Name",
  batchNo: "Batch No.",
  expiryDate: "Expiry Date",
  quantity: "Quantity",
};

const getExpiredMedicinesData = async () => {
  try {
    const response = await axios.get(apiRoutes.medicine+"/expired", {withCredentials: true});
    toast.success('Expired Medicines List fetched successfully')
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch expired medicines data.");
    console.error(`ERROR (get-expired-medicine-list): ${error?.response?.data?.message}`);
  }
}


export default function ExpiredMedicineList() {
  const [expiredMedicines, setExpiredMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await getExpiredMedicinesData();
      setExpiredMedicines(data);
      setLoading(false);
    };
    fetchData();
  }, []);

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
            defaultSortOrder="expiryDate"
          />
        </Layout>
      )}
    </>
  );
}
