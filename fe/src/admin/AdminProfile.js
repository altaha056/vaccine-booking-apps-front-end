import React from "react";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  return (
    <div className="mainmenu-admin">
      <div className="header">
        <div className="navbar">
          <Link to="/admin/main-menu" style={{ textDecoration: "inherit" }}>
            <h1>Daftar Program Vaksinasi</h1>
          </Link>
          <Link to="/admin/news" style={{ textDecoration: "inherit" }}>
            <h1>Berita Vaksinasi</h1>
          </Link>
        </div>
        <div className="profile">
          <h1>
            <span>Admin Altaha</span>
          </h1>
        </div>
      </div>
      <div className="content">
        <Link to="/admin/login">
          <button>Keluar</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminProfile;
