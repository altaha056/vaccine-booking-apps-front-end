import React from "react";
import "../style/style.css";
import Logo from "../style/logo.svg";

const AdminMainMenu = () => {
  return (
    <div className="mainmenu-admin">
      <div className="header">
        <div className="navbar">
          <h1>Daftar Program Vaksinasi</h1>
        </div>
        <div className="profile">
          <a>Admin Altaha</a>
        </div>
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
              <span className="lihat">Lihat</span>
            </td>
            <td>
              <span className="ubah">Ubah</span>
              <br />
              <span className="hapus">Hapus</span>
            </td>
            <td>
              <span className="konfirmasi">Konfirmasi</span>
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
              <span className="lihat">Lihat</span>
            </td>
            <td>
              <span className="ubah">Ubah</span>
              <br />
              <span className="hapus">Hapus</span>
            </td>
            <td>
              <span className="konfirmasi">Konfirmasi</span>
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
              <span className="lihat">Lihat</span>
            </td>
            <td>
              <span className="ubah">Ubah</span>
              <br />
              <span className="hapus">Hapus</span>
            </td>
            <td>
              <span className="konfirmasi">Konfirmasi</span>
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
              <span className="lihat">Lihat</span>
            </td>
            <td>
              <span className="ubah">Ubah</span>
              <br />
              <span className="hapus">Hapus</span>
            </td>
            <td>
              <span className="konfirmasi">Konfirmasi</span>
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
              <span className="lihat">Lihat</span>
            </td>
            <td>
              <span className="ubah">Ubah</span>
              <br />
              <span className="hapus">Hapus</span>
            </td>
            <td>
              <span className="konfirmasi">Konfirmasi</span>
            </td>
          </tr>
        </table>
        <button>Tambah Program</button>
      </div>
      <div className="footer">
        <img src={Logo} alt="footer" />
      </div>
    </div>
  );
};

export default AdminMainMenu;
