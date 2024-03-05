import './App.css'
 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sign from "./components/Sign";
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import AdminHome from './pages/AdminHome';
import AddMedicine from './pages/AddMedicine';
import AddSupplier from './pages/AddSupplier';
import PurchaseList from './pages/PurchaseList';
import PharmaDashboard from './pages/PharmaDashboard';
import Pagination from './components/Pagination';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/" element={<Dashboard />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/medicine/add_medicine" element={<AddMedicine />} />
        <Route path="/supplier/add_supplier" element={<AddSupplier/>} /> 
        <Route path="/purchase/list" element={<PurchaseList />} />
        <Route path="/pharmadashboard" element={<PharmaDashboard />} />
        <Route path="/pagination" element={<Pagination />} />
      </Routes>

      </BrowserRouter>
      {/* <Sign /> */}
    </>
  )

}

export default App
