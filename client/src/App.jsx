import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Home from "./pages/Home";
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
import AddAdmin from "./pages/AddAdmin";
import AdminList from "./pages/AdminList";
import { useAuthContext } from "./hooks/useAuthContext";
import RequestList from "./pages/RequestList";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const { userRole } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={!userRole ? <SignInPage /> : <Home/>} />
          <Route path="/signup" element={!userRole ? <SignUpPage /> : <Home/>} />
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
          <Route path="/patient/list" element={<PatientList />} />
          <Route path="/patient/profile" element={<CompleteProfilePatient />} />
          <Route path="/prescription" element={<PrescriptionList />} />
          <Route path="/prescription/add" element={<AddPrescription />} />
          <Route path="/schedule" element={<ScheduleList />} />
          <Route path="/schedule/add" element={<AddSchedule />} />
          <Route path="/staff" element={<StaffList />} />
          <Route path="/staff/add" element={<AddStaff />} />
          <Route path="/staff/profile" element={<CompleteProfileStaff />} />
          <Route path="/admin" element={<AdminList />} />
          <Route path="/admin/add" element={<AddAdmin />} />
          <Route path="/requests" element={<RequestList />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
