import React from "react";
import { SideTopBar } from "../components/SideTopBar";
import {AddMedicineForm} from "../components/AddMedicineForm";
const AddMedicine = () => {
  return (
    <>
      <div className="h-screen z-0 flex">
        <div>
        <SideTopBar />
        </div>
        <div className="flex-auto p-4 shadow-md bg-gray-50">
					<AddMedicineForm />
				</div>
      </div>
    </>
  );
};

export default AddMedicine;
