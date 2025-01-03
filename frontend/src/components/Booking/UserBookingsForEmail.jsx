import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/config";
import "../../styles/UserBookings.css";
import axios from "axios";

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchBookings = async () => {
            try {
                setLoading(true);

                const accessToken = localStorage.getItem("accessToken");

                if (!accessToken) throw new Error("Token missing. Please log in.");

                const response = await axios.get(`${BASE_URL}/booking`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        dispatch({ type: "LOGOUT" });
                        navigate("/login");
                        toast.error("Session expired. Please log in again.");
                        localStorage.removeItem("accessToken");
                    } else {
                        throw new Error("Failed to fetch bookings.");
                    }
                }

                const data = await response.json();
                setBookings(data.data || []);
                setLoading(false);
                setError(null);
            } catch (err) {
                console.error("Error fetching bookings:", err.message);
                setError(err.message);
                toast.error(err.message);
            }
        };

        fetchBookings();
    }, [user, dispatch, navigate]);

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

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4" style={{ color: "#ff7e01" }}>Your Booked Tours</h1>
            {bookings.length > 0 ? (
                <div className="row g-4">
                    {bookings.map((booking) => (
                        <div className="col-md-6 col-lg-4 g-3" key={booking._id}>
                            <div className="card shadow-sm h-100 border-custom border-2">
                                <div className="card-body">
                                    <h5 className="card-title mb-3" style={{ color: "#faa935" }}>
                                        {booking.tourName}
                                    </h5>
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
                                    <p className="card-text">
                                        <strong className="text-muted">Amount: </strong>
                                        <span className="text-dark">${booking.totalAmount || 0}</span>
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button
                                            className="btn btn-primary"
                                            style={{ backgroundColor: "#ff7e01" }}
                                            onClick={() => navigate(`/booking/${booking._id}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No bookings yet.</p>
            )}
        </div>
    );
};

export default UserBookings;