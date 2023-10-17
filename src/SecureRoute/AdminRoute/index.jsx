/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const AdminRoute = ({ children }) => {
  const cookie = new Cookies();
  const userRole = cookie?.get("role");
  const location = useLocation();

  if (userRole === "admin" || userRole === "super_admin") {
    // console.log(userRole);
    return children;
  }

  //   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
