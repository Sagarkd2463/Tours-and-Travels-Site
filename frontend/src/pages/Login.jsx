import React, { useContext, useState } from 'react';
import { Container, Col, Row, Button, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from './../utils/config';
import { ToastContainer, toast } from 'react-toastify';

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
                toast.error(result.message);
            } else {
                toast.success("Login successful!");
                localStorage.setItem('accessToken', result.token);
                dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <div className="login__container d-flex justify-content-between">
                            <div className="login__img">
                                <img src={loginImg} alt="" />
                            </div>

                            <div className="login__form">
                                <div className="user">
                                    <img src={userIcon} alt="" />
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
                                        className='btn secondary__btn auth__btn'
                                        type='submit'>
                                        Login
                                    </Button>
                                </Form>

                                <p>Don't have an account?
                                    <Link to={'/register'}>Create</Link>
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