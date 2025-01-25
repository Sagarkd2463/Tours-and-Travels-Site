import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const FirebaseBooking = ({ tour, avgRating }) => {
    const { user, token } = useSelector((state) => state.Fuser);
    const navigate = useNavigate();

    const [booking, setBooking] = useState({
        userId: user ? user.uid : null,
        userEmail: user ? user.email : '',
        tourName: tour?.title || '',
        fullName: '',
        phone: '',
        guestSize: 1,
        totalAmount: (tour?.price || 0) + 10,
        bookedAt: '',
    });

    useEffect(() => {
        if (tour?.price) {
            setBooking((prev) => ({
                ...prev,
                totalAmount: Number(tour.price) * booking.guestSize + 10,
            }));
        }
    }, [booking.guestSize, tour?.price]);

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
                booking,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Booking successful!');
            navigate('/thank-you');
        } catch (error) {
            console.error('Booking Error:', error);
            toast.error(error.response?.data?.message || 'Failed to book your tour.');
        }
    };

    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>
                    Rs. {price} <span>/per person</span>
                </h3>
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
                            placeholder="Full Name"
                            id="fullName"
                            value={booking.fullName}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="email"
                            placeholder="Email"
                            id="userEmail"
                            value={booking.userEmail}
                            readOnly
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="number"
                            placeholder="Phone"
                            id="phone"
                            value={booking.phone}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input
                            type="date"
                            id="bookedAt"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Guests"
                            id="guestSize"
                            value={booking.guestSize}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                </Form>
            </div>

            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-1">
                            Rs. {price} <i className="ri-close-line"></i> {booking.guestSize} person(s)
                        </h5>
                        <span>Rs. {price * booking.guestSize}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0">
                        <h5>Service Fee</h5>
                        <span>Rs. 10</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span>Rs. {booking.totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>
                <Button className="btn primary__btn w-100 mt-4" onClick={handleSubmit}>
                    Book Now
                </Button>
            </div>
        </div>
    );
};

export default FirebaseBooking;