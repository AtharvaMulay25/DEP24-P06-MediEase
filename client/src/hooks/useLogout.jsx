import Cookies from "js-cookie";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();
       
    const logout = () => {
        Cookies.remove('user-role');    
        Cookies.remove('user-email');
        Cookies.remove('user-name');

        authDispatch({ type: "LOGOUT" });
    };

    return { logout };
};