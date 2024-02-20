import './App.css'
 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sign from "./components/Sign";
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import AdminHome from './pages/AdminHome';
import AddMedicine from './pages/AddMedicine';

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
      </Routes>

      </BrowserRouter>
      {/* <Sign /> */}
    </>
  )

}

export default App
