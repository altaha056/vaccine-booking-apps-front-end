import React from "react";
import UserHeader from "./UserHeader";
import { Link, Navigate } from "react-router-dom";
import "../style/style.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/users";
import { toast } from "react-toastify";
import UserNotLogin from "./UserNotLogin";
import Contoh from "../mapbox/Contoh";

const UserProfile = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      {user ? (
        <>
          <div className="headerTop">
            <UserHeader />
          </div>
          <div className="mainmenu-user2">
            <div className="content">
              <Contoh />

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
                  {/*  */}
                  <div className="dialog-button">
                    <button
                      onClick={() => {
                        dispatch(logout());
                        toast.warn("kamu sudah keluar");
                      }}
                      style={{ textDecoration: "inherit" }}
                      className="back"
                    >
                      <div>Keluar</div>
                    </button>
                    <Link
                      to="/user/info-vacc"
                      style={{ textDecoration: "inherit" }}
                    >
                      <button className="add">Jadwal Saya</button>
                    </Link>
                  </div>
                  {/*  */}
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
      ) : (
        <UserNotLogin />
      )}
    </>
  );
};

export default UserProfile;
