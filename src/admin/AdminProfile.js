import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutadmin } from "../store/actions/admins";
import "../style/style.css";
import { AdminHeader } from "./AdminHeader";
import { toast } from "react-toastify";
import AdminLogin from "./AdminLogin";

const AdminProfile = () => {
  const { admin } = useSelector((state_admin) => state_admin);

  const dispatch = useDispatch();

  return (
    <>
      {admin ? (
        <>
          <div className="mainmenu-admin">
            <AdminHeader />
            <div className="content">
              <div className="container-dual">
                <div className="profile">
                  <div className="property">
                    <div className="field">Nama</div>
                    <div className="value">Altaha</div>
                  </div>
                  <div className="property">
                    <div className="field">Email</div>
                    <div className="value">altaha@gmail.com</div>
                  </div>

                  <button
                    onClick={() => {
                      dispatch(logoutadmin());
                      toast.warn("kamu sudah keluar");
                    }}
                    style={{ textDecoration: "inherit" }}
                    className="back"
                  >
                    <div>Keluar</div>
                  </button>
                </div>
                <div className="profile">
                  <div className="property">
                    <div className="field">Jabatan</div>
                    <div className="value">Administrator</div>
                  </div>
                  <div className="property">
                    <div className="field">Status</div>
                    <div className="value">Aktif</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <AdminLogin />
          {toast.info("anda harus login sebagai admin")}
        </>
      )}
    </>
  );
};

export default AdminProfile;
