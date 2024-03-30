import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";
import { setToastTimeout } from "../utils/customTimeout";
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
    console.error(
      `ERROR (get-request-list): ${error?.response?.data?.message}`
    );
    toast.error(
      error?.response?.data?.message || "Failed to fetch Request List"
    );
  }
};
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


  const sendRejectMail = async (id) => {
    try {
      const reqData = { id };
      const res = await axios.post(`${apiRoutes.mail}/reject`, reqData);
      setToastTimeout("success", res.data.message, 1000);
    } catch (err) {
      console.error(
        `ERROR (send-reject-mail): ${err?.response?.data?.message}`
      );
      setToastTimeout(
        "error",
        err?.response?.data?.message || "Failed to send reject mail",
        1000
      );
    }
  };
  const sendApproveMail = async (id) => {
    try {
      const reqData = { id };
      const res = await axios.post(`${apiRoutes.mail}/approve`, reqData);
      setToastTimeout("success", res.data.message, 1000);
    } catch (err) {
      console.error(
        `ERROR (send-approve-mail): ${err?.response?.data?.message}`
      );
      setToastTimeout("error", err?.response?.data?.message || "Failed to send approve mail", 1000);
    }
  }
  const handleRequestReject = async (e, id) => {
    setLoading(true);
    await sendRejectMail(id);
    setRequests((prev) => prev.filter((p) => p.id !== id));
    setLoading(false);
  };
  const handleRequestApprove = async (e, id) => {
    setLoading(true);
    await sendApproveMail(id);
    setRequests((prev) => prev.filter((p) => p.id !== id));
    setLoading(false);
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
