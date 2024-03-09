import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({
    component,
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("USER_ID") === "ADMIN") {
            return component;
        }
        navigate("/login")
    }, [component, navigate])
}

export default ProtectedRoute