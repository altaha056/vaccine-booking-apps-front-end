import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/vaccine-post";

export default (error) => {
  if (error) {
    let message;
    if (error.response) {
      if (error.response.status === 401 || error.response.data === 400) {
        message = "sesi kamu sudah habis, yuk login lagi";
        // <Navigate to={"/user/login"} />;

        localStorage.removeItem("vac:token");

        window.location.href = "/user/login";
        // dispatch(logout());
        return;
      }
      return Promise.reject(error.response.data);
    }
  }
};
