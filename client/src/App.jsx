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
import OutOfStock from "./pages/OutOfStockList";
import ExpiredMedicineList from "./pages/ExpiredMedicineList";
import PrescriptionDetail from "./pages/PrescriptionDetail";
import PurchaseDetail from "./pages/PurchaseDetail";
import StaffProfile from "./pages/StaffProfile";
import PatientProfile from "./pages/PatientProfile";
import ProtectedRoute from "./components/Protection/ProtectedRoute";
import DoctorScheduleList from "./pages/DoctorScheduleList";

function App() {
  const { userRole } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/staff" element={<StaffProfile />} />
          <Route path="/profile/patient" element={<PatientProfile />} />
          <Route path="/signin" element={!userRole ? <SignInPage /> : <Home />} />
          <Route path="/signup" element={!userRole ? <SignUpPage /> : <Home />} />

          {/* dashboard */}
          <Route path="/pharmadashboard" element={
            <ProtectedRoute routeName="PHARMA_DASHBOARD">
              <PharmaDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admindashboard" element={
            <ProtectedRoute routeName="ADMIN_DASHBOARD">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/doctordashboard" element={
            <ProtectedRoute routeName="DOCTOR_DASHBOARD">
              <DoctorDashboard />
            </ProtectedRoute>
          } />

          {/* medicine */}
          <Route path="/medicine" element={
            <ProtectedRoute routeName="MEDICINE_LIST">
              <MedicineList />
            </ProtectedRoute>
          } />
          <Route path="/medicine/add" element={
            <ProtectedRoute routeName="ADD_MEDICINE">
              <AddMedicine />
            </ProtectedRoute>
          } />
          <Route path="/medicine/expired" element={
            <ProtectedRoute routeName="EXPIRED_MEDICINE">
              <ExpiredMedicineList />
            </ProtectedRoute>
          } />

          {/* category */}
          <Route path="/medicine/category" element={
            <ProtectedRoute routeName="CATEGORY_LIST">
              <CategoryList />
            </ProtectedRoute>
          } />
          <Route path="/medicine/category/add" element={
            <ProtectedRoute routeName="ADD_CATEGORY">
              <AddCategory />
            </ProtectedRoute>
          } />

          {/* purchase */}
          <Route path="/purchase/add" element={
            <ProtectedRoute routeName="ADD_PURCHASE">
              <AddPurchase />
            </ProtectedRoute>
          } />
          <Route path="/purchase" element={
            <ProtectedRoute routeName="PURCHASE_LIST">
              <PurchaseList />
            </ProtectedRoute>
          } />
          <Route path="/purchase/:id" element={
            <ProtectedRoute routeName="PURCHASE_LIST">
              <PurchaseDetail />
            </ProtectedRoute>
          } />

          {/* supplier */}
          <Route path="/supplier" element={
            <ProtectedRoute routeName="ADD_SUPPLIER">
              <SupplierList />
            </ProtectedRoute>
          } />
          <Route path="/supplier/add" element={
            <ProtectedRoute routeName="SUPPLIER_LIST">
              <AddSupplier />
            </ProtectedRoute>
          } />

          {/* stock */}
          <Route path="/stock" element={
            <ProtectedRoute routeName="STOCK_LIST">
              <StockList />
            </ProtectedRoute>
          } />
          <Route path="/stock/out" element={
            <ProtectedRoute routeName="OUT_OF_STOCK">
              <OutOfStock />
            </ProtectedRoute>
          } />

          {/* patient */}
          <Route path="/patient/add" element={
            <ProtectedRoute routeName="ADD_PATIENT">
              <AddPatient />
            </ProtectedRoute>
          } />
          <Route path="/patient" element={
            <ProtectedRoute routeName="PATIENT_LIST">
              <PatientList />
            </ProtectedRoute>
          } />
          {/* <Route path="/patient/profile" element={
            <ProtectedRoute routeName="PATIENT_PROFILE">
              <CompleteProfilePatient />
            </ProtectedRoute>
          } /> */}
          <Route path="/patient/profile" element={
            <CompleteProfilePatient />
          } />

          {/* prescription */}
          <Route path="/prescription" element={
            <ProtectedRoute routeName="PRESCRIPTION_LIST">
              <PrescriptionList />
            </ProtectedRoute>
          } />
          <Route path="/prescription/add" element={
            <ProtectedRoute routeName="ADD_PRESCRIPTION">
              <AddPrescription />
            </ProtectedRoute>
          } />
          <Route path="/prescription/:id" element={
            <ProtectedRoute routeName="PRESCRIPTION_LIST">
              <PrescriptionDetail />
            </ProtectedRoute>
          } />

          {/* schedule */}
          <Route path="/schedule/doctor" element={
            <ProtectedRoute routeName="DOCTOR_SCHEDULE">
              <DoctorScheduleList />
            </ProtectedRoute>
          } />
          <Route path="/schedule" element={
            <ProtectedRoute routeName="SCHEDULE_LIST">
              <ScheduleList />
            </ProtectedRoute>
          } />
          <Route path="/schedule/add" element={
            <ProtectedRoute routeName="ADD_SCHEDULE">
              <AddSchedule />
            </ProtectedRoute>
          } />

          {/* staff */}
          <Route path="/staff" element={
            <ProtectedRoute routeName="STAFF_LIST">
              <StaffList />
            </ProtectedRoute>
          } />
          <Route path="/staff/add" element={
            <ProtectedRoute routeName="ADD_STAFF">
              <AddStaff />
            </ProtectedRoute>
          } />
          {/* <Route path="/staff/profile" element={
            <ProtectedRoute routeName="STAFF_PROFILE">
              <CompleteProfileStaff />
            </ProtectedRoute>
          } /> */}
          <Route path="/staff/profile" element={
            <CompleteProfileStaff />
          } />

          {/* admin */}
          <Route path="/admin" element={
            <ProtectedRoute routeName="ADMIN_LIST">
              <AdminList />
            </ProtectedRoute>
          } />
          <Route path="/admin/add" element={
            <ProtectedRoute routeName="ADD_ADMIN">
              <AddAdmin />
            </ProtectedRoute>
          } />

          {/* requests */}
          <Route path="/requests" element={
            <ProtectedRoute routeName="REQUESTS">
              <RequestList />
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
