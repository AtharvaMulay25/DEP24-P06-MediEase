import React from "react";
import { SideTopBar } from "../components/SideTopBar";
import {AddMedicineForm} from "../components/AddMedicineForm";
import Layout from "../layouts/PageLayout";
const AddMedicine = () => {
  return (
    <>    
      <Layout>
        <AddMedicineForm />
      </Layout>
    </>
  );
};

export default AddMedicine;
