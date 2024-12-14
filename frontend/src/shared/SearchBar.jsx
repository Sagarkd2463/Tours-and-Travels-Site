import React, { useRef } from 'react';
import { Col, Form, FormGroup } from 'reactstrap';
import '../styles/Search-bar.css';
import { BASE_URL } from './../utils/config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const SearchBar = () => {

    const locationRef = useRef('');
    const distanceRef = useRef(0);
    const maxGroupSizeRef = useRef(0);
    const navigate = useNavigate();

    const searchHandler = async () => {

        const location = locationRef.current.value;
        const distance = distanceRef.current.value;
        const maxGroupSize = maxGroupSizeRef.current.value;

        if (location === "" || distance === "" || maxGroupSize === "") {
            toast.error("All fields are required!");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`);

            if (!res.ok) {
                toast.error('Something went wrong');
                return;
            }

            const result = await res.json();

            navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, { state: result.data });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Col lg='12'>
            <div className="search_bar">
                <Form className='d-flex align-items-center gap-4'>
                    <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                        <span><i className='ri-map-pin-line'></i></span>
                        <div>
                            <h6>Location</h6>
                            <input type="text" placeholder="Where are you going?" ref={locationRef} />
                        </div>
                    </FormGroup>

                    <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                        <span><i className='ri-map-pin-time-line'></i></span>
                        <div>
                            <h6>Distance</h6>
                            <input type="number" placeholder="Distance k/m" ref={distanceRef} />
                        </div>
                    </FormGroup>

                    <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                        <span><i className='ri-group-line'></i></span>
                        <div>
                            <h6>Max People</h6>
                            <input type="number" placeholder="0" ref={maxGroupSizeRef} />
                        </div>
                    </FormGroup>

                    <span className="search__icon" onClick={searchHandler}>
                        <i className='ri-search-line'></i>
                    </span>
                </Form>
            </div>

            <ToastContainer />
        </Col>
    );
};

export default SearchBar;