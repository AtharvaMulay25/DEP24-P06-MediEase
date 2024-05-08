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
import UpdateCategory from "./pages/UpdateCategory";
import UpdateSupplier from "./pages/UpdateSupplier";
import UpdateSchedule from "./pages/UpdateSchedule";
import UpdatePatient from "./pages/UpdatePatient";
import UpdateStaff from "./pages/UpdateStaff";
import UpdateMedicine from "./pages/UpdateMedicine";
import UpdatePurchase from "./pages/UpdatePurchase";
import UpdatePrescription from "./pages/UpdatePrescription";

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
            <ProtectedRoute routeName="STAFF_PROFILE">
              <StaffProfile />
            </ProtectedRoute>
          } />
          <Route path="/profile/patient" element={
            <ProtectedRoute routeName="PATIENT_PROFILE">
              <PatientProfile />
            </ProtectedRoute>
          } />
          <Route path="/profile/admin" element={
            <ProtectedRoute routeName="ADMIN_PROFILE">
              <AdminProfile />
            </ProtectedRoute>
          } />
          <Route path="/profile/staff/edit" element={
            <ProtectedRoute routeName="STAFF_PROFILE">
              <StaffProfile edit={true} />
            </ProtectedRoute>
          } />
          <Route path="/profile/patient/edit" element={
            <ProtectedRoute routeName="PATIENT_PROFILE">
              <PatientProfile edit={true} />
            </ProtectedRoute>
          } />
          <Route path="/profile/admin/edit" element={
            <ProtectedRoute routeName="ADMIN_PROFILE">
              <AdminProfile edit={true} />
            </ProtectedRoute>
          } />
          <Route path="/pharmadashboard" element={
            <ProtectedRoute routeName="PHARMA_DASHBOARD">
              <PharmaDashboard />
            </ProtectedRoute>
          } />
          <Route path="/medicine/expired" element={
            <ProtectedRoute routeName="EXPIRED_MEDICINE">
              <ExpiredMedicineList />
            </ProtectedRoute>
          } />
          <Route path="/medicine/add" element={
            <ProtectedRoute routeName="ADD_MEDICINE">
              <AddMedicine />
            </ProtectedRoute>
          } />
          <Route path="/medicine" element={
            <ProtectedRoute routeName="MEDICINE_LIST">
              <MedicineList />
            </ProtectedRoute>
          } />
          <Route path="/medicine/category/add" element={
            <ProtectedRoute routeName="ADD_CATEGORY">
              <AddCategory />
            </ProtectedRoute>
          } />
          <Route path="/medicine/category" element={
            <ProtectedRoute routeName="CATEGORY_LIST">
              <CategoryList />
            </ProtectedRoute>
          } />
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
          <Route path="/supplier/add" element={
            <ProtectedRoute routeName="ADD_SUPPLIER">
              <AddSupplier />
            </ProtectedRoute>
          } />
          <Route path="/supplier" element={
            <ProtectedRoute routeName="SUPPLIER_LIST">
              <SupplierList />
            </ProtectedRoute>
          } />
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
            <ProtectedRoute routeName="PRESCRIPTION_LIST">
              <PrescriptionList />
            </ProtectedRoute>
          } />
          <Route path="/prescription/add" element={
            <ProtectedRoute routeName="ADD_PRESCRIPTION">
              <AddPrescription />
            </ProtectedRoute>
          } />
          <Route path="/prescription/patient" element={
            <ProtectedRoute routeName="MEDICAL_HISTORY">
              <MedicalHistory />
            </ProtectedRoute>
          } />
          <Route path="/prescription/:id" element={
            <ProtectedRoute routeName="PRESCRIPTION_LIST">
              <PrescriptionDetail />
            </ProtectedRoute>
          } />
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
            <ProtectedRoute routeName="STAFF">
              <CompleteProfileStaff />
            </ProtectedRoute>
          } /> */}
          <Route path="/staff/profile" element={
            <CompleteProfileStaff />
          } />
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
          <Route path="/requests" element={
            <ProtectedRoute routeName="REQUESTS">
              <RequestList />
            </ProtectedRoute>
          } />
          <Route path="/admindashboard" element={
            <ProtectedRoute routeName="ADMIN_DASHBOARD">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/medicine/category/update/:id" element={
            <ProtectedRoute routeName="ADD_CATEGORY">
              <UpdateCategory />
            </ProtectedRoute>
          } />
          <Route path="/supplier/update/:id" element={
            <ProtectedRoute routeName="ADD_SUPPLIER">
              <UpdateSupplier />
            </ProtectedRoute>
          } />
          <Route path="/schedule/update/:id" element={
            <ProtectedRoute routeName="ADD_SCHEDULE">
              <UpdateSchedule />
            </ProtectedRoute>
          } />
          <Route path="/patient/update/:id" element={
            <ProtectedRoute routeName="ADD_PATIENT">
              <UpdatePatient />
            </ProtectedRoute>
          } />
          <Route path="/staff/update/:id" element={
            <ProtectedRoute routeName="ADD_STAFF">
              <UpdateStaff />
            </ProtectedRoute>
          } />
          <Route path="/medicine/update/:id" element={
            <ProtectedRoute routeName="ADD_MEDICINE">
              <UpdateMedicine />
            </ProtectedRoute>
          } />
          <Route path="/purchase/update/:id" element={
            <ProtectedRoute routeName="ADD_PURCHASE">
              <UpdatePurchase />
            </ProtectedRoute>
          } />
          <Route path="/prescription/update/:id" element={
            <ProtectedRoute routeName="ADD_PRESCRIPTION">
              <UpdatePrescription />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
