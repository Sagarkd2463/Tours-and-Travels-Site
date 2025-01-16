import React, { createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, githubProvider } from '../utils/firebase';
import { authCases } from './constants';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
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
            return {
                user,
                accessToken,
                loading: false,
                error: null,
            };
        case authCases.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case authCases.LOGOUT:
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            return { user: null, accessToken: null, loading: false, error: null };
        default:
            return state;
    }
};

export const AuthFirebaseContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const accessToken = user.stsTokenManager.accessToken;
                dispatch({
                    type: authCases.LOGIN_SUCCESS,
                    payload: { user, accessToken }
                });

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('accessToken', accessToken);
            } else {
                dispatch({ type: authCases.LOGOUT });
            }
        });

        return () => unsubscribe();
    }, []);

    const loginWithProvider = async (provider) => {
        try {
            dispatch({ type: authCases.LOGIN_START });
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Send token to backend for validation
            const backendResponse = await fetch(`${BASE_URL}/auth/${provider.providerId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    firebaseUid: user.uid,
                }),
            });

            if (!backendResponse.ok) {
                throw new Error('Failed to authenticate with the backend.');
            }

            const { data } = await backendResponse.json();
            const { token } = data;

            // Save token in localStorage and update state
            localStorage.setItem('accessToken', token);
            dispatch({
                type: authCases.LOGIN_SUCCESS,
                payload: {
                    user: { ...user, id: data.id }, // Combine Firebase and backend user data
                    accessToken: token,
                },
            });
        } catch (error) {
            dispatch({ type: authCases.LOGIN_FAILURE, payload: error.message });
        }
    };

    const loginWithGoogle = () => loginWithProvider(googleProvider);
    const loginWithFacebook = () => loginWithProvider(facebookProvider);
    const loginWithGithub = () => loginWithProvider(githubProvider);

    const logout = () => {
        auth.signOut();
        dispatch({ type: authCases.LOGOUT });
    };

    return (
        <AuthFirebaseContext.Provider
            value={{
                ...state,
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