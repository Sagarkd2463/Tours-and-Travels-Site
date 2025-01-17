import React, { createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, githubProvider } from '../utils/firebase';
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
            localStorage.setItem('user', JSON.stringify(action.payload));
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
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName || '',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                };
                dispatch({ type: authCases.LOGIN_SUCCESS, payload: userData });
            } else {
                dispatch({ type: authCases.LOGOUT });
            }
        });

        return () => unsubscribe();
    }, []);

    const loginWithProvider = async (provider) => {
        dispatch({ type: authCases.LOGIN_START });
        try {
            const result = await signInWithPopup(auth, provider);
            const userData = {
                uid: result.user.uid,
                displayName: result.user.displayName || '',
                email: result.user.email || '',
                photoURL: result.user.photoURL || '',
            };
            dispatch({ type: authCases.LOGIN_SUCCESS, payload: userData });
        } catch (error) {
            dispatch({ type: authCases.LOGIN_FAILURE, payload: error.message });
        }
    };

    const loginWithGoogle = () => loginWithProvider(googleProvider);
    const loginWithFacebook = () => loginWithProvider(facebookProvider);
    const loginWithGithub = () => loginWithProvider(githubProvider);

    const logout = async () => {
        await auth.signOut();
        dispatch({ type: authCases.LOGOUT });
    };

    return (
        <AuthFirebaseContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                loginWithGoogle,
                loginWithFacebook,
                loginWithGithub,
                logout,
            }}
        >
            {children}
        </AuthFirebaseContext.Provider>
    );
};