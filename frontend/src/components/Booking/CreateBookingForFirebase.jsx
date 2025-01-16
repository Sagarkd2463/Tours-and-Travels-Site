import React, { useState, useContext } from 'react';
import '../../styles/Booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthFirebaseContext } from '../../context/AuthFirebaseContext';
import { BASE_URL } from '../../utils/config';
import { toast } from 'react-toastify';
import axios from 'axios';

const FirebaseBooking = ({ tour, avgRating }) => {
    const { price, reviews, title } = tour;
    const navigate = useNavigate();
    const { user } = useContext(AuthFirebaseContext);

    const [booking, setBooking] = useState({
        userId: user ? user.uid : null, // Firebase UID
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookedAt: '',
    });

    const handleChange = (e) => {
        const { id, value, type } = e.target;
        setBooking((prev) => ({
            ...prev,
            [id]: type === "date" ? new Date(value).toISOString() : value,
        }));
    };

    const serviceFee = 10;
    const totalAmount = Number(price) * Number(booking.guestSize) + serviceFee;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            return toast.error("Please sign in to make a booking.");
        }

        if (!booking.bookedAt || isNaN(new Date(booking.bookedAt).getTime())) {
            return toast.error("Please select a valid date!");
        }

        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                throw new Error("Access token is missing. Please log in again.");
            }

            await axios.post(`${BASE_URL}/booking/firebase-create`, {
                ...booking,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            toast.success("Booking successful! Redirecting...");
            setTimeout(() => navigate('/thank-you'), 1000);
        } catch (error) {
            console.error("Booking Error:", error);
            toast.error(error.message || "An error occurred while making the booking.");
        }
    };

    return (
        <div className='booking'>
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>Rs. {price} <span>/per person</span></h3>
                <span className="tour__rating d-flex align-items-center">
                    <i className="ri-star-fill"></i>
                    {avgRating || 0} ({reviews?.length || 0})
                </span>
            </div>

            <div className="booking__form">
                <h5>Information</h5>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <input
                            type="text"
                            placeholder='Full Name'
                            id='fullName'
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="number"
                            placeholder='Phone'
                            id='phone'
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input
                            type="date"
                            id='bookedAt'
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            placeholder='Guests'
                            id='guestSize'
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </Form>
            </div>

            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className='border-0 px-0'>
                        <h5 className='d-flex align-items-center gap-1'>
                            Rs. {price} <i className='ri-close-line'></i> {booking.guestSize} person(s)
                        </h5>
                        <span>Rs. {price * booking.guestSize}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0'>
                        <h5>Service Fee</h5>
                        <span>Rs. {serviceFee}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0 total'>
                        <h5>Total</h5>
                        <span>Rs. {totalAmount}</span>
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
