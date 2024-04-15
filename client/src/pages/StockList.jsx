import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import {toast} from 'sonner';
import axios from "axios";
import {
  GridLoadingScreen,
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  medicineName: "Medicine Name",
  category: "Category",
  inQuantity: "In Quantity",
  outQuantity: "Out Quantity",
  netQuantity: "Stock"
};

const getStockData = async () => {
  try {
    const response = await axios.get(apiRoutes.stock, {
      withCredentials: true
    });
    toast.success('Stock List fetched successfully')
    return response.data.data;
  } catch (error) {
    console.error(`ERROR (get-stock-list): ${error?.response?.data?.message}`);
    toast.error('Failed to fetch Stock List')
  }
};

// import MockData from "../assets/MOCK_DATA_stock.json";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";
export default function StockList() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStockData();
      // console.log("data out", data);
      setStock(data);
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
            title="Stock List"
            data={stock}
            detail="See information about all stock."
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
