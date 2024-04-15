import Cookies from "js-cookie";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();
       
    const logout = async () => {
        try {
            const res = await axios.get(`${apiRoutes.auth}/logout`, {
                withCredentials: true
            });

            const { data } = res;
            if (data.ok) {
                Cookies.remove('user-role');
                Cookies.remove('user-email');
                Cookies.remove('user-name');
                Cookies.remove('user-profile-complete');
                
                authDispatch({ type: "LOGOUT" });

                console.log("httpOnly cookies deleted successfully");
            } else {
                console.log("Error in logging out");
            }
        } catch (err) {
            console.log(`Error in logging out: ${err.message}`);
        }
    };

    return { logout };
};