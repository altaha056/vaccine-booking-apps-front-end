import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";

const AdminNews = () => {
  return (
    <div className="mainmenu-admin">
      <div className="header">
        <div className="navbar">
          <Link to="/admin/main-menu" style={{ textDecoration: "inherit" }}>
            <h1>Daftar Program Vaksinasi</h1>
          </Link>
          <h1>
            <span>Berita Vaksinasi</span>
          </h1>
        </div>
        <Link to="/admin/profile" style={{ textDecoration: "inherit" }}>
          <div className="profile">
            <h1>Admin Altaha</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminNews;
