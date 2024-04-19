import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import {toast} from 'sonner';
import axios from "axios";
import {
  SyncLoadingScreen,
} from "../components/UI/LoadingScreen";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = {
  id: "#",
  invoiceNo: "Invoice No",
  supplierName: "Supplier",
  purchaseDate: "Date",
  details: "Details",
  action: "Action",
};

const getPurchaseData = async () => {
  try {
    const response = await axios.get(apiRoutes.purchase, {
      withCredentials: true
    });
    console.log("response", response.data.data)
    toast.success('Purchase List fetched successfully')
    return response.data.data;
  } catch (error) {
    console.error(`ERROR (get-purchase-list): ${error?.response?.data?.message}`);
    toast.error('Failed to fetch Purchase List')
  }
};
// import MockData from "../assets/MOCK_DATA_purchase.json";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";
export default function PurchaseList() {
  const navigate = useNavigate();
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
      const res = await axios.delete(`${apiRoutes.purchase}/${id}`, {
        withCredentials: true
      });

      const { data } = res;
      console.log(data)
      if (data?.ok) {
        console.log(`MESSAGE : ${data?.message}`);
        toast.success(data?.message);
        setPurchase((prev) => prev.filter(p => p.id !== id));
      } else {
        // TODO: show an error message
        console.log(`ERROR (purchase_list_delete): ${data.message}`);
      }
    }
     catch (err) {
      console.error(`ERROR (purchase_list_delete): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message || 'Failed to delete Purchase');
    }
  };

  const handlePurchaseDetail = async(e, id, idx) => {
    console.log("Purchase Detail", id);
    navigate(`/purchase/${id}`);
  }

  const handlePurchaseUpdate = (id) => {
    console.log("id : ", id);
    if (id) navigate(`/purchase/update/${id}`);
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
            addLink="/purchase/add"
			      handleDelete={handlePurchaseDelete}
            searchKey="supplierName"
            handleDetail={handlePurchaseDetail}
            handleUpdate={handlePurchaseUpdate}
            detailsFlag={true}
          />
        </Layout>
      )}
    </>
  );
}
