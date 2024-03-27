import Cookies from "js-cookie";
import { useAuth } from "./useAuth";

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuth();
       
    const logout = () => {
        Cookies.remove('user-role');    
        Cookies.remove('user-email');
        Cookies.remove('user-name');

        authDispatch({ type: "LOGOUT" });
    };

    return { logout };
};