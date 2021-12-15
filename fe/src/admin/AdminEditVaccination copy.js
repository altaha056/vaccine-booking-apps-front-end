import React, { useEffect, useState } from "react";
import "../style/style.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";

const lokasivaksin = [
  { value: "RS USU", label: "RS USU" },
  { value: "RS Bhayangkara", label: "RS Bhayangkara" },
  { value: "RS Permata", label: "RS Permata" },
];

const jenisvaksin = [
  { value: "Astra zaneca", label: "Astra zaneca" },
  { value: "Sinovac", label: "Sinovac" },
  { value: "Moderna", label: "Moderna" },
  { value: "Pfizer", label: "Pfizer" },
];

const sesivaksin = [
  { value: "Sesi 1. 07:00 - 12:00", label: "Sesi 1. 07:00 - 12:00" },
  { value: "Sesi 2. 13:00 - 16.00", label: "Sesi 2. 13:00 - 16.00" },
];

const AdminEditVaccination = () => {
  return (
    <div className="mainmenu-admin">
      <div className="header">
        <div className="navbar">
          <h1 className="active">Edit Program Vaksinasi</h1>
        </div>
        <div className="profile">
          <h1>Admin Altaha</h1>
        </div>
      </div>
      <div className="content">
        <div className="container-dual">
          <div className="profile">
            <div className="property">
              <div className="field">Lokasi Awal</div>
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
          </div>
          <form>
            <p>Lokasi Vaksin</p>
            <div className="dropdown">
              <Select options={lokasivaksin} />
            </div>
            <p>Sesi Vaksin</p>
            <div className="dropdown">
              <Select options={sesivaksin} />
            </div>

            <div className="kirikanan">
              <div className="kiri">
                <p>Jenis Vaksin</p>
                <div className="dropdown">
                  <Select options={jenisvaksin} />
                </div>
              </div>
              <div className="kanan">
                <p>Stok Vaksin</p>
                <input
                  className="inputnumber"
                  type="number"
                  name="stok vaksin"
                  min="10"
                  max="100"
                  required
                />
              </div>
            </div>
            <div className="dialog-button">
              <Link to="/admin/main-menu" style={{ textDecoration: "inherit" }}>
                <div className="back">Kembali</div>
              </Link>
              <input type="submit" className="add" value="Ubah" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditVaccination;
