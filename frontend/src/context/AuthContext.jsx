import { createContext, useReducer, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authCases } from './constants';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
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
                user: {
                    ...action.payload,
                    firebaseUid: action.payload.firebaseUid || null,
                    _id: action.payload._id || null, // MongoDB ID if available
                    username: action.payload.displayName || action.payload.email, // Ensure username is set
                },
                loading: false,
                error: null,
            };

        case authCases.LOGIN_FAILURE:
            return {
                user: null,
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
            localStorage.removeItem('accessToken'); // Ensure token is removed on logout
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

    // Check token expiration and automatically log out
    useEffect(() => {
        const checkTokenExpiration = () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const accessToken = localStorage.getItem('accessToken');

            if (storedUser && accessToken) {
                try {
                    const decodedToken = jwtDecode(accessToken);
                    const currentTime = Date.now() / 1000;

                    if (decodedToken.exp < currentTime) {
                        // Token expired
                        dispatch({ type: authCases.LOGOUT });
                    }
                } catch (error) {
                    console.error('Error decoding token:', error.message);
                    dispatch({ type: authCases.LOGOUT });
                }
            }
        };

        // Run check immediately and periodically every 5 minutes
        checkTokenExpiration();
        const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

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