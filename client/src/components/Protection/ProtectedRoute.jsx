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
            console.log("userRole: ", userRole);
            console.log("userProfileComplete: ", userProfileComplete);

            if (userRole) {
                if (userRole === "ADMIN") {
                    setRoleArr(roleMap("ADMIN"));
                    return;
                }

                // if (routeName === "PATIENT_PROFILE" || routeName === "STAFF_PROFILE") {
                //     console.log("PROFILESS");
                //     console.log("routeName: ", routeName)
                //     console.log("userRole: ", userRole)
                //     if (
                //         (routeName === "PATIENT_PROFILE" && userRole === "PATIENT") ||
                //         (routeName === "STAFF_PROFILE" && (userRole === "DOCTOR" || userRole === "PARAMEDICAL"))
                //     ) {
                //         console.log("YOU ARE ON CORRECT PROFILE");
                //         setRoleArr(roleMap(userRole));
                //         return;
                //     } else {
                //         console.log("YOU ARE ON WRONG PROFILE");
                //         toast.error("Please complete your profile.");
                //         navigate(`/profile/${userRole === "PATIENT" ? "patient" : "staff"}`);
                //     } 
                // }

                else {
                    console.log("userProfileComplete: ", userProfileComplete, typeof userProfileComplete);
                    if (userProfileComplete) setRoleArr(roleMap(userRole));
                    else {
                        toast.error("Please complete your profile.");
                        console.log("please complete your profile");
                        navigate(`/${userRole === "PATIENT" ? "patient" : "staff"}/profile`);
                    }
                }
            } else {
                //TODO: Show warning when non logged in user trying to access
                navigate("/signin");
            }
        }, 1000);
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