import React, { useState, useEffect } from 'react'
import { HashLoadingScreen } from '../UI/LoadingScreen';
import { useAuthContext } from '../../hooks/useAuthContext';
import roleMap from '../../utils/rolesMap';
import UnauthorizedPage from '../../pages/UnauthorizedPage';

const ProtectedRoute = ({ children, routeName }) => {
    const { userRole } = useAuthContext();
    const [roleArr, setRoleArr] = useState([]);

    useEffect(() => {
        if (userRole) setRoleArr(roleMap(userRole));
    }, [userRole]);

    if (!roleArr.length) {
        return <HashLoadingScreen />
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