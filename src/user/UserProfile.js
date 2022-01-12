import React from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import "../style/style.css";
const UserProfile = () => {
  return (
    <>
      <UserHeader />
      <div className="mainmenu-user2">
        <div className="content">
          <h1>Profil Saya</h1>
          <div className="container-dual">
            <div className="profile">
              <div className="property">
                <div className="field">Nama</div>
                <div className="value">Altaha</div>
              </div>
              <div className="property">
                <div className="field">NIK</div>
                <div className="value">1234567891123456</div>
              </div>
              <Link to="/user/info-vacc" style={{ textDecoration: "inherit" }}>
                <div className="add">Jadwal Saya</div>
              </Link>
              <Link to="/user/login" style={{ textDecoration: "inherit" }}>
                <div className="back">Keluar</div>
              </Link>
            </div>
            <div className="profile">
              <div className="property">
                <div className="field">Nomor telepon</div>
                <div className="value">0812344556666</div>
              </div>
              <div className="property">
                <div className="field">Email</div>
                <div className="value">altaha@alta.id</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
