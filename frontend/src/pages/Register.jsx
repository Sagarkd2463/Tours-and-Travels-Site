import React, { useContext, useState } from 'react';
import { Container, Col, Row, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import registerImg from '../assets/images/register.png';
import '../styles/Register.css';
import userIcon from '../assets/images/user.png';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import { toast } from 'react-toastify';

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: '',
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

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const result = await res.json();
            console.log("Response:", result);

            if (!res.ok) {
                toast.error(`Registration failed: ${result.message}`);
            } else {
                toast.success("Registration successful!");
                dispatch({ type: 'REGISTER_SUCCESS' });
                navigate('/login');
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className='m-auto'>
                        <div className="register__container d-flex justify-content-between">
                            <div className="register__img">
                                <img src={registerImg} alt="" />
                            </div>

                            <div className="register__form">
                                <div className="user">
                                    <img src={userIcon} alt="" />
                                </div>
                                <h2>Register</h2>

                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            id="username"
                                            onChange={handleChange}
                                            value={credentials.username}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            onChange={handleChange}
                                            value={credentials.email}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            onChange={handleChange}
                                            value={credentials.password}
                                            required
                                        />
                                    </FormGroup>

                                    <button
                                        className="btn auth__register_btn"
                                        type="submit"
                                    >
                                        Create Account
                                    </button>
                                </Form>

                                <p>
                                    Already have an account?{' '}
                                    <Link to={'/login'}>Login</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Register;