import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  GridLoadingScreen,
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  invoiceNo: "Invoice No",
  supplierName: "Supplier",
  purchaseDate: "Date",
  details: "Details",
  purchaseItems: "Medicines",
  action: "Action",
};

const getPurchaseData = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/purchase");
    console.log("response", response.data.data)
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
import MockData from "../assets/MOCK_DATA_purchase.json";
import Layout from "../layouts/PageLayout";
export default function PurchaseList() {
  const [purchase, setPurchase] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPurchaseData();
      // console.log("data out", data);
      setPurchase(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handlePurchaseDelete = async(e, id) => {
    try {
      const res = await axios.delete("http://localhost:4000/api/purchase" + "/" + id);

      const { data } = res;
      console.log(data)
      if (data?.ok) {
        console.log(`MESSAGE : ${data?.message}`);
        setPurchase((prev) => prev.filter(p => p.id !== id));
      } else {
        // TODO: show an error message
        console.log(`ERROR (purchase_list_delete): ${data.message}`);
      }
    }
     catch (err) {
      console.error(`ERROR (purchase_list_delete): ${err.message}`);
    }
  };
  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Purchase List"
            data={purchase}
            detail="See information about all purchases."
            text="Add Purchase"
            addLink="/purchase/add_purchase"
			      handleDelete={handlePurchaseDelete}
            searchKey="supplierName"
          />
        </Layout>
      )}
    </>
  );
}
