import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/config";
import "../../styles/UserBookings.css";
import axios from "axios";
import { Button } from "reactstrap";

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchBookings = async () => {
            try {
                setLoading(true);
                setError(null);

                const accessToken = localStorage.getItem("accessToken");

                if (!accessToken) {
                    throw new Error("Token missing. Please log in.");
                }

                const response = await axios.get(`${BASE_URL}/booking/user_bookings`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = response.data.data;

                if (response.data.success) {
                    if (data.length === 0) {
                        toast.info("No bookings found for this user.");
                    }
                    setBookings(data);
                } else {
                    throw new Error(response.data.message || "Failed to fetch bookings.");
                }
            } catch (err) {
                console.error("Error fetching bookings:", err.message);
                setError(err.response?.data?.message || "Something went wrong.");
                toast.error(err.response?.data?.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user, navigate]);

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
        <div className="container my-7">
            <h1 className="text-center mb-4" style={{ color: "#ff7e01" }}>Your Booked Tours</h1>
            <div className="row g-4">
                {bookings.map((booking) => (
                    <div className="col-md-6 col-lg-4 g-3" key={booking._id}>
                        <div className="card shadow-sm h-100 border-custom border-2">
                            <div className="card-body">
                                <h5 className="card-title mb-3" style={{ color: "#faa935" }}>
                                    {booking.tourName}
                                </h5>

                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn btn-primary border-0"
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
                <div className="mt-4 text-center">
                    <Button
                        color="primary"
                        className="ps-4 pe-4"
                        onClick={() => navigate('/home')}
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserBookings;