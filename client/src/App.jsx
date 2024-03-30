import { useState, useEffect } from "react";
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
import AddAdmin from "./pages/AddAdmin";
import AdminList from "./pages/AdminList";
import { useAuth } from "./hooks/useAuth";
import RequestList from "./pages/RequestList";

import { LoggedInRoute, RoleBasedRoute } from "./components/protected/protectRoute";
import roleMap from "./utils/rolesMap";

function App() {
  const { userRole } = useAuth();
  const [roleArr, setRoleArr] = useState();
  
  useEffect(() => {
     setRoleArr(roleMap(userRole));
  }, [userRole]);

  console.log("roleArr : ", roleArr);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<LoggedInRoute shouldBeLoggedIn={false} routePath={"/"}><SignInPage /></LoggedInRoute>} />
          <Route path="/signup" element={<LoggedInRoute shouldBeLoggedIn={false} routePath={"/"}><SignUpPage /></LoggedInRoute>} />
          <Route path="/pharmadashboard" element={userRole === "DOCTOR" ? <PharmaDashboard /> : <>ACCESS DENIED</>} />
          <Route path="/medicine/add" element={<RoleBasedRoute allowedRoles={roleArr}><AddMedicine /></RoleBasedRoute>} />
          <Route path="/medicine" element={<RoleBasedRoute allowedRoles={roleArr}><MedicineList /></RoleBasedRoute>} />
          <Route path="/medicine/category/add" element={<RoleBasedRoute allowedRoles={roleArr}><AddCategory /></RoleBasedRoute>} />
          <Route path="/medicine/category" element={<RoleBasedRoute allowedRoles={roleArr}><CategoryList /></RoleBasedRoute>} />
          <Route path="/purchase/add" element={<RoleBasedRoute allowedRoles={roleArr}><AddPurchase /></RoleBasedRoute>} />
          <Route path="/purchase" element={<RoleBasedRoute allowedRoles={roleArr}><PurchaseList /></RoleBasedRoute>} />
          <Route path="/supplier/add" element={<RoleBasedRoute allowedRoles={roleArr}><AddSupplier /></RoleBasedRoute>} />
          <Route path="/supplier" element={<RoleBasedRoute allowedRoles={roleArr}><SupplierList /></RoleBasedRoute>} />
          <Route path="/stock" element={<RoleBasedRoute allowedRoles={roleArr} userRole={userRole}><StockList /></RoleBasedRoute>} />
          <Route path="/patient/add" element={<RoleBasedRoute allowedRoles={roleArr}><AddPatient /></RoleBasedRoute>} />
          <Route path="/patient" element={<RoleBasedRoute allowedRoles={roleArr}><PatientList /></RoleBasedRoute>} />
          <Route path="/doctordashboard" element={<RoleBasedRoute allowedRoles={roleArr}><DoctorDashboard /></RoleBasedRoute>} />
          <Route path="/patient/list" element={<RoleBasedRoute allowedRoles={roleArr}><PatientList /></RoleBasedRoute>} />
          <Route path="/patient/profile" element={<RoleBasedRoute allowedRoles={roleArr}><CompleteProfilePatient /></RoleBasedRoute>} />
          <Route path="/prescription" element={<RoleBasedRoute allowedRoles={roleArr}><PrescriptionList /></RoleBasedRoute>} />
          <Route path="/prescription/add" element={<RoleBasedRoute allowedRoles={roleArr}><AddPrescription /></RoleBasedRoute>} />
          <Route path="/schedule" element={<RoleBasedRoute allowedRoles={roleArr}><ScheduleList /></RoleBasedRoute>} />
          <Route path="/schedule/add" element={<RoleBasedRoute allowedRoles={roleArr}><AddSchedule /></RoleBasedRoute>} />
          <Route path="/staff" element={<RoleBasedRoute allowedRoles={roleArr}><StaffList /></RoleBasedRoute>} />
          <Route path="/staff/add" element={<RoleBasedRoute allowedRoles={roleArr}><AddStaff /></RoleBasedRoute>} />
          <Route path="/staff/profile" element={<RoleBasedRoute allowedRoles={roleArr}><CompleteProfileStaff /></RoleBasedRoute>} />
          <Route path="/admin" element={<RoleBasedRoute allowedRoles={roleArr}><AdminList /></RoleBasedRoute>} />
          <Route path="/admin/add" element={<RoleBasedRoute allowedRoles={roleArr}><AddAdmin /></RoleBasedRoute>} />
          <Route path="/requests" element={<RoleBasedRoute allowedRoles={roleArr}><RequestList /></RoleBasedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
