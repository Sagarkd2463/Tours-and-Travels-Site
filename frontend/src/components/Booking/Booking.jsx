import React from 'react';
import '../../styles/Booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';

const Booking = ({ tour, avgRating }) => {

    const { price, reviews } = tour;

    const handleChange = (e) => {

    };

    return (
        <div className='booking'>
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>${price} <span>/per person</span> </h3>

                <span className="tour__rating d-flex align-items-center">
                    <i className="ri-star-fill"></i>
                    {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>

            <div className="booking__form">
                <h5>Information</h5>
                <Form className='booking__info-form'>
                    <FormGroup>
                        <input
                            type="text"
                            placeholder='Full Name'
                            id='fullName'
                            onChange={handleChange}
                            required />
                    </FormGroup>

                    <FormGroup>
                        <input
                            type="number"
                            placeholder='Phone'
                            id='phone'
                            onChange={handleChange}
                            required />
                    </FormGroup>

                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input
                            type="date"
                            placeholder=''
                            id='bookAt'
                            onChange={handleChange}
                            required />

                        <input
                            type="number"
                            placeholder='Guest'
                            id='guestSize'
                            onChange={handleChange}
                            required />
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
};

export default Booking;