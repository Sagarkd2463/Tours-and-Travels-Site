import React from 'react';
import '../../styles/Login.css';
import { Container, Col, Row } from 'reactstrap';
import EmailPasswordLogin from './EmailLogin';
import FirebaseSocialLogin from './SocialLogin';
import loginImg from '../../assets/images/login.png';
import userIcon from '../../assets/images/user.png';
import { Link } from 'react-router-dom';

const Login = () => {
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

                                <EmailPasswordLogin />
                                <FirebaseSocialLogin />

                                <p>Don't have an account?
                                    <Link to={'/register'}>Register</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;