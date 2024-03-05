import { SortableTable } from "../components/SortableTable";
import { SideTopBar } from "../components/SideTopBar";

const TABLE_HEAD = {
  id: "#",
  Supplier: "Supplier",
  date: "Date",
  total_amount: "Total Amount",
  action: "Action",
};

import MockData from "../assets/MOCK_DATA_purchase.json";
import Layout from "../layouts/PageLayout";
export default function PurchaseList() {
  return (
		<Layout>
			<SortableTable
				tableHead={TABLE_HEAD}
				title="Purchase List"
				data={MockData}
				detail="See information about all purchases."
				text="Add Purchase"
			/>
		</Layout>
  );
}
