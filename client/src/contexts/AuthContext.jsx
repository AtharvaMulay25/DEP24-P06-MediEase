import { createContext, useEffect, useReducer } from 'react';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': return {
            user: action.payload
        }
        case 'LOGOUT': return {
            user: null
        }
        default: return {
            user: state
        }
    } 
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
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