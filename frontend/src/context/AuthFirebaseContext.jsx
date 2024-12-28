import React, { createContext, useReducer, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { googleProvider, facebookProvider, githubProvider } from '../utils/firebase';
import { authCases } from './constants';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
};

export const AuthFirebaseContext = createContext(initialState);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case authCases.LOGIN_START:
            return { ...state, loading: true, error: null };
        case authCases.LOGIN_SUCCESS:
            return { user: action.payload, loading: false, error: null };
        case authCases.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case authCases.LOGOUT:
            localStorage.removeItem('user');
            return { user: null, loading: false, error: null };
        default:
            return state;
    }
};

export const AuthFirebaseContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            dispatch({ type: 'LOGIN_SUCCESS', payload: result.user });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
    };

    const loginWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            dispatch({ type: 'LOGIN_SUCCESS', payload: result.user });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
    };

    const loginWithGithub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            dispatch({ type: 'LOGIN_SUCCESS', payload: result.user });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
    };

    const logout = () => {
        auth.signOut();
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthFirebaseContext.Provider value={{
            user: state.user, loading: state.loading, error: state.error,
            loginWithGoogle, loginWithFacebook, loginWithGithub, logout
        }}>
            {children}
        </AuthFirebaseContext.Provider>
    );
};
