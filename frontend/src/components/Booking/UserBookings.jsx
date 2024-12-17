import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from "../../utils/config";

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
                navigate('/login');
                return;
            }

            const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await fetch(`${BASE_URL}/booking`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setBookings(response.data.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user, navigate]);

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Your Booked Tours</h1>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}>
                            <h2>{booking.tourName}</h2>
                            <p>Date: {new Date(booking.bookedAt).toLocaleDateString()}</p>
                            <p>Email: {booking.userEmail}</p>
                            <button onClick={() => navigate(`/booking/${booking._id}`)}>
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no bookings yet.</p>
            )}
        </div>
    );
};

export default UserBookings;
