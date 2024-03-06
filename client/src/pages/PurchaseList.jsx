import { SortableTable } from "../components/SortableTable";
import { useState , useEffect} from "react";
import axios from "axios";

const TABLE_HEAD = {
  id: "#",
  supplierName: "Supplier",
  purchaseDate: "Date",
  totalAmount: "Total Amount",
  action: "Action",
};

const getPurchaseData = async () => {
	  try {
	const response = await axios.get("http://localhost:4000/api/purchase/list");
	return response.data.data;
  } catch (error) {
	console.error(error);
  }
};
import MockData from "../assets/MOCK_DATA_purchase.json";
import Layout from "../layouts/PageLayout";
export default function PurchaseList() {
	  const [purchase, setPurchase] = useState([]);
	  const [loading, setLoading] = useState(true);
	  useEffect(() => {
	const fetchData = async () => {
		const data = await getPurchaseData();
		console.log("data out", data);
		setPurchase(data);
		setLoading(false);
	}
	fetchData();
  }, []);
  return (
		<Layout>
			{loading && <p>Loading...</p>}	
			{!loading &&
			<SortableTable
				tableHead={TABLE_HEAD}
				title="Purchase List"
				data={purchase}
				detail="See information about all purchases."
				text="Add Purchase"
				addLink="/purchase/add_purchase"
			/>
}
		</Layout>
  );
}
