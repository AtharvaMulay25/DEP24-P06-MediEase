import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContext Provider')
    }
    
    return context;
};