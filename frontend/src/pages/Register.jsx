import React, { useContext, useState } from 'react';
import { Container, Col, Row, Button, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import registerImg from '../assets/images/register.png';
import '../styles/Register.css';
import userIcon from '../assets/images/user.png';
import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from './../utils/config';

const Register = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
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

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(credentials),
            });

            const result = await res.json();

            if (!res.ok) alert(result.message);

            dispatch({ type: 'REGISTER_SUCCESS' });
            navigate('/login');
        } catch (error) {
            alert(error.message);
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
                                            placeholder='Username'
                                            id='username'
                                            onChange={handleChange}
                                            required />
                                    </FormGroup>

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
                                        Create Account
                                    </Button>
                                </Form>

                                <p>Already have an account?
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