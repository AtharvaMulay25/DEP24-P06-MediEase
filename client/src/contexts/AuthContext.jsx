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
            userName: ""
        }
        default: return {
            ...state
        }
    } 
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        userRole: null,
        userEmail: null,
        userName: ""
    }); 

    useEffect(() => {
        const fetchDetails = async() => {
            const userRole = Cookies.get('user-role');
            const userEmail = Cookies.get('user-email');
            const userName = Cookies.get('user-name');
            
            if (userRole && userEmail && userName) {
                dispatch({
                    type: "LOGIN", 
                    payload: {
                        userRole,
                        userEmail,
                        userName
                    }
                });
            }
            console.log(userEmail, userName, userRole);
        }
        fetchDetails();
    }, [state.userRole, state.userEmail, state.userName]);

    return <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
}