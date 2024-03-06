import { SortableTable } from "../components/SortableTable";

const TABLE_HEAD = {
  id: "#",
  medicineName: "Medicine Name",
  category: "Category",
  inQuantity: "In Quantity",
  outQuantity: "Out Quantity",
  netQuantity: "Stock",
	action: "Action",
};

import MockData from "../assets/MOCK_DATA_stock.json";
import Layout from "../layouts/PageLayout";
export default function StockList() {
  return (
		<Layout>
			<SortableTable
				tableHead={TABLE_HEAD}
				title="Stock List"
				data={MockData}
				detail="See information about all stock."
				text=""
			/>
		</Layout>
  );
}
