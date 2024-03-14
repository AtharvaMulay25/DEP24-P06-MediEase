import { SortableTable } from "../components/SortableTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen";

const TABLE_HEAD = {
  id: "#",
  categoryName: "Category Name",
  strengthType: "Strength Type",
  action: "Action"
};

const  getCategoriesData = async () => {
    try {
        const response = await axios.get(apiRoutes.category);
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

import MOCK_DATA from "../assets/MOCK_DATA_category.json";
import Layout from "../layouts/PageLayout";
import { apiRoutes } from "../utils/apiRoutes";
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

    const handleCategoryDelete = async(e, id) => {
      try {
        const res = await axios.delete(`${apiRoutes.category}/${id}`);

        console.log("res : ", res); 
  
        const { data } = res;
        
        if (data?.ok) {
          console.log(`MESSAGE : ${data?.message}`);
          setCategories((prev) => prev.filter(p => p.id !== id));
        } else {
          // TODO: show an error message
          console.log(`ERROR (category_list_delete): ${data.message}`);
        }
      } catch (err) {
        console.error(`ERROR (category_list_delete): ${err.message}`);
      }
    };

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
            addLink="/medicine/category/add"
            searchKey={"categoryName"}
            handleDelete={handleCategoryDelete}
          />
        </Layout>
      )}
    </>
  );
}
