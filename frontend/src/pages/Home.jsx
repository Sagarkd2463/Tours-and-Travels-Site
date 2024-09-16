import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import heroImg01 from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
import '../styles/Home.css';
import Subtitle from '../shared/Subtitle';

const Home = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col lg='6'>
                        <div className="hero_content">
                            <div className="hero_subtitle d-flex align-items-center">
                                <Subtitle subtitle={'Know Before You Go'} />
                                <img src={worldImg} alt="" />
                            </div>
                            <h1>Traveling opens door to creating
                                <span className="highlight"> memories</span>
                            </h1>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti repudiandae fuga dolores aut tenetur,
                                accusamus reprehenderit dignissimos, velit nihil ut ducimus ipsam esse cum maxime ab quas delectus possimus similique.
                                Natus eligendi officiis, perspiciatis molestias ducimus similique ipsa necessitatibus quas nihil sapiente et enim veniam
                                numquam expedita, ratione aliquid voluptate, corrupti autem quam ut iure. </p>
                        </div>
                    </Col>

                    <Col lg='2'>
                        <div className="hero_img-box">
                            <img src={heroImg01} alt="" />
                        </div>
                    </Col>

                    <Col lg='2'>
                        <div className="hero_img-box mt-4">
                            <video src={heroVideo} alt="" controls />
                        </div>
                    </Col>

                    <Col lg='2'>
                        <div className="hero_img-box mt-5">
                            <img src={heroImg02} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;