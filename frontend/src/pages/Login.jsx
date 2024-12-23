import React, { useContext, useState } from 'react';
import { Container, Col, Row, Button, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from './../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../utils/firebase';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(credentials),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            localStorage.setItem('accessToken', result.token);

            dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
            toast.success("Login successful!");
            navigate('/');
        } catch (error) {
            console.error("Login error:", error.message);
            toast.error(error.message);
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Get the Firebase ID token
            const token = await user.getIdToken();

            // Set the token in localStorage
            localStorage.setItem("accessToken", token);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    email: user.email,
                    uid: user.uid,
                    displayName: user.displayName || user.email,
                },
            });

            toast.success(`Welcome, ${user.displayName || user.email}!`);

            navigate("/");
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
        <section>
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <div className="login__container d-flex justify-content-between">
                            <div className="login__img">
                                <img src={loginImg} alt="Login Illustration" />
                            </div>

                            <div className="login__form">
                                <div className="user">
                                    <img src={userIcon} alt="User Icon" />
                                </div>
                                <h2>Login</h2>

                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input
                                            type="email"
                                            placeholder='Email'
                                            id='email'
                                            onChange={handleChange}
                                            required />
                                    </FormGroup>

                                    <FormGroup>
                                        <input
                                            type="password"
                                            placeholder='Password'
                                            id='password'
                                            onChange={handleChange}
                                            required />
                                    </FormGroup>

                                    <Button
                                        className='btn btn-secondary auth__btn'
                                        type='submit'>
                                        Login
                                    </Button>
                                </Form>

                                <hr style={{ color: 'black', width: '100%' }} />

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
                                </div>

                                <p>Don't have an account?
                                    <Link to={'/register'}>Register</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <ToastContainer />
        </section>
    );
};

export default Login;