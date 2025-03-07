import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/config';
import '../../styles/UserBookings.css';
import axios from 'axios';

const FirebaseUserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { user, token } = useSelector((state) => state.Fuser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/booking/firebase/user_bookings`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookings(response.data.data || []);
            } catch (err) {
                toast.error('Error fetching bookings.');
            }
        };

        fetchBookings();
    }, [user, token, navigate]);

    return (
        <div className="container my-5">
            <h1>Your Bookings</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking._id} className="booking-card">
                        <h5>{booking.tourName}</h5>
                        <p>{new Date(booking.bookedAt).toLocaleDateString()}</p>
                        <button
                            onClick={() => navigate(`/booking/${booking._id}`)}
                            className="btn btn-primary"
                        >
                            View Details
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default FirebaseUserBookings;
