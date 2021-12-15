import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";
const AdminMainMenu = () => {
  return (
    <div className="mainmenu-admin">
      <div className="header">
        <div className="navbar">
          <h1>
            <span>Daftar Program Vaksinasi</span>
          </h1>
          <Link to="/admin/news" style={{ textDecoration: "inherit" }}>
            <h1>Berita Vaksinasi</h1>
          </Link>
        </div>
        <Link to="/admin/profile" style={{ textDecoration: "inherit" }}>
          <div className="profile">
            <h1>Admin Altaha</h1>
          </div>
        </Link>
      </div>
      <div className="content">
        <table>
          <tr>
            <th>No.</th>
            <th>Lokasi Vaksin</th>
            <th>Sesi Vaksin</th>
            <th>Vaksin</th>
            <th>Stok</th>
            <th>Sisa Stok</th>
            <th>Peserta</th>
            <th>Edit</th>
            <th>Konfirmasi</th>
          </tr>
          <tr>
            <td>1.</td>
            <td>
              RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka, Kec.
              Medan Baru, Kota Medan, Sumatera Utara 20154
            </td>
            <td>Sesi 1 Kamis 27 November 2021 08.00 - 11.30 WIB.</td>
            <td>Sinovac</td>
            <td>240</td>
            <td>239</td>
            <td>
              <div className="lihat">Lihat</div>
            </td>
            <td>
              <Link to="/admin/edit-vaccination">
                <div className="ubah">Ubah</div>
              </Link>
              <div className="hapus">Hapus</div>
            </td>
            <td>
              <div className="konfirmasi">Konfirmasi</div>
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>
              RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka, Kec.
              Medan Baru, Kota Medan, Sumatera Utara 20154
            </td>
            <td>Sesi 1 Kamis 27 November 2021 08.00 - 11.30 WIB.</td>
            <td>Sinovac</td>
            <td>240</td>
            <td>239</td>
            <td>
              <div className="lihat">Lihat</div>
            </td>
            <td>
              <div className="na">N/A</div>
            </td>
            <td>
              <div className="na">Published</div>
            </td>
          </tr>
        </table>
        <Link to="/admin/add-vaccination">
          <button>Tambah Program</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminMainMenu;
