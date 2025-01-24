import React, { useState, useEffect } from 'react';
import '../../styles/Booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/config';
import { toast } from 'react-toastify';
import axios from 'axios';

const FirebaseBooking = ({ tour, avgRating }) => {
    const { price, reviews, title } = tour;
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.Fuser);

    const [booking, setBooking] = useState({
        userId: user ? user.uid : null,
        userEmail: user ? user.email : '',
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        totalAmount: price + 10, // Base price + service fee
        bookedAt: '',
    });

    // Calculate totalAmount whenever guestSize changes
    useEffect(() => {
        setBooking((prev) => ({
            ...prev,
            totalAmount: Number(price) * Number(prev.guestSize) + 10,
        }));
    }, [price, booking.guestSize]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setBooking((prev) => ({
            ...prev,
            [id]: id === 'guestSize' || id === 'phone' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            return toast.error('Please sign in to make a booking.');
        }

        if (!token) {
            return toast.error('Access token is missing. Please log in again.');
        }

        if (!booking.bookedAt || isNaN(new Date(booking.bookedAt).getTime())) {
            return toast.error('Please select a valid date!');
        }

        try {
            await axios.post(
                `${BASE_URL}/booking/firebase/create`,
                { ...booking },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Booking successful! Redirecting...');
            setTimeout(() => navigate('/thank-you'), 1000);
        } catch (error) {
            console.error('Booking Error:', error);
            toast.error(error.response?.data?.message || 'An error occurred while making the booking.');
        }
    };

    return (
        <div className='booking'>
            <div className='booking__top d-flex align-items-center justify-content-between'>
                <h3>
                    Rs. {price} <span>/per person</span>
                </h3>
                <span className='tour__rating d-flex align-items-center'>
                    <i className='ri-star-fill'></i>
                    {avgRating || 0} ({reviews?.length || 0})
                </span>
            </div>

            <div className='booking__form'>
                <h5>Information</h5>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <input
                            type='text'
                            placeholder='Full Name'
                            id='fullName'
                            value={booking.fullName}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type='email'
                            placeholder='Email'
                            id='userEmail'
                            value={booking.userEmail}
                            readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type='number'
                            placeholder='Phone'
                            id='phone'
                            value={booking.phone}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input
                            type='date'
                            id='bookedAt'
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='number'
                            placeholder='Guests'
                            id='guestSize'
                            value={booking.guestSize}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </Form>
            </div>

            <div className='booking__bottom'>
                <ListGroup>
                    <ListGroupItem className='border-0 px-0'>
                        <h5 className='d-flex align-items-center gap-1'>
                            Rs. {price} <i className='ri-close-line'></i> {booking.guestSize} person(s)
                        </h5>
                        <span>Rs. {price * booking.guestSize}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0'>
                        <h5>Service Fee</h5>
                        <span>Rs. 10</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0 total'>
                        <h5>Total</h5>
                        <span>Rs. {booking.totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>
                <Button className='btn primary__btn w-100 mt-4' onClick={handleSubmit}>
                    Book Now
                </Button>
            </div>
        </div>
    );
};

export default FirebaseBooking;