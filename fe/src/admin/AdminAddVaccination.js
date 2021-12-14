import React from "react";
import "../style/style.css";
import Select from "react-select";

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
          <p>Jenis Vaksin</p>
          <div className="dropdown">
            <Select options={jenisvaksin} />
          </div>
          <div className="dialog-button">
            <div className="back">Kembali</div>
            <div className="add">Tambah</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddVaccination;
