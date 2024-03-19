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
        userRole: null
    }); 

    useEffect(() => {
        const user = Cookies.get('user-role');
        
        if (user) {
            dispatch({
                type: "LOGIN", 
                payload: user
            });
        }

    }, []);

    return <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
}