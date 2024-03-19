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
import StockList from "./pages/StockList";
import AddPurchase from "./pages/AddPurchase";
import AddCategory from "./pages/AddCategory";
import CategoryList from "./pages/CategoryList";
import DoctorDashboard from "./pages/DoctorDashboard";
import { AddPatient } from "./pages/AddPatient";
import PatientList from "./pages/PatientList";
import AddPrescription from "./pages/AddPrescription";
import ScheduleList from "./pages/ScheduleList";
import AddSchedule from "./pages/AddSchedule";
import StaffList from "./pages/StaffList";
import AddStaff from "./pages/AddStaff";
import PrescriptionList from "./pages/PrescriptionList";
import CompleteProfilePatient from "./pages/CompleteProfilePatient";
import CompleteProfileStaff from "./pages/CompleteProfileStaff";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/pharmadashboard" element={<PharmaDashboard />} />
          <Route path="/medicine/add" element={<AddMedicine />} />
          <Route path="/medicine" element={<MedicineList />} />
          <Route path="/medicine/category/add" element={<AddCategory />} />
          <Route path="/medicine/category" element={<CategoryList />} />
          <Route path="/purchase/add" element={<AddPurchase />} />
          <Route path="/purchase" element={<PurchaseList />} />
          <Route path="/supplier/add" element={<AddSupplier />} />
          <Route path="/supplier" element={<SupplierList />} />
          <Route path="/stock" element={<StockList />} />
          <Route path="/patient/add" element={<AddPatient />} />
          <Route path="/patient" element={<PatientList />} />
          <Route path="/doctordashboard" element={<DoctorDashboard />} />
          <Route path="/patient/add_patient" element={<AddPatient />} />
          <Route path="/patient/list" element={<PatientList />} />
          <Route path="/patient/profile" element={<CompleteProfilePatient />} />
          <Route path="/prescription" element={<PrescriptionList />} />
          <Route path="/prescription/add" element={<AddPrescription />} />
          <Route path="/schedule" element={<ScheduleList />} />
          <Route path="/schedule/add" element={<AddSchedule />} />
          <Route path="/staff" element={<StaffList />} />
          <Route path="/staff/add" element={<AddStaff />} />
          <Route path="/staff/profile" element={<CompleteProfileStaff />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
