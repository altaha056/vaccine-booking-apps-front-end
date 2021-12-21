import React from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
const UserNotLogin = () => {
  return (
    <>
      <UserHeader />
      <div className="mainmenu-user2">
        <div className="content">
          <p>
            Kelihatannya kamu belum login <br />
            Yuk, login dulu
          </p>

          <div className="dialog-button">
            <Link to="/user/register" style={{ textDecoration: "inherit" }}>
              <div className="back">Daftar</div>
            </Link>
            <Link to="/user/login" style={{ textDecoration: "inherit" }}>
              <div className="add">Masuk</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNotLogin;
