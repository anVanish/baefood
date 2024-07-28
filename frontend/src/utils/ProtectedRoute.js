import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { openModal } from '../slices/loginModalSlice';

const ProtectedRoute = ({ isAdmin = false }) => {
    const user = localStorage.getItem('user');
    const dispatch = useDispatch();

    if (!user) {
        dispatch(openModal({ isAdmin }));
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
