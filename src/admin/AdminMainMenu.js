import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";
const AdminMainMenu = () => {
  return (
    <div className="mainmenu-admin">
      <AdminHeader />
      <div className="content">
        <table>
          <tr>
            <th>No.</th>
            <th>Lokasi Vaksin</th>
            <th>Jadwal Vaksin</th>
            <th>Sesi Vaksin</th>
            <th>Vaksin</th>
            <th>Stok</th>
            <th>Sisa Stok</th>
            <th>Peserta</th>
            <th>Edit</th>
          </tr>
          <tr>
            <td>1.</td>
            <td>
              RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka, Kec.
              Medan Baru, Kota Medan, Sumatera Utara 20154
            </td>
            <td>Kamis 27 November 2021 </td>
            <td>Sesi 1 08.00 - 11.30 WIB.</td>
            <td>Sinovac</td>
            <td>240</td>
            <td>239</td>
            <td>
              <Link
                to="/admin/participant"
                style={{ textDecoration: "inherit" }}
              >
                <div className="ubah">Lihat</div>
              </Link>
            </td>
            <td>
              <div className="hapus">Hapus</div>
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>
              RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka, Kec.
              Medan Baru, Kota Medan, Sumatera Utara 20154
            </td>
            <td>Kamis 27 November 2021 </td>
            <td>Sesi 1 13.00.00 - 17.30 WIB.</td>
            <td>Sinovac</td>
            <td>240</td>
            <td>239</td>
            <td>
              <Link
                to="/admin/participant"
                style={{ textDecoration: "inherit" }}
              >
                <div className="ubah">Lihat</div>
              </Link>
            </td>
            <td>
              <div className="na">N/A</div>
            </td>
          </tr>
        </table>
        <Link to="/admin/add-vaccination" style={{ textDecoration: "inherit" }}>
          <div className="add">Tambah Kegiatan</div>
        </Link>
      </div>
    </div>
  );
};

export default AdminMainMenu;
