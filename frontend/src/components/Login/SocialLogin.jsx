import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { AuthFirebaseContext } from '../../context/AuthFirebaseContext';
import '../../styles/Login.css';

const FirebaseSocialLogin = () => {
    const { loginWithGoogle, loginWithFacebook, loginWithGithub } = useContext(AuthFirebaseContext);

    return (
        <div className="social-login d-flex flex-column align-items-start mt-4">
            <Button
                className="btn btn-google w-100 mb-2 d-flex align-items-center"
                onClick={loginWithGoogle}>
                <i className="fab fa-google me-3"></i>
                <span>Login with Google</span>
            </Button>

            <Button
                className="btn btn-github w-100 mb-2 d-flex align-items-center"
                onClick={loginWithGithub}>
                <i className="fab fa-github me-3"></i>
                <span>Login with GitHub</span>
            </Button>

            <Button
                className="btn btn-facebook w-100 mb-2 d-flex align-items-center"
                onClick={loginWithFacebook}>
                <i className="fab fa-facebook me-3"></i>
                <span>Login with Facebook</span>
            </Button>
        </div>
    );
};

export default FirebaseSocialLogin;
