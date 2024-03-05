import { SortableTable } from "../components/SortableTable";
import { SideTopBar } from "../components/SideTopBar";

const TABLE_HEAD = {
  id: "#",
  medicine_name: "Medicine Name",
  generic_name: "Generic Name",
  category: "Category",
  quantity: "Quantity",
  action: "Action",
};


import MockData from "../assets/MOCK_DATA_medicine.json";
import Layout from "../layouts/PageLayout";
export default function MedicineList() {
  return (
    <Layout>
      <SortableTable
        tableHead={TABLE_HEAD}
        title="Medicine List"
        data={MockData}
        detail="See information about all medicines."
        text="Add Medicine"
      />
    </Layout>
  );
}
