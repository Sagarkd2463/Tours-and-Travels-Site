import { createContext, useReducer, useEffect } from 'react';
import { authCases } from './constants';

// Utility function to safely parse JSON
const safeParse = (item) => {
    try {
        return JSON.parse(item);
    } catch {
        return null;
    }
};

const initialState = {
    user: safeParse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
    accessToken: safeParse(localStorage.getItem('accessToken')) || null,
};

export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case authCases.LOGIN_START:
            return { ...state, loading: true, error: null };
        case authCases.LOGIN_SUCCESS:
            const { token, ...userDetails } = action.payload;
            localStorage.setItem('user', JSON.stringify(userDetails));
            localStorage.setItem('accessToken', token);
            return { ...state, user: userDetails, accessToken: token, loading: false, error: null };
        case authCases.LOGIN_FAILURE:
            return { user: null, accessToken: null, loading: false, error: action.payload };
        case authCases.LOGOUT:
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            return { user: null, accessToken: null, loading: false, error: null };
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

        if (state.accessToken) {
            localStorage.setItem('accessToken', state.accessToken);
        } else {
            localStorage.removeItem('accessToken');
        }
    }, [state.user, state.accessToken]);

    const logout = () => {
        dispatch({ type: authCases.LOGOUT });
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                accessToken: state.accessToken,
                loading: state.loading,
                error: state.error,
                dispatch,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};