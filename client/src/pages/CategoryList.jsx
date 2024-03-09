import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  name: "Category Name",
  strengthType: "Strength Type",
  action: "Action"
};

const  getCategoriesData = async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/medicine/category/list");
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

import MOCK_DATA from "../assets/MOCK_DATA_category.json";
import Layout from "../layouts/PageLayout";
export default function CategoryList() {
 const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategoriesData();
            // console.log("data out", data);
            setCategories(data);
            setLoading(false);
        };
        fetchData();
    }, []);

  return (
    <>
      {loading && <SyncLoadingScreen />}
      {!loading && (
        <Layout>
          <SortableTable
            tableHead={TABLE_HEAD}
            title="Category List"
            data={categories || MOCK_DATA}
            detail="See information about all medicines categories."
            text="Add Category"
            addLink="/medicine/category/add_category"
          />
        </Layout>
      )}
    </>
  );
}
