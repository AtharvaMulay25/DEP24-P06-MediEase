import React from 'react'
import { useNavigate } from "react-router-dom"; 
import unauthorizedImage from "../assets/img/unauthorized.jpg";
import { useLogout } from '../hooks/useLogout';
import Toaster from "../components/UI/Toaster";
import { toast } from "sonner";

const unauthorizedText = "Sorry! You are not authorized to access this page. Please check your login credentials."
const UnauthorizedPage = () => {
    const { logout } = useLogout();
    const navigate = useNavigate();
    
    const handleLogout = async() => {
        await logout();
        toast.success("Logged Out Successfully");
        setTimeout(() => {
            navigate("/signin");
        }, 1000);
    };

    return (
        <>
        <div className='md:flex md:flex-row flex flex-col'>
            <img
                src={unauthorizedImage}
                alt="Unauthorized Image"
                className='h-1/2 w-1/2' />
            <div className='flex flex-col justify-center p-10'>
                <h1 className='md:text-4xl mb-4 text-xl'>{unauthorizedText}</h1>
                <div className=''>
                    <button
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out font-semibold"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
        <Toaster richColors closeButton position="top-center" />
        </>
    )
}

export default UnauthorizedPage