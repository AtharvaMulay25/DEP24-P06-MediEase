import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  brandName: "Brand Name",
  saltName: "Salt Name",
  categoryName: "Category",
  action: "Action",
};

const getMedicinesData = async () => {
  try {
    const response = await axios.get(apiRoutes.medicine);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(`ERROR (get-medicine-list): ${error?.response?.data?.message}`);
  }
};

// import MockData from "../assets/MOCK_DATA_medicine.json";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";
export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMedicinesData();
      // console.log("data out", data);
      setMedicines(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleMedicineDelete = async(e, id) => {
    try {
      const res = await axios.delete(`${apiRoutes.medicine}/${id}`);

      const { data } = res;
      
      if (data?.ok) {
        console.log(`MESSAGE : ${data?.message}`);
        setMedicines((prev) => prev.filter(p => p.id !== id));
      } else {
        // TODO: show an error message
        console.log(`ERROR (medicine_list_delete): ${data.message}`);
      }
    } catch (err) {
      console.error(`ERROR (medicine_list_delete): ${err?.response?.data?.message}`);
    }
  };

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Medicine List"
            data={medicines}
            detail="See information about all medicines."
            text="Add Medicine"
            addLink="/medicine/add"
            handleDelete={handleMedicineDelete}
            searchKey={"brandName"}
          />
        </Layout>
      )}
    </>
  );
}
