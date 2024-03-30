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
};

// const getStockData = async () => {
//   try {
//     const response = await axios.get(apiRoutes.stock);
//     toast.success('Stock List fetched successfully')
//     return response.data.data;
//   } catch (error) {
//     console.error(`ERROR (get-stock-list): ${error?.response?.data?.message}`);
//     toast.error('Failed to fetch Stock List')
//   }
// };

import MockData from "../assets/MOCK_DATA_outofstock.json";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";


export default function OutOfStock() {
  const [stock, setStock] = useState(MockData);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getStockData();
  //     // console.log("data out", data);
  //     setStock(data);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  const handleStockDelete = () => {};

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Out of Stock"
            data={stock}
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
