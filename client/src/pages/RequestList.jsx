import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import Layout from "../layouts/PageLayout";
import MockData from "../assets/MOCK_DATA_requests.json";
import { apiRoutes } from "../utils/apiRoutes";
const TABLE_HEAD = {
  id: "#",
  name: "Name",
  email: "Email",
  role: "Role",
  action: "Action",
};

const getRequestsData = async () => {
  try {
    const response = await axios.get(apiRoutes.requests);
    console.log(response.data.data);
    toast.success("Request List fetched successfully");
    return response.data.data;
  } catch (error) {
    console.error(`ERROR (get-request-list): ${error?.response?.data?.message}`);
    toast.error(error?.response?.data?.message || "Failed to fetch Request List");
  }
}
export default function RequestList() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getRequestsData();
      setRequests(data);
      setLoading(false);
    };
    fetchRequests();
  }, []);


  const handleRequestApprove = async (e, id) => {
    try {
      const reqData = {id};
      const res = await axios.post(`${apiRoutes.mail}/approve`,reqData);
      console.log(res);
      const { data } = res;
      console.log(data);
      toast.success(data.message);
    }
    catch (err) {
      console.error(`ERROR (request-approve): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message || 'Failed to approve request');
    }
  };

    const handleRequestReject = async (e, id) => {
      try {
        const reqData = {id};
        const res = await axios.post(`${apiRoutes.mail}/reject`,reqData);
        const { data } = res;
        console.log(data);
        toast.success(data.message);
      }
      catch (err) {
        console.error(`ERROR (request-reject): ${err?.response?.data?.message}`);
        toast.error(err?.response?.data?.message || 'Failed to reject request');
      }
    }; 



  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
      <Layout>
        <SortableTable
          tableHead={TABLE_HEAD}
          title="Pending Request List"
          data={requests}
          text=""
          detail="See latest signup requests."
          handleApprove={handleRequestApprove}
          handleReject={handleRequestReject}
            // handleDelete={handlePurchaseDelete}
          searchKey="name"
        />
      </Layout>
       )} 
    </>
  );
}
