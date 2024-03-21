import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import Layout from "../layouts/PageLayout";
import MockData from "../assets/MOCK_DATA_requests.json";

const TABLE_HEAD = {
  id: "#",
  name: "Name",
  email: "Email",
  role: "Role",
  action: "Action",
};

export default function RequestList() {
  // const getPurchaseData = async () => {
  //   try {
  //     const response = await axios.get(apiRoutes.purchase);
  //     console.log("response", response.data.data)
  //     toast.success('Purchase List fetched successfully')
  //     return response.data.data;
  //   } catch (error) {
  //     console.error(`ERROR (get-purchase-list): ${error?.response?.data?.message}`);
  //     toast.error('Failed to fetch Purchase List')
  //   }
  // };
  // import Layout from "../layouts/PageLayout";
  // import { apiRoutes } from "../utils/apiRoutes";
  // export default function PurchaseList() {
  //   const [purchase, setPurchase] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await getPurchaseData();
  //       // console.log("data out", data);
  //       setPurchase(data);
  //       setLoading(false);
  //     };
  //     fetchData();
  //   }, []);

  //   const handlePurchaseDelete = async(e, id) => {
  //     try {
  //       const res = await axios.delete(`${apiRoutes.purchase}/${id}`);

  //       const { data } = res;
  //       console.log(data)
  //       if (data?.ok) {
  //         console.log(`MESSAGE : ${data?.message}`);
  //         toast.success(data?.message);
  //         setPurchase((prev) => prev.filter(p => p.id !== id));
  //       } else {
  //         // TODO: show an error message
  //         console.log(`ERROR (purchase_list_delete): ${data.message}`);
  //       }
  //     }
  //      catch (err) {
  //       console.error(`ERROR (purchase_list_delete): ${err?.response?.data?.message}`);
  //       toast.error(err?.response?.data?.message || 'Failed to delete Purchase');
  //     }
  //   };

  return (
    <>
      {/* {loading && <SyncLoadingScreen />} */}
      {/* {!loading && ( */}
      <Layout>
        <SortableTable
          tableHead={TABLE_HEAD}
          title="Pending Request List"
          data={MockData}
          text=""
          detail="See latest signup requests."
          //   handleDelete={handlePurchaseDelete}
          searchKey="name"
        />
      </Layout>
      {/* )} */}
    </>
  );
}
