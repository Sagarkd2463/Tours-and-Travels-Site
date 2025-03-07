import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login from '../components/Login/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import UserBookings from '../components/Booking/UserBookingsForEmail';
import SingleBooking from '../components/Booking/SingleBookingForEmail';
import About from '../pages/About';
import FirebaseSingleBooking from '../components/Booking/SingleBookingForFirebase';
import FirebaseUserBookings from '../components/Booking/UserBookingsForFirebase';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/tours' element={<Tours />} />
            <Route path='/tours/:id' element={<TourDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/tours/search' element={<SearchResultList />} />
            <Route path='/thank-you' element={<ThankYou />} />
            <Route path="/bookings" element={<UserBookings />} />
            <Route path="/booking/:id" element={<SingleBooking />} />
            <Route path="/bookings/firebase" element={<FirebaseUserBookings />} />
            <Route path="/bookings/firebase/:id" element={<FirebaseSingleBooking />} />
        </Routes>
    );
};

export default Routers;