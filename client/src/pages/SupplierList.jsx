import { SortableTable } from "../components/SortableTable";
import { useState , useEffect} from "react";
import axios from "axios";
import { GridLoadingScreen } from "../components/UI/LoadingScreen";

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
    const response = await axios.get("http://localhost:4000/api/supplier/list");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

import MockData from "../assets/MOCK_DATA_supplier.json";
import Layout from "../layouts/PageLayout";
export default function SupplierList() {

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
  return (
    <Layout>
      {loading && <GridLoadingScreen />}
      {!loading &&
      <SortableTable
        tableHead={TABLE_HEAD}
        title="Supplier List"
        data={suppliers}
        detail="See information about all suppliers."
        text="Add Supplier"
        addLink="/supplier/add_supplier"
      />
}
    </Layout>
  );
}
