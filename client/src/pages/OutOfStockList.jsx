import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import {toast} from 'sonner';
import axios from "axios";
import {
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";
import MockData from "../assets/MOCK_DATA_outofstock.json";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";

const TABLE_HEAD = {
  id: "#",
  medicineName: "Medicine Name",
  category: "Category",
  inQuantity: "In Quantity",
};

const getOutStockData = async () => {
  try {
    const response = await axios.get(apiRoutes.stock+"/out", {withCredentials: true});
    toast.success('Out of Stock List fetched successfully');
    console.log(response);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch out of stock data.");
    console.error(`ERROR (get-out-of-stock): ${error?.response?.data?.message}`);
  }
}



export default function OutOfStock() {
  const [outOfStock, setOutOfStock] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await getOutStockData();
      setOutOfStock(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleStockDelete = () => {};

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Out of Stock"
            data={outOfStock}
            detail="See information about out of stock medicines."
            text=""
			      handleDelete={handleStockDelete}
            searchKey="medicineName"
            actionFlag="false"
          />
        </Layout>
      )}
    </>
  );
}
