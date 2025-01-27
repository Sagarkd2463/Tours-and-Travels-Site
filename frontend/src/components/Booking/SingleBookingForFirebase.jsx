import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/config';
import '../../styles/SingleBooking.css';
import axios from 'axios';

const FirebaseSingleBooking = () => {
    const { bookingId } = useParams();
    const { user, token } = useSelector((state) => state.Fuser);
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.error('You must be logged in to view booking details.');
            return;
        }

        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/booking/firebase/booking/${bookingId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBooking(response.data.data);
            } catch (err) {
                toast.error(err.message || 'Booking not found.');
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingId, user, token]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-5">
                <p className="text-danger">{error}</p>
                <button
                    className="btn mt-3"
                    style={{ backgroundColor: "#faa935", color: "white" }}
                    onClick={() => navigate("/tours")}
                >
                    Go to Tours
                </button>
            </div>
        );
    }

    if (!booking) {
        return <div className="text-center mt-5"><p>No booking found.</p></div>;
    }

    return (
        <div className="single-booking container my-5">
            <h1>Booking Details</h1>
            <div className="booking-info">
                <h2>{booking.tourName}</h2>
                <p><strong>Full Name:</strong> {booking.fullName}</p>
                <p><strong>Email:</strong> {booking.userEmail}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Guests:</strong> {booking.guestSize}</p>
                <p><strong>Booked Date:</strong> {new Date(booking.bookedAt).toLocaleDateString()}</p>
                <p><strong>Total Amount:</strong> Rs. {booking.totalAmount}</p>
            </div>

            <div className="actions">
                <button className="btn btn-primary" onClick={() => window.history.back()}>Go Back</button>
            </div>
        </div>
    );
};

export default FirebaseSingleBooking;
