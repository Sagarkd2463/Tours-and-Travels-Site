import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { BASE_URL } from "../../utils/config";

const SingleBooking = () => {
    const { id } = useParams();
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

    if (loading) return <p>Loading booking details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Booking Details</h1>
            {booking ? (
                <div>
                    <h2>{booking.tourName}</h2>
                    <p>Date: {new Date(booking.bookedAt).toLocaleDateString()}</p>
                    <p>Email: {booking.userEmail}</p>
                    <p>Booking ID: {booking._id}</p>
                </div>
            ) : (
                <p>No booking found.</p>
            )}
        </div>
    );
};

export default SingleBooking;