import React from 'react';
import '../styles/Newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import maleTouristImg from '../assets/images/male-tourist.png';

const Newsletter = () => {
    return (
        <section className='newsletter'>
            <Container>
                <Row>
                    <Col lg='6'>
                        <div className="newsletter__content">
                            <h2>Subscribe now to get useful traveling information.</h2>

                            <div className="newsletter__input">
                                <input type="email" placeholder='Enter your email' />
                                <button className="btn newsletter__btn">Subscribe</button>
                            </div>

                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores dolorem cum tenetur veritatis maxime qui,
                                quae architecto eum adipisci veniam in quis modi esse atque est. Ipsam quam quos laudantium.
                            </p>
                        </div>
                    </Col>

                    <Col lg='6'>
                        <div className="newsletter__img">
                            <img src={maleTouristImg} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Newsletter;