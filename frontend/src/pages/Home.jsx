import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import heroImg01 from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
import '../styles/Home.css';
import Subtitle from '../shared/Subtitle';
import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../featured/FeaturedTourList';
import experienceImg from '../assets/images/experience.png';

const Home = () => {
    return (
        <>
            <section>
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

                        <SearchBar />
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg='3'>
                            <h5 className="services__subtitle">What we serve</h5>
                            <h2 className="services__title">We offer our best services</h2>
                        </Col>
                        <ServiceList />
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg='12' className='mb-5'>
                            <Subtitle subtitle={"Explore"} />
                            <h2 className='featured__tour-title'>Our featured tours</h2>
                        </Col>
                        <FeaturedTourList />
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className="experience__content">
                                <Subtitle subtitle={"Experience"} />

                                <h2>
                                    With our all experience <br /> we will serve you
                                </h2>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    <br />
                                    Ipsum vitae eaque nihil, unde, harum voluptatum saepe quam molestiae ut dicta laborum eligendi.
                                </p>
                            </div>

                            <div className="counter__wrapper d-flex align-items-center gap-5">
                                <div className="counter__box">
                                    <span>12k+</span>
                                    <h6>Successful Trip</h6>
                                </div>

                                <div className="counter__box">
                                    <span>1k+</span>
                                    <h6>Regular client</h6>
                                </div>

                                <div className="counter__box">
                                    <span>17</span>
                                    <h6>years experience</h6>
                                </div>
                            </div>
                        </Col>

                        <Col lg='6'>
                            <div className="experience__img">
                                <img src={experienceImg} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container>
                <Row>
                    <Col lg='12'>
                        <Subtitle subtitle={'Gallery'} />
                        <h2 className="gallery__title">
                            Visit our customers tour gallery
                        </h2>
                    </Col>

                    <Col lg='12'>

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;