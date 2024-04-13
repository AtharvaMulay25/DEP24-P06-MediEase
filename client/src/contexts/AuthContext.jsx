import { createContext, useEffect, useReducer } from 'react';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': return {
            ...action.payload
        }
        case 'LOGOUT': return {
            userRole: null,
            userEmail: null,
            userName: "",
            userProfileComplete: false
        }
        case 'COMPLETE_PROFILE': return {...state, userProfileComplete: true}
        default: return {
            ...state
        }
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        userRole: null,
        userEmail: null,
        userName: "",
        userProfileComplete: false
    });

    useEffect(() => {
        const fetchDetails = async () => {
            const userRole = Cookies.get('user-role');
            const userEmail = Cookies.get('user-email');
            const userName = Cookies.get('user-name');
            
            let userProfileComplete = undefined;
            
            const userProfile = Cookies.get('user-profile-complete');
            
            if (userProfile === "false") userProfileComplete = false;
            else if (userProfile === "true") userProfileComplete = true;

            if (userRole && userEmail && userName) {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        userRole,
                        userEmail,
                        userName,
                        userProfileComplete
                    }
                });
            }
            console.log(userEmail, userName, userRole, userProfileComplete);
        }
        fetchDetails();
    }, [state.userRole, state.userEmail, state.userName, state.userProfileComplete]);

    return <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
}