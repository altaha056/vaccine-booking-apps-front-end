import React from "react";
import { Link, NavLink } from "react-router-dom";

export const AdminHeader = () => {
  return (
    <div className="header">
      <div className="navbar">
        <NavLink
          className="item"
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
          Daftar Program Vaksinasi
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
          Berita Vaksinasi
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
        className="profile item"
      >
        Admin Altaha
      </NavLink>
    </div>
  );
};
