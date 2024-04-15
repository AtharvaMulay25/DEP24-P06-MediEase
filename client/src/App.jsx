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
import MedicalHistory from "./pages/MedicalHistoryList";
import OutOfStock from "./pages/OutOfStockList";
import ExpiredMedicineList from "./pages/ExpiredMedicineList";
import PrescriptionDetail from "./pages/PrescriptionDetail";
import PurchaseDetail from "./pages/PurchaseDetail";
import StaffProfile from "./pages/StaffProfile";
import PatientProfile from "./pages/PatientProfile";
import AdminProfile from "./pages/AdminProfile";
import ProtectedRoute from "./components/Protection/ProtectedRoute";
import DoctorScheduleList from "./pages/DoctorScheduleList";

function App() {
  const { userRole } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={!userRole ? <SignInPage /> : <Home />} />
          <Route path="/signup" element={!userRole ? <SignUpPage /> : <Home />} />
          {/* <Route path="/profile/staff" element={
            <ProtectedRoute routeName="STAFF_PROFILE">
              <StaffProfile />
            </ProtectedRoute>
          } />
          <Route path="/profile/patient" element={
            <ProtectedRoute routeName="PATIENT_PROFILE">
              <PatientProfile />
            </ProtectedRoute>
          } /> */}

          <Route path="/profile/staff" element={
            <StaffProfile />
          } />
          <Route path="/profile/patient" element={
            <PatientProfile />
          } />
          <Route path="/profile/patient/edit" element={
            <PatientProfile edit={true} />
          } />
          <Route path="/profile/admin" element={
            <AdminProfile />
          } />
          <Route path="/profile/admin/edit" element={
            <AdminProfile edit={true} />
          } />
          <Route path="/pharmadashboard" element={
            <ProtectedRoute routeName="PHARMA_DASHBOARD">
              <PharmaDashboard />
            </ProtectedRoute>
          } />
          <Route path="/medicine/expired" element={
            <ProtectedRoute routeName="MEDICINE">
              <ExpiredMedicineList />
            </ProtectedRoute>
          } />
          <Route path="/medicine/add" element={
            <ProtectedRoute routeName="MEDICINE">
              <AddMedicine />
            </ProtectedRoute>
          } />
          <Route path="/medicine" element={
            <ProtectedRoute routeName="MEDICINE">
              <MedicineList />
            </ProtectedRoute>
          } />
          <Route path="/medicine/category/add" element={
            <ProtectedRoute routeName="MEDICINE">
              <AddCategory />
            </ProtectedRoute>
          } />
          <Route path="/medicine/category" element={
            <ProtectedRoute routeName="MEDICINE">
              <CategoryList />
            </ProtectedRoute>
          } />
          <Route path="/purchase/add" element={
            <ProtectedRoute routeName="PURCHASE">
              <AddPurchase />
            </ProtectedRoute>
          } />
          <Route path="/purchase" element={
            <ProtectedRoute routeName="PURCHASE">
              <PurchaseList />
            </ProtectedRoute>
          } />
          <Route path="/purchase/:id" element={
            <ProtectedRoute routeName="PURCHASE">
              <PurchaseDetail />
            </ProtectedRoute>
          } />
          <Route path="/supplier/add" element={
            <ProtectedRoute routeName="SUPPLIER">
              <AddSupplier />
            </ProtectedRoute>
          } />
          <Route path="/supplier" element={
            <ProtectedRoute routeName="SUPPLIER">
              <SupplierList />
            </ProtectedRoute>
          } />
          <Route path="/stock" element={
            <ProtectedRoute routeName="STOCK">
              <StockList />
            </ProtectedRoute>
          } />
          <Route path="/stock/out" element={
            <ProtectedRoute routeName="STOCK">
              <OutOfStock />
            </ProtectedRoute>
          } />
          <Route path="/patient/add" element={
            <ProtectedRoute routeName="PATIENT">
              <AddPatient />
            </ProtectedRoute>
          } />
          <Route path="/patient" element={
            <ProtectedRoute routeName="PATIENT">
              <PatientList />
            </ProtectedRoute>
          } />
          <Route path="/doctordashboard" element={
            <ProtectedRoute routeName="DOCTOR_DASHBOARD">
              <DoctorDashboard />
            </ProtectedRoute>
          } />
          {/* <Route path="/patient/profile" element={
            <ProtectedRoute routeName="PATIENT">
              <CompleteProfilePatient />
            </ProtectedRoute>
          } /> */}
          <Route path="/patient/profile" element={
            <CompleteProfilePatient />
          } />
          <Route path="/prescription" element={
            <ProtectedRoute routeName="PRESCRIPTION">
              <PrescriptionList />
            </ProtectedRoute>
          } />
          <Route path="/prescription/add" element={
            <ProtectedRoute routeName="PRESCRIPTION">
              <AddPrescription />
            </ProtectedRoute>
          } />
          <Route path="/prescription/patient" element={
            <ProtectedRoute routeName="MEDICAL_HISTORY">
              <MedicalHistory />
            </ProtectedRoute>
          } />
          <Route path="/prescription/:id" element={
            <ProtectedRoute routeName="PRESCRIPTION_DETAIL">
              <PrescriptionDetail />
            </ProtectedRoute>
          } />
          <Route path="/schedule/doctor" element={
            <ProtectedRoute routeName="DOCTOR_SCHEDULE">
              <DoctorScheduleList />
            </ProtectedRoute>
          } />
          <Route path="/schedule" element={
            <ProtectedRoute routeName="SCHEDULE">
              <ScheduleList />
            </ProtectedRoute>
          } />
          <Route path="/schedule/add" element={
            <ProtectedRoute routeName="SCHEDULE">
              <AddSchedule />
            </ProtectedRoute>
          } />
          <Route path="/staff" element={
            <ProtectedRoute routeName="STAFF">
              <StaffList />
            </ProtectedRoute>
          } />
          <Route path="/staff/add" element={
            <ProtectedRoute routeName="STAFF">
              <AddStaff />
            </ProtectedRoute>
          } />
          {/* <Route path="/staff/profile" element={
            <ProtectedRoute routeName="STAFF">
              <CompleteProfileStaff />
            </ProtectedRoute>
          } /> */}
          <Route path="/staff/profile" element={
            <CompleteProfileStaff />
          } />
          <Route path="/admin" element={
            <ProtectedRoute routeName="ADMIN">
              <AdminList />
            </ProtectedRoute>
          } />
          <Route path="/admin/add" element={
            <ProtectedRoute routeName="ADMIN">
              <AddAdmin />
            </ProtectedRoute>
          } />
          <Route path="/requests" element={
            <ProtectedRoute routeName="ADMIN">
              <RequestList />
            </ProtectedRoute>
          } />
          <Route path="/admindashboard" element={
            <ProtectedRoute routeName="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
