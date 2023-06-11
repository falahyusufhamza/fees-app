import React from 'react'
import { useNavigate } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';

const ProtectedRoute = ({
    component,
}) => {
    const navigate = useNavigate();
    if (localStorage.getItem("USER_ID") === "ADMIN") {
        return component;
    }
    navigate("/login")
}

export default ProtectedRoute