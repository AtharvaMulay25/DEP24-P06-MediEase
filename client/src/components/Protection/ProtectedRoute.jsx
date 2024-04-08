import React, { useState, useEffect } from 'react'
import { HashLoadingScreen, SyncLoadingScreen } from '../UI/LoadingScreen';
import { useAuthContext } from '../../hooks/useAuthContext';
import roleMap from '../../utils/rolesMap';

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
        return <>USER NOT AUTHORIZED TO ACCESS THIS PAGE</>
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute