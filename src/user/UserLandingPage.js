import React from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
const UserLandingPage = () => {
  return (
    <>
      <UserHeader />
      <div className="mainmenu-user">
        <div className="content">
          <p>Wujudkan Indonesia sehat, aman, dan produktif</p>
          <h1>Indonesia tanggap Covid-19</h1>

          <div className="dialog-button">
            <Link to="/user/vaccine-list" style={{ textDecoration: "inherit" }}>
              <div className="back">Lihat Lokasi</div>
            </Link>
            <Link to="/user/agreement" style={{ textDecoration: "inherit" }}>
              <div className="add">Daftar Vaksin</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLandingPage;
