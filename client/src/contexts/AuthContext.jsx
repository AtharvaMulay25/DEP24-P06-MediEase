import { createContext, useEffect, useReducer } from 'react';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': return {
            userRole: action.payload
        }
        case 'LOGOUT': return {
            userRole: null
        }
        default: return {
            userRole: state
        }
    } 
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        userRole: null,
        userEmail: null,
    }); 

    useEffect(() => {
        const userRole = Cookies.get('user-role');
        const userEmail = Cookies.get('user-email');
        
        if (userRole && userEmail) {
            dispatch({
                type: "LOGIN", 
                payload: {
                    userRole,
                    userEmail
                }
            });
        }

    }, []);

    return <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
}