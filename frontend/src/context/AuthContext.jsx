import { createContext, useEffect, useReducer } from 'react';
import { authCases } from './constants';

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: null,
};

export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case authCases.LOGIN_START:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case authCases.LOGIN_SUCCESS:
            return {
                user: action.payload,
                loading: false,
                error: null,
            };

        case authCases.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case authCases.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };

        case authCases.LOGOUT:
            localStorage.removeItem('user');
            return {
                user: null,
                loading: false,
                error: null,
            };

        default:
            return state;
    }
};


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
        } else {
            localStorage.removeItem('user');
        }
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};