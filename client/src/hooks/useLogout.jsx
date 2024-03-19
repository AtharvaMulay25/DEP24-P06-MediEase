import Cookies from "js-cookie";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const { dispatch: authDispatch } = useAuthContext();
       
    const logout = (tokenExpired = false) => {
        Cookies.removeItem('user-role');    
        authDispatch({ type: "LOGOUT" });
        navigate("/login", { state: { loggedOut: true, tokenExpired: tokenExpired }})        
    };

    return { logout };
};