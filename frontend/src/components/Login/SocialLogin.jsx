import React from 'react';
import { Button } from 'reactstrap';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { toast } from 'react-toastify';
import '../../styles/Login.css';
import { BASE_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/firebaseAuthSlice';

const FirebaseSocialLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSocialLogin = async (provider, endpoint) => {
        try {
            const result = await signInWithPopup(auth, provider);

            const user = result.user;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    firebaseUid: user.uid,
                }),
            });

            const data = await response.json();
            if (data.success) {
                const token = data.data.token;
                dispatch(
                    loginSuccess({
                        user: data.data,
                        token,
                    })
                );
                toast.success(`Welcome, ${user.displayName || user.email}...`);
                navigate('/');
            } else {
                throw new Error(data.message || 'Authentication failed.');
            }
        } catch (error) {
            toast.error(error.message);
            console.error('Social login error:', error.message);
        }
    };

    const handleGoogleClick = () => handleSocialLogin(new GoogleAuthProvider(), `${BASE_URL}/auth/google`);
    const handleFacebookClick = () => handleSocialLogin(new FacebookAuthProvider(), `${BASE_URL}/auth/facebook`);
    const handleGithubClick = () => handleSocialLogin(new GithubAuthProvider(), `${BASE_URL}/auth/github`);

    return (
        <div className="social-login d-flex flex-column align-items-start mt-4">
            <Button className="btn btn-google w-100 mb-2 d-flex align-items-center" onClick={handleGoogleClick}>
                <i className="fab fa-google me-3"></i>
                <span>Login with Google</span>
            </Button>
            <Button className="btn btn-github w-100 mb-2 d-flex align-items-center" onClick={handleGithubClick}>
                <i className="fab fa-github me-3"></i>
                <span>Login with GitHub</span>
            </Button>
            <Button className="btn btn-facebook w-100 mb-2 d-flex align-items-center" onClick={handleFacebookClick}>
                <i className="fab fa-facebook me-3"></i>
                <span>Login with Facebook</span>
            </Button>
        </div>
    );
};

export default FirebaseSocialLogin;
