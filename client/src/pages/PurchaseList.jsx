import { SortableTable } from "../components/SortableTable";
import { SideTopBar } from "../components/SideTopBar";

const TABLE_HEAD = {
  id: "#",
  Purchase_id: "Purchase_id",
  Supplier: "Supplier",
  date: "Date",
  total_amount: "Total Amount",
  action: "Action",
};

import MockData from "../assets/MOCK_DATA_purchase.json";
export default function PurchaseList() {
  return (
    <div className="h-screen z-0 flex">
      <SideTopBar />
      <div className="min-w-0 flex-1 w-svh p-4 shadow-md bg-gray-50">
        <SortableTable
          tableHead={TABLE_HEAD}
          title="Purchase List"
          data={MockData}
          detail="See information about all purchases."
          text="Add Purchase"
        />
      </div>
    </div>
  );
}
