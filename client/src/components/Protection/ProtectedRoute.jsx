import React, { useState, useEffect } from 'react'
import { HashLoadingScreen, SyncLoadingScreen } from '../UI/LoadingScreen';
import { useAuthContext } from '../../hooks/useAuthContext';
import roleMap from '../../utils/rolesMap';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, routeName }) => {
    const navigate = useNavigate();
    const { userRole } = useAuthContext();
    const [roleArr, setRoleArr] = useState([]);

    useEffect(() => {
        const x = setTimeout(() => {
            if (userRole) setRoleArr(roleMap(userRole));
            else {
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