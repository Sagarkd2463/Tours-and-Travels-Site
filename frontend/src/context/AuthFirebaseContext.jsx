import React, { createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, githubProvider } from '../utils/firebase';
import { authCases } from './constants';

const safeParse = (item) => {
    try {
        return JSON.parse(item);
    } catch {
        return null;
    }
};

const initialState = {
    Fuser: safeParse(localStorage.getItem('Fuser')) || null,
    loading: false,
    error: null,
    access_Token: safeParse(localStorage.getItem('access_Token')) || null,
};

export const AuthFirebaseContext = createContext(initialState);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case authCases.LOGIN_START:
            return { ...state, loading: true, error: null };
        case authCases.LOGIN_SUCCESS:
            const { user, access_Token } = action.payload;
            localStorage.setItem('Fuser', JSON.stringify(user));
            localStorage.setItem('access_Token', access_Token);
            return { Fuser: user, access_Token, loading: false, error: null };
        case authCases.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case authCases.LOGOUT:
            localStorage.removeItem('Fuser');
            localStorage.removeItem('access_Token');
            return { Fuser: null, access_Token: null, loading: false, error: null };
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
                dispatch({ type: authCases.LOGIN_SUCCESS, payload: { user: userData, access_Token: token } });
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
            dispatch({ type: authCases.LOGIN_SUCCESS, payload: { user: userData, access_Token: token } });
        } catch (error) {
            dispatch({ type: authCases.LOGIN_FAILURE, payload: error.message });
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            dispatch({ type: authCases.LOGOUT });
        } catch (error) {
            console.error('Error logging out:', error);
            dispatch({ type: authCases.LOGIN_FAILURE, payload: error.message });
        }
    };

    return (
        <AuthFirebaseContext.Provider
            value={{
                Fuser: state.Fuser,
                loading: state.loading,
                error: state.error,
                access_Token: state.access_Token,
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