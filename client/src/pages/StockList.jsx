import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
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
  netQuantity: "Stock",
  action: "Action",
};

const getStockData = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/stock/list");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

import MockData from "../assets/MOCK_DATA_stock.json";
import Layout from "../layouts/PageLayout";
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

  const handleStockDelete = async(e, id) => {
    try {
      const res = await axios.delete("http://localhost:4000/api/stock/delete", {
        data: { id }
      });

      const { data } = res;
      
      if (data?.ok) {
        console.log(`MESSAGE : ${data?.message}`);
        setStock((prev) => prev.filter(p => p.id !== id));
      } else {
        // TODO: show an error message
        console.log(`ERROR (stock_list_delete): ${data.message}`);
      }
    } catch (err) {
      console.error(`ERROR (stock_list_delete): ${err.message}`);
    }
  };

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
          />
        </Layout>
      )}
    </>
  );
}
