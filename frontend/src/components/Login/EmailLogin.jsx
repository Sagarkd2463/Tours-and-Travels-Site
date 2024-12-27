import React, { useState, useContext } from 'react';
import { Container, Col, Row, Button, Form, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/Login.css';
import { BASE_URL } from '../../utils/config';

const EmailPasswordLogin = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: 'LOGIN_START' });

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            localStorage.setItem('accessToken', result.token);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    _id: result.data._id || null,
                    firebaseUid: result.data.firebaseUid || null,
                    email: result.data.email,
                    displayName: result.data.displayName || result.data.email,
                },
            });

            toast.success("Login successful!");
            navigate('/');
        } catch (error) {
            console.error("Login error:", error.message);
            toast.error(error.message);
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    id='email'
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required />
                            </FormGroup>

                            <FormGroup>
                                <input
                                    type="password"
                                    placeholder='Password'
                                    id='password'
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required />
                            </FormGroup>

                            <Button
                                className='btn btn-secondary auth__btn'
                                type='submit'>
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <ToastContainer />
        </section>
    );
};

export default EmailPasswordLogin;
