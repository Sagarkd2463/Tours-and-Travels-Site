import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/Login.css';

const FirebaseSocialLogin = () => {
    const { dispatch } = useContext(AuthContext);

    const handleSocialLogin = async (provider, endpoint) => {
        try {
            const result = await signInWithPopup(auth, provider);

            if (!result.user || !result.user.displayName || !result.user.email || !result.user.photoURL) {
                toast.warning("Incomplete user information received from the provider.");
                return;
            }

            // Send the user details to the backend for further processing
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    firebaseUid: result.user.uid,
                }),
            });

            if (!response.ok) throw new Error('Authentication with the backend failed.');

            const data = await response.json();

            localStorage.setItem('accessToken', data.token);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    firebaseUid: result.user.uid,
                    _id: data.data?.id,
                    email: result.user.email,
                    displayName: result.user.displayName || result.user.email,
                },
            });

            toast.success(`Welcome, ${result.user.displayName || result.user.email}!`);
        } catch (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                toast.error(
                    `An account with this email already exists with a different sign-in provider. 
                    Please use the appropriate provider and email to log in.`
                );
            } else {
                toast.error(error.message);
            }

            console.error("Social login error:", error.message);
            dispatch({ type: "LOGIN_FAILURE", payload: error.message });
        }
    };

    const handleGoogleClick = () => handleSocialLogin(new GoogleAuthProvider(), '/api/v1/auth/google');
    const handleFacebookClick = () => handleSocialLogin(new FacebookAuthProvider(), '/api/v1/auth/facebook');
    const handleGithubClick = () => handleSocialLogin(new GithubAuthProvider(), '/api/v1/auth/github');

    return (
        <div className="social-login d-flex flex-column align-items-start mt-4">
            <Button
                className="btn btn-google w-100 mb-2 d-flex align-items-center"
                onClick={handleGoogleClick}>
                <i className="fab fa-google me-3"></i>
                <span>Login with Google</span>
            </Button>

            <Button
                className="btn btn-github w-100 mb-2 d-flex align-items-center"
                onClick={handleGithubClick}>
                <i className="fab fa-github me-3"></i>
                <span>Login with GitHub</span>
            </Button>

            <Button
                className="btn btn-facebook w-100 mb-2 d-flex align-items-center"
                onClick={handleFacebookClick}>
                <i className="fab fa-facebook me-3"></i>
                <span>Login with Facebook</span>
            </Button>

            <ToastContainer />
        </div>
    );
};

export default FirebaseSocialLogin;
