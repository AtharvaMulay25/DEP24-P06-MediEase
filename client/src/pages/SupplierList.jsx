import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import { toast } from 'sonner';
import axios from "axios";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = {
  id: "#",
  name: "Supplier Name",
  mobileNumber: "Phone Number",
  email: "Email",
  city: "City",
  state: "State",
  address: "Address",
  pinCode: "Pincode",
  action: "Action",
};

const getSuppliersData = async () => {
  try {
    const response = await axios.get(apiRoutes.supplier, {
      withCredentials: true
    });
    toast.success('Supplier List fetched successfully')
    return response.data.data;
  } catch (error) {
    console.error(`ERROR (get-supplier-list): ${error?.response?.data?.message}`);
    toast.error('Failed to fetch Supplier List')
  }
}

// import MockData from "../assets/MOCK_DATA_supplier.json";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";
export default function SupplierList() {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSuppliersData();
      // console.log("data out", data);
      setSuppliers(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSupplierUpdate = (id) => {
    console.log("id : ", id);
    if (id) navigate(`/supplier/update/${id}`);
  };

  const handleSupplierDelete = async (e, id) => {
    try {
      const res = await axios.delete(`${apiRoutes.supplier}/${id}`, {
        withCredentials: true
      });

      const { data } = res;

      if (data?.ok) {
        console.log(`MESSAGE : ${data?.message}`);
        toast.success(data?.message)
          ; setSuppliers((prev) => prev.filter(p => p.id !== id));
      } else {
        // TODO: show an error message
        console.log(`ERROR (supplier_list_delete): ${data.message}`);
      }
    } catch (err) {
      console.error(`ERROR (supplier_list_delete): ${err?.response?.data?.message}`);
      toast.error(err?.response?.data?.message || 'Failed to delete Supplier');
    }
  };

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading &&
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Supplier List"
            data={suppliers}
            detail="See information about all suppliers."
            text="Add Supplier"
            addLink="/supplier/add"
            handleDelete={handleSupplierDelete}
            handleUpdate={handleSupplierUpdate}
            searchKey="name"
          />
        </Layout>
      }
    </>
  );
}
