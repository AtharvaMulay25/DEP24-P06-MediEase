import { SortableTable } from "../components/SortableTable";
import { useState , useEffect} from "react";
import axios from "axios";
import { GridLoadingScreen } from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  name: "Medicine Name",
  genericName: "Generic Name",
  brandName: "Brand Name",
  category: "Category",
  action: "Action",
};

const getMedicinesData = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/medicine/list");
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

import MockData from "../assets/MOCK_DATA_medicine.json";
import Layout from "../layouts/PageLayout";
export default function MedicineList() {

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMedicinesData();
      // console.log("data out", data);
      setMedicines(data);
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
        title="Medicine List"
        data={medicines}
        detail="See information about all medicines."
        text="Add Medicine"
        addLink="/medicine/add_medicine"
      />
}
    </Layout>
  );
}
