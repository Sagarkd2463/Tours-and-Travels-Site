import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { BASE_URL } from '../../utils/config';

const FirebaseBooking = ({ tour, avgRating }) => {
    const { user, token } = useSelector((state) => state.Fuser);
    const navigate = useNavigate();

    const [booking, setBooking] = useState({
        userId: user?.uid || '',
        userEmail: user?.email || '',
        tourName: tour?.title || '',
        fullName: '',
        phone: '',
        guestSize: 1,
        totalAmount: 0,
        bookedAt: '',
    });

    useEffect(() => {
        if (tour?.price) {
            setBooking((prev) => ({
                ...prev,
                totalAmount: Number(tour.price) * prev.guestSize + 10,
            }));
        }
    }, [booking.guestSize, tour?.price]);

    useEffect(() => {
        if (user) {
            console.log("User Data in Booking:", user);
            setBooking((prev) => ({
                ...prev,
                userId: user.uid,
                userEmail: user.email,
            }));
        }
    }, [user]);

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
            <p className='text-center text-primary fs-5'>Loading user data... Please sign in.</p>
            toast.error('Please sign in to make a booking.');
            return;
        }

        if (!token) {
            toast.error('Access token is missing. Please log in again.');
            return;
        }

        if (!booking.bookedAt || isNaN(new Date(booking.bookedAt).getTime())) {
            toast.error('Please select a valid date!');
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/booking/firebase/create`,
                booking,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success('Booking successful!');
                navigate('/thank-you');
            } else {
                throw new Error(response.data.message || 'Failed to book your tour.');
            }
        } catch (error) {
            console.error('Booking Error:', error);
            toast.error(error.response?.data?.message || 'Failed to book your tour.');
        }
    };

    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>
                    Rs. {tour?.price} <span>/per person</span>
                </h3>
                <span className="tour__rating d-flex align-items-center">
                    <i className="ri-star-fill"></i>
                    {avgRating || 0} ({tour?.reviews?.length || 0})
                </span>
            </div>

            <div className="booking__form">
                <h5>Information</h5>
                <form onSubmit={handleSubmit}>
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
                            onChange={handleChange}
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
                            value={booking.bookedAt}
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
                    <Button className="btn primary__btn w-100 mt-4" type="submit">
                        Book Now
                    </Button>
                </form>
            </div>

            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-1">
                            Rs. {tour?.price} <i className="ri-close-line"></i> {booking.guestSize} person(s)
                        </h5>
                        <span>Rs. {tour?.price * booking.guestSize}</span>
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
            </div>
        </div>
    );
};

export default FirebaseBooking;