import React, { createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, githubProvider } from '../utils/firebase';
import { authCases } from './constants';

const initialState = {
    Fuser: JSON.parse(localStorage.getItem('Fuser')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    loading: false,
    error: null,
};

export const AuthFirebaseContext = createContext(initialState);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case authCases.LOGIN_START:
            return { ...state, loading: true, error: null };
        case authCases.LOGIN_SUCCESS:
            const { user, accessToken } = action.payload;
            localStorage.setItem('Fuser', JSON.stringify(user));
            localStorage.setItem('accessToken', accessToken);
            return { user, accessToken, loading: false, error: null };
        case authCases.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case authCases.LOGOUT:
            localStorage.removeItem('Fuser');
            localStorage.removeItem('accessToken');
            return { user: null, accessToken: null, loading: false, error: null };
        default:
            return state;
    }
};

export const AuthFirebaseContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName || '',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                };
                dispatch({ type: authCases.LOGIN_SUCCESS, payload: { user: userData, accessToken: token } });
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
            const token = await result.user.getIdToken();
            const userData = {
                uid: result.user.uid,
                displayName: result.user.displayName || '',
                email: result.user.email || '',
                photoURL: result.user.photoURL || '',
            };
            dispatch({ type: authCases.LOGIN_SUCCESS, payload: { user: userData, accessToken: token } });
        } catch (error) {
            dispatch({ type: authCases.LOGIN_FAILURE, payload: error.message });
        }
    };

    const logout = async () => {
        await auth.signOut();
        dispatch({ type: authCases.LOGOUT });
    };

    return (
        <AuthFirebaseContext.Provider
            value={{
                Fuser: state.Fuser,
                accessToken: state.accessToken,
                loading: state.loading,
                error: state.error,
                loginWithGoogle: () => loginWithProvider(googleProvider),
                loginWithFacebook: () => loginWithProvider(facebookProvider),
                loginWithGithub: () => loginWithProvider(githubProvider),
                logout,
            }}
        >
            {children}
        </AuthFirebaseContext.Provider>
    );
};