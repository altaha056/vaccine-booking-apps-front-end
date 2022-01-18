import React from "react";
import UserHeader from "./UserHeader";
import { Link, Navigate } from "react-router-dom";
import "../style/style.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/users";
const UserProfile = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
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
                <div className="value">{user?.name}</div>
              </div>
              <div className="property">
                <div className="field">NIK</div>
                <div className="value">{user?.nik}</div>
              </div>
              <Link to="/user/info-vacc" style={{ textDecoration: "inherit" }}>
                <div className="add">Jadwal Saya</div>
              </Link>
              <button
                style={{ textDecoration: "inherit" }}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <div className="back">Keluar</div>
              </button>
            </div>
            <div className="profile">
              <div className="property">
                <div className="field">Email</div>
                <div className="value">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
