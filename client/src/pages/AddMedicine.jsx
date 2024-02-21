import React from "react";
import { SideTopBar } from "../components/SideTopBar";
import {AddMedicineForm} from "../components/AddMedicineForm";
const AddMedicine = () => {
  return (
    <>
      <div className="h-screen z-0 flex">
        <div className="mr-20">
        <SideTopBar />
        </div>
        <div className="flex-auto p-4 shadow-md mt-20 bg-gray-50 ">
          <AddMedicineForm />
        </div>
      </div>
    </>
  );
};

export default AddMedicine;
