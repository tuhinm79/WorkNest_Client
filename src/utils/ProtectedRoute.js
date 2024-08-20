import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("currentUser");
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    swal({
      title: "You are not logged in!",
      text: "Do you want to log in or register?",
      icon: "warning",
      buttons: {
        login: {
          text: "Login",
          value: "login",
        },
        register: {
          text: "Register",
          value: "register",
        },
        cancel: {
          text: "Cancel",
          value: "cancel",
          visible: true,
        },
      },
    }).then((value) => {
      switch (value) {
        case "login":
          navigate("/login", { state: { from: location } });
          break;
        case "register":
          navigate("/register", { state: { from: location } });
          break;
        default:
          navigate("/");
          break;
      }
    });

    return null; // Prevents the protected component from rendering while waiting for the user's decision.
  }

  return children;
};

export default ProtectedRoute;

