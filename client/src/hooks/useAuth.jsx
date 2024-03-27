import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw Error('useAuth must be used inside an AuthContext Provider')
    }
    
    return context;
};