import React from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserNotLogin from "./UserNotLogin";
const UserAgreementBeforRegisterVaccine = () => {
  const { user } = useSelector((state) => state);
  return (
    <>
      {user ? null : <UserNotLogin />}
      <UserHeader />
      <div className="mainmenu-user2">
        <div className="content">
          <p className="paragraph">Persyaratan vaksinasi:</p>

          <ol>
            <li>Berusia 12 tahun ke atas</li>
            <li>Sehat</li>
            <li>Memiliki KTP/Kartu Keluarga</li>
            <li>Tidak sedang positif COVID-19</li>
          </ol>
          <div className="dialog-button">
            <Link to="/user/landingpage" style={{ textDecoration: "inherit" }}>
              <div className="back">Kembali</div>
            </Link>
            <Link to="/user/reg-vaccine" style={{ textDecoration: "inherit" }}>
              <div className="add">Lanjut</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAgreementBeforRegisterVaccine;
