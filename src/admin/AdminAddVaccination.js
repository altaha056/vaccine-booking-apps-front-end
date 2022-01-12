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

const jadwalvaksin = [{ value: "11 Januari 2022", label: "11 Januari 2022" }];
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

const AdminAddVaccination = () => {
  return (
    <div className="mainmenu-admin">
      <div className="header">
        <div className="navbar">
          <h1 className="active">Tambah Program Vaksinasi</h1>
        </div>
        <div className="profile">
          <h1>Admin Altaha</h1>
        </div>
      </div>
      <div className="content">
        <form>
          <p>Lokasi Vaksin</p>
          <div className="dropdown">
            <Select options={lokasivaksin} />
          </div>
          <p>Jadwal Vaksin</p>
          <div className="dropdown">
            <Select options={jadwalvaksin} />
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
            <input type="submit" className="add" value="Tambah" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddVaccination;
