import React from "react";
import { NavLink } from "react-router-dom";
import "../style/style.css";

export const AdminHeader = () => {
  return (
    <div className="header">
      <div className="navbar">
        <NavLink
          to="/admin/main-menu"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#006d7c",
                  fontWeight: "600",
                  textDecoration: "none",
                }
              : { color: "#b7b7b7", textDecoration: "none" }
          }
        >
          <div className="item">Daftar Program Vaksinasi</div>
        </NavLink>
        <NavLink
          to="/admin/ownvac"
          className="item"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#006d7c",
                  fontWeight: "600",
                  textDecoration: "none",
                }
              : { color: "#b7b7b7", textDecoration: "none" }
          }
        >
          <div className="item">Vaksinasi oleh Saya</div>
        </NavLink>
        <NavLink
          to="/admin/news"
          className="item"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#006d7c",
                  fontWeight: "600",
                  textDecoration: "none",
                }
              : { color: "#b7b7b7", textDecoration: "none" }
          }
        >
          <div className="item">Berita Vaksinasi</div>
        </NavLink>
      </div>
      <NavLink
        to="/admin/profile"
        style={({ isActive }) =>
          isActive
            ? {
                color: "#006d7c",
                fontWeight: "600",
                textDecoration: "none",
              }
            : { color: "#b7b7b7", textDecoration: "none" }
        }
        className="profile"
      >
        <div className="item">Admin Altaha</div>
      </NavLink>
    </div>
  );
};
