/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = ({ children }) => {
  const cookie = new Cookies();
  const userEmail = cookie?.get("email");
  const location = useLocation();

  if (userEmail) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
