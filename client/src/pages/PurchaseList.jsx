import { SortableTable } from "../components/SortableTable";
import { useState , useEffect} from "react";
import axios from "axios";
import { GridLoadingScreen } from "../components/UI/LoadingScreen";

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
			// console.log("data out", data);
			setPurchase(data);
			setLoading(false);
	    }
		fetchData();
    }, []);

    const handlePurchaseDelete = async(e, id) => {
		try {
            const res = await axios.delete("http://localhost:4000/api/purchase/delete", {
				data: { id }
			});

			const { data } = res; 
			
			if (data?.ok) {
				setPurchase((prev) => prev.filter(p => p.id !== id));
			    console.log(`MESSAGE : ${data?.message}`);
			} else {
				// TODO: show an error message
				console.log(`ERROR (purchase_list_delete): ${data.message}`);
			}
		} catch (err) {
            console.error(`ERROR (purchase_list_delete): ${err.message}`);
			return false;
		}
	}; 

    return (
		<Layout>
			{loading && <GridLoadingScreen />}	
			{!loading &&
			<SortableTable
				tableHead={TABLE_HEAD}
				title="Purchase List"
				data={purchase}
				detail="See information about all purchases."
				text="Add Purchase"
				addLink="/purchase/add_purchase"
                handleDelete={handlePurchaseDelete} 
			/>
}
		</Layout>
  );
}
