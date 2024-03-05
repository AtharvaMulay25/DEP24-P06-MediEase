import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import PharmaDashboard from "./pages/PharmaDashboard";
import AddMedicine from "./pages/AddMedicine";
import MedicineList from "./pages/MedicineList";
import PurchaseList from "./pages/PurchaseList";
import AddSupplier from "./pages/AddSupplier";
import SupplierList from "./pages/SupplierList";
import Pagination from "./components/Pagination";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/pharmadashboard" element={<PharmaDashboard />} />
          <Route path="/medicine/add_medicine" element={<AddMedicine />} />
          <Route path="/medicine/list" element={<MedicineList />} />
          <Route path="/purchase/list" element={<PurchaseList />} />
          <Route path="/supplier/add_supplier" element={<AddSupplier />} />
          <Route path="/supplier/list" element={<SupplierList />} />
          <Route path="/pagination" element={<Pagination />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
