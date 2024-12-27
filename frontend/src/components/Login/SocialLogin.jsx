import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/Login.css';

const FirebaseSocialLogin = () => {
    const { dispatch } = useContext(AuthContext);

    const handleSocialLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const token = await user.getIdToken();

            localStorage.setItem("accessToken", token);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    firebaseUid: user.uid,
                    _id: null,
                    email: user.email,
                    displayName: user.displayName || user.email,
                },
            });

            toast.success(`Welcome, ${user.displayName || user.email}!`);
        } catch (error) {
            if (error.message.includes("account-exists-with-different-credential")) {
                toast.error(
                    `An account with this email already exists with a different sign-in provider. 
                    Please use a different email or provider to log in.`
                );
            } else {
                toast.error(error.message);
            }
            console.error("Social login error:", error.message);
            dispatch({ type: "LOGIN_FAILURE", payload: error.message });
        }
    };

    return (
        <div className="social-login d-flex flex-column align-items-start mt-4">
            <Button
                className="btn btn-google w-100 mb-2 d-flex align-items-center"
                onClick={() => handleSocialLogin(new GoogleAuthProvider())}>
                <i className="fab fa-google me-3"></i>
                <span>Login with Google</span>
            </Button>

            <Button
                className="btn btn-github w-100 mb-2 d-flex align-items-center"
                onClick={() => handleSocialLogin(new GithubAuthProvider())}>
                <i className="fab fa-github me-3"></i>
                <span>Login with GitHub</span>
            </Button>

            <Button
                className="btn btn-facebook w-100 mb-2 d-flex align-items-center"
                onClick={() => handleSocialLogin(new FacebookAuthProvider())}>
                <i className="fab fa-facebook me-3"></i>
                <span>Login with Facebook</span>
            </Button>

            <ToastContainer />
        </div>
    );
};

export default FirebaseSocialLogin;
