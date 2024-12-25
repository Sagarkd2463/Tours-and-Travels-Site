import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { BASE_URL } from "../../utils/config";
import '../../styles/SingleBooking.css';

const SingleBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSingleBooking = async () => {
            const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await fetch(`${BASE_URL}/booking/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBooking(data.data);
                    toast.success("Booking details loaded successfully!");
                } else {
                    throw new Error("Failed to fetch booking details.");
                }
            } catch (err) {
                setError(err.message || "Failed to fetch booking.");
                toast.error(err.message || "Failed to fetch booking.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchSingleBooking();
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading booking details...</span>
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
                    onClick={() => navigate("/bookings")}
                >
                    Go to MyBookings
                </button>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4" style={{ color: '#ff7e01' }}>Booking Details</h1>
            {booking ? (
                <div className="card shadow-lg border-light">
                    <div className="card-body">
                        <h5 className="card-title mb-3" style={{ color: '#faa935' }}>{booking.tourName}</h5>
                        <p className="card-text">
                            <strong className="text-muted">Booking ID: </strong>
                            <span className="text-dark">{booking._id}</span>
                        </p>
                        <p className="card-text">
                            <strong className="text-muted">Date: </strong>
                            <span className="text-dark">
                                {new Date(booking.bookedAt).toLocaleDateString("en-IN")}
                            </span>
                        </p>
                        <p className="card-text">
                            <strong className="text-muted">Name: </strong>
                            <span className="text-dark">{booking.fullName}</span>
                        </p>
                        <p className="card-text">
                            <strong className="text-muted">Email: </strong>
                            <span className="text-dark">{booking.userEmail}</span>
                        </p>
                        <p className="card-text">
                            <strong className="text-muted">Phone: </strong>
                            <span className="text-dark">{booking.phone}</span>
                        </p>
                        <p className="card-text">
                            <strong className="text-muted">Guests: </strong>
                            <span className="text-dark">{booking.guestSize}</span>
                        </p>
                    </div>
                </div>
            ) : (
                <p className="text-center text-muted">No booking found.</p>
            )}

            <div className="text-center mt-4">
                <button
                    className="btn mt-3"
                    style={{ backgroundColor: '#faa935', color: 'white' }}
                    onClick={() => navigate("/bookings")}
                >
                    Go Back to Bookings
                </button>
            </div>
        </div>
    );
};

export default SingleBooking;