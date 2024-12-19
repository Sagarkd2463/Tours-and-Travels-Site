import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/config";
import '../../styles/UserBookings.css';

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user) {
                toast.error("Please sign in to view your bookings.");
                navigate("/login");
                return;
            }

            const accessToken = localStorage.getItem("accessToken");

            try {
                const response = await fetch(`${BASE_URL}/booking`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch bookings.");
                }

                const data = await response.json();
                console.log(data);
                setBookings(data.data || []);
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user, navigate]);

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4" style={{ color: '#ff7e01' }}>Your Booked Tours</h1>
            {bookings.length > 0 ? (
                <div className="row g-4">
                    {bookings.map((booking) => (
                        <div className="col-md-6 col-lg-4 g-3" key={booking._id}>
                            <div className="card shadow-sm h-100 border-custom border-2">
                                <div className="card-body">
                                    <h5 className="card-title mb-3" style={{ color: '#faa935' }}>{booking.tourName}</h5>
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
                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <button
                                            className="btn btn-outline-primary w-100"
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
                <div className="text-center mt-5">
                    <p className="text-muted">You have no bookings yet.</p>
                    <button
                        className="btn mt-3"
                        style={{ backgroundColor: '#faa935', color: 'white' }}
                        onClick={() => navigate("/tours")}
                    >
                        Create a Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserBookings;
