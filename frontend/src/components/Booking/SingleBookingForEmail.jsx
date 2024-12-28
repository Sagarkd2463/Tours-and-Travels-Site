import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from 'reactstrap';
import '../../styles/SingleBooking.css';

const SingleBooking = () => {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const { bookingId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async () => {
            if (!user) {
                navigate('/login');
                return;
            }

            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) throw new Error("Authentication token missing. Please log in.");

                const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        toast.error("Session expired. Please log in again.");
                        navigate('/login');
                    } else {
                        throw new Error("Failed to fetch booking details.");
                    }
                }

                const data = await response.json();
                setBooking(data.data);
            } catch (err) {
                console.error("Error fetching booking:", err.message);
                toast.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [user, bookingId, navigate]);

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
        <div className="container my-5">
            <ToastContainer />
            <h1 className="text-center mb-4" style={{ color: "#ff7e01" }}>Booking Details</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-sm border-custom">
                        <div className="card-body">
                            <h5 className="card-title" style={{ color: "#faa935" }}>
                                {booking.tourName}
                            </h5>
                            <p><strong>Booked Date:</strong> {new Date(booking.bookedAt).toLocaleDateString('en-IN')}</p>
                            <p><strong>Full Name:</strong> {booking.fullName}</p>
                            <p><strong>Email:</strong> {booking.userEmail}</p>
                            <p><strong>Phone:</strong> {booking.phone}</p>
                            <p><strong>Guests:</strong> {booking.guestSize}</p>
                            <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
                            <div className="d-flex justify-content-between">
                                <Button
                                    className="btn btn-danger"
                                    onClick={() => navigate('/bookings')}
                                >
                                    Back to Bookings
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBooking;