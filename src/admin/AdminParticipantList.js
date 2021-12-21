import React from "react";

import "../style/style.css";
import Select from "react-select";
import { Link } from "react-router-dom";
const AdminParticipantList = () => {
  return (
    <>
      <div className="mainmenu-admin">
        <div className="header">
          <div className="navbar">
            <h1 className="active">Daftar Peserta Vaksinasi</h1>
          </div>
          <div className="profile">
            <h1>Admin Altaha</h1>
          </div>
        </div>
        <div className="content">
          <div className="container-dual">
            <div className="profile">
              <div className="property">
                <div className="field">Lokasi</div>
                <div className="value">
                  RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka,
                  Kec. Medan Baru, Kota Medan, Sumatera Utara 20154
                </div>
              </div>
              <div className="property">
                <div className="field">Sesi Vaksin</div>
                <div className="value">
                  Sesi 1 Kamis 27 November 2021 08.00 - 11.30 WIB.
                </div>
              </div>
              <div className="property">
                <div className="field">Jenis Vaksin</div>
                <div className="value">Sinovac</div>
              </div>
              <div className="property">
                <div className="field">Stok Vaksin</div>
                <div className="value">240</div>
              </div>

              <div className="dialog-button">
                <Link
                  to="/admin/main-menu"
                  style={{ textDecoration: "inherit" }}
                >
                  <div className="back">Kembali</div>
                </Link>
              </div>
            </div>
            <div className="profile">
              <div className="property">
                <div className="value">Peserta</div>
              </div>

              <table>
                <tr>
                  <th>No.</th>
                  <th>Nama Partisipan</th>
                  <th>NIK</th>
                  <th>Nomor Telepon</th>
                  <th>Konfirmasi</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>Altaha</td>
                  <td>1234567891123456</td>
                  <td>08123123123</td>
                  <td>
                    <div className="konfirmasi">Accept</div>
                    <div className="hapus">Reject</div>
                  </td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>Aditya</td>
                  <td>1234567891123456</td>
                  <td>08123123123</td>
                  <td>
                    <div className="na">Accepted</div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminParticipantList;
