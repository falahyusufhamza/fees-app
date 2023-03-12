import React from 'react'
import LoginPage from '../../pages/LoginPage';

const ProtectedRoute = ({
    component,
}) => {
    if (localStorage.getItem("USER_ID") === "ADMIN") {
        return component;
    }
  return (
    <LoginPage/>
  )
}

export default ProtectedRoute