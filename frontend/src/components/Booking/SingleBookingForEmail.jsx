import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../styles/SingleBooking.css';
import axios from 'axios';

const SingleBooking = () => {
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const { user } = useContext(AuthContext);
    const { id } = useParams();
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

                const response = await axios.get(`${BASE_URL}/booking/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const fetchedBooking = response.data.data;
                setBooking(fetchedBooking);
            } catch (err) {
                console.error("Error fetching booking:", err.message);

                if (err.response) {
                    toast.error(err.response.data.message || "Failed to fetch booking details.");
                    setError(err.response.data.message);
                } else {
                    toast.error("Something went wrong!");
                    setError("Something went wrong!");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [user, id, navigate]);

    const handleUpdate = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            await axios.put(`${BASE_URL}/booking/${id}`, editData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            toast.success("Booking updated successfully!");
            setBooking({ ...booking, ...editData });
            setEditModalOpen(false);
        } catch (err) {
            console.error("Error updating booking:", err.message);
            toast.error(err.response?.data?.message || "Failed to update booking.");
        }
    };

    const handleDelete = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            await axios.delete(`${BASE_URL}/booking/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            toast.success("Booking deleted successfully!");
            navigate('/bookings');
        } catch (err) {
            console.error("Error deleting booking:", err.message);
            toast.error(err.response?.data?.message || "Failed to delete booking.");
        }
    };

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
                    className="btn mt-3 btn-warning"
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
            <h1 className="text-center mb-4 text-primary">Booking Details</h1>
            <div className="card shadow-lg p-4 border-0 rounded">
                <div className="card-body">
                    <h5 className="card-title text-warning">{booking.tourName}</h5>
                    <ul className="list-unstyled mt-3">
                        <li><strong className='fs-5'>Booked Date: </strong> <span className='fs-5 fst-italic'> {new Date(booking.bookedAt).toLocaleDateString('en-IN')} </span></li>
                        <li><strong className='fs-5'>Full Name: </strong> <span className='fs-5 fst-italic'> {booking.fullName} </span></li>
                        <li><strong className='fs-5'>Email: </strong> <span className='fs-5 fst-italic'> {booking.userEmail} </span></li>
                        <li><strong className='fs-5'>Phone: </strong> <span className='fs-5 fst-italic'> {booking.phone} </span></li>
                        <li><strong className='fs-5'>Guests: </strong> <span className='fs-5 fst-italic'> {booking.guestSize} </span></li>
                        <li><strong className='fs-5'>Total Amount: </strong> <span className='fs-5 fst-italic'> Rs. {booking.totalAmount ?? 'N/A'} </span></li>
                    </ul>
                </div>
            </div>
            <div className="mt-4 text-end">
                <Button
                    color="primary"
                    className="me-2"
                    onClick={() => {
                        setEditModalOpen(true);
                        setEditData(booking);
                    }}>
                    Edit
                </Button>

                <Button
                    color="danger"
                    className="me-2"
                    onClick={handleDelete}>
                    Delete
                </Button>

                <Button
                    color="dark"
                    onClick={() => navigate('/bookings')}>
                    Go to Bookings
                </Button>
            </div>

            <Modal
                isOpen={isEditModalOpen}
                toggle={() => setEditModalOpen(!isEditModalOpen)}
                centered
                size="lg"
                className="modal-dialog-scrollable"
            >
                <ModalHeader toggle={() => setEditModalOpen(!isEditModalOpen)}>
                    <h5 className="modal-title text-primary">Edit Booking</h5>
                </ModalHeader>

                <ModalBody>
                    <Form className="p-3">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label for="tourName" className="form-label fw-bold">
                                        Tour Name
                                    </Label>
                                    <Input
                                        id="tourName"
                                        value={editData.tourName || ''}
                                        onChange={(e) => setEditData({ ...editData, tourName: e.target.value })}
                                        className="form-control"
                                        placeholder="Enter tour name"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label for="fullName" className="form-label fw-bold">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="fullName"
                                        value={editData.fullName || ''}
                                        onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                                        className="form-control"
                                        placeholder="Enter full name"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label for="email" className="form-label fw-bold">
                                        Email
                                    </Label>
                                    <Input
                                        id="userEmail"
                                        type="email"
                                        value={editData.userEmail || ''}
                                        onChange={(e) => setEditData({ ...editData, userEmail: e.target.value })}
                                        className="form-control"
                                        placeholder="Enter email"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label for="phone" className="form-label fw-bold">
                                        Phone
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="number"
                                        value={editData.phone || ''}
                                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                        className="form-control"
                                        placeholder="Enter phone number"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label for="guestSize" className="form-label fw-bold">
                                        Guest Size
                                    </Label>
                                    <Input
                                        id="guestSize"
                                        type="number"
                                        value={editData.guestSize || ''}
                                        onChange={(e) => setEditData({ ...editData, guestSize: e.target.value })}
                                        className="form-control"
                                        placeholder="Enter number of guests"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label for="totalAmount" className="form-label fw-bold">
                                        Total Amount
                                    </Label>
                                    <Input
                                        id="totalAmount"
                                        type="number"
                                        value={editData.totalAmount || ''}
                                        onChange={(e) => setEditData({ ...editData, totalAmount: e.target.value })}
                                        className="form-control"
                                        placeholder="Enter total amount"
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-between">
                    <Button
                        color="primary"
                        onClick={handleUpdate}
                        className="px-4 rounded-pill"
                    >
                        Save Changes
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => setEditModalOpen(false)}
                        className="px-4 rounded-pill"
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default SingleBooking;