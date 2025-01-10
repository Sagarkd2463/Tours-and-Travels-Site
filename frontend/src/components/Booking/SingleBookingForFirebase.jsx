import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthFirebaseContext } from '../../context/AuthFirebaseContext';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/config';
import '../../styles/SingleBooking.css';
import axios from 'axios';

const SingleBooking = () => {
    const { bookingId } = useParams();
    const { user } = useContext(AuthFirebaseContext);
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            toast.error('You must be logged in to view booking details.');
            return;
        }

        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/booking/firebase-booking/${bookingId}?userId=${user.uid}`);
                const data = await response.json();
                if (response.ok) {
                    setBooking(data.data); // Assuming your API returns the booking data here
                } else {
                    toast.error('Booking not found.');
                }
            } catch (err) {
                toast.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingId, user]);

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
                <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
            </div>

            <div className="actions">
                <button className="btn btn-primary" onClick={() => window.history.back()}>Go Back</button>
            </div>
        </div>
    );
};

export default SingleBooking;
