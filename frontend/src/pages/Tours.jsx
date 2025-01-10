import React, { useEffect, useState } from 'react';
import CommonSection from '../shared/CommonSection';
import '../styles/Tours.css';
import TourCard from '../shared/TourCard';
import SearchBar from '../shared/SearchBar';
import Newsletter from '../shared/Newsletter';
import { Col, Container, Row } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { useNavigate } from "react-router-dom";

const Tours = () => {

    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
    const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

    useEffect(() => {
        const pages = Math.ceil(tourCount / 8);
        setPageCount(pages);
        window.scrollTo(0, 0);
    }, [page, tourCount, tours]);

    return (
        <>
            <CommonSection title={'All Tours'} />
            <section>
                <Container>
                    <Row>
                        <SearchBar />
                    </Row>
                </Container>
            </section>

            <section className='pt-0'>
                <Container>
                    {loading &&
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }

                    {error &&
                        <div className="text-center mt-5">
                            <p className="text-danger">Some problem in loading tours. Please try again!</p>
                            <button
                                className="btn mt-3"
                                style={{ backgroundColor: "#faa935", color: "white" }}
                                onClick={() => navigate("/home")}
                            >
                                Go to Home Page
                            </button>
                        </div>
                    }

                    {
                        !loading && !error && <Row>
                            {
                                tours?.map((tour) => (
                                    <Col lg="3" md="6" sm="6" key={tour._id} className='mb-4'>
                                        <TourCard tour={tour} />
                                    </Col>
                                ))}

                            <Col lg='12'>
                                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                                    {[...Array(pageCount).keys()].map((number) => (
                                        <span
                                            key={number}
                                            onClick={() => setPage(number)}
                                            className={page === number ? 'active__page' : ''}>
                                            {number + 1}
                                        </span>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    }
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default Tours;