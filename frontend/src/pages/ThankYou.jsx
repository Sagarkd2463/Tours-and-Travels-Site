import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/ThankYou.css';

const ThankYou = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        setTimeout(() => {
            navigate('/bookings');
        }, 500);
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='pt-5 text-center'>
                        <div className="thank__you">
                            <span><i className='ri-checkbox-circle-line'></i></span>
                            <h1 className='mb-3 fw-semibold'>Thank You</h1>
                            <h3 className='mb-4'>Your tour is booked.</h3>
                            <button
                                className="btn mt-3"
                                style={{ backgroundColor: '#faa935', color: 'white' }}
                                onClick={handleNavigation}
                            >
                                Go to My Booking
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ThankYou;