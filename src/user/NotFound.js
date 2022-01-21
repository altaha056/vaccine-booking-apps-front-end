import React from "react";
import "../style/style.css";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="notfound-bg-login">
        <div className="content-notfound">
          Maaf halaman yang kamu cari tidak ada 😢
          <NavLink
            to="/user/landingpage"
            className="item"
            style={{ textDecoration: "none" }}
          >
            <div className="gotomainmenu-not-found">Go to main menu</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NotFound;
