import React, { useEffect, useState } from "react";
import "../style/style.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";

const lokasivaksin = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
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

const AdminAddVaccination = () => {
  const [daftarRs, setRS] = useState([]);

  const getRS = () => {
    axios
      .get("https://dekontaminasi.com/api/id/covid19/hospitals")
      .then((response) => {
        console.log(response);
        const myRepo = response.data;
        setRS(myRepo);
      });
  };
  useEffect(() => getRS(), []);

  return (
    <div className="mainmenu-admin">
      <div className="header">
        <div className="navbar">
          <h1>Tambah Program Vaksinasi</h1>
        </div>
        <div className="profile">
          <a>Admin Altaha</a>
        </div>
      </div>
      <div className="content">
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
            <input type="submit" className="add" value="Tambah" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddVaccination;
