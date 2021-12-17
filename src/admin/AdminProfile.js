import React from "react";
import { Link } from "react-router-dom";
import "../style/style.css";
import { AdminHeader } from "./AdminHeader";
const AdminProfile = () => {
  return (
    <div className="mainmenu-admin">
      <AdminHeader />
      <div className="content">
        <div className="profile">
          <div className="property">
            <div className="field">Nama</div>
            <div className="value">Altaha</div>
          </div>
          <div className="property">
            <div className="field">Email</div>
            <div className="value">altaha@gmail.com</div>
          </div>
          <div className="property">
            <div className="field">Jabatan</div>
            <div className="value">Administrator</div>
          </div>
          <div className="property">
            <div className="field">Status</div>
            <div className="value">Aktif</div>
          </div>
        </div>
        <Link to="/admin/login" style={{ textDecoration: "inherit" }}>
          <div className="back">Keluar</div>
        </Link>
      </div>
    </div>
  );
};

export default AdminProfile;
