import React, { useState, useEffect } from 'react'
import { HashLoadingScreen, SyncLoadingScreen } from '../UI/LoadingScreen';
import { useAuthContext } from '../../hooks/useAuthContext';
import roleMap from '../../utils/rolesMap';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';

const ProtectedRoute = ({ children, routeName }) => {
    const navigate = useNavigate();
    const { userRole, userProfileComplete } = useAuthContext();
    const [roleArr, setRoleArr] = useState([]);

    //TODO: Restrict the user to go to their profile complete pages when they have completed their profiles 
    useEffect(() => {
        const x = setTimeout(() => {
            if (userRole) {
                if (userRole === "ADMIN") {
                    setRoleArr(roleMap("ADMIN"));
                    return;
                } else {
                    if (userProfileComplete) setRoleArr(roleMap(userRole));
                    else {
                        toast.error("Please complete your profile.");
                        navigate(`/profile/${userRoleAssert === "PATIENT" ? "patient" : "staff"}`);
                    }
                }
            } else {
                //TODO: Show warning when non logged in user trying to access
                navigate("/signin");
            }
        }, 100);
        return () => {
            clearInterval(x);
        }
    }, [userRole]);

    if (!roleArr.length) {
        // navigate("/signin");
        return <SyncLoadingScreen />;
    }

    if (!roleArr.includes(routeName)) {
        return <UnauthorizedPage />
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute