import { SortableTable } from "../components/SortableTable";
import { SideTopBar } from "../components/SideTopBar";

const TABLE_HEAD = {
  id: "#",
  supplier_name: "Supplier Name",
  phone_number: "Phone Number",
  email: "Email",
  city: "City",
  state: "State",
  address: "Address",
  pincode: "Pincode",
  action: "Action",
};

import MockData from "../assets/MOCK_DATA_supplier.json";
import Layout from "../layouts/PageLayout";
export default function SupplierList() {
  return (
    <Layout>
      <SortableTable
        tableHead={TABLE_HEAD}
        title="Supplier List"
        data={MockData}
        detail="See information about all suppliers."
        text="Add Supplier"
      />
    </Layout>
  );
}
