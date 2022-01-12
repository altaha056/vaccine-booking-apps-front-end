import React from "react";

import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
const UserVaccineList = () => {
  return (
    <>
      <UserHeader />
      <div className="mainmenu-user">
        <div className="content">
          <h2>Daftar Kegiatan Vaksinasi yang Akan dilaksanakan</h2>
          <table>
            <tr>
              <th>No.</th>
              <th>Lokasi Vaksin</th>
              <th>Jadwal Vaksin</th>
              <th>Sesi Vaksin</th>
              <th>Vaksin</th>
              <th>Stok</th>
              <th>Daftar</th>
            </tr>
            <tr>
              <td>1.</td>
              <td>
                RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka,
                Kec. Medan Baru, Kota Medan, Sumatera Utara 20154
              </td>
              <td>Sesi 1 08.00 - 11.30 WIB.</td>
              <td>Kamis 27 November 2021 </td>
              <td>Sinovac</td>
              <td>240</td>
              <td>
                <Link
                  to="/user/reg-vaccine"
                  style={{ textDecoration: "inherit" }}
                >
                  <div className="ubah">Daftar</div>
                </Link>
              </td>
            </tr>
            <tr>
              <td>2.</td>
              <td>
                RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka,
                Kec. Medan Baru, Kota Medan, Sumatera Utara 20154
              </td>
              <td>Sesi 1 08.00 - 11.30 WIB.</td>
              <td>Kamis 27 November 2021 </td>
              <td>Sinovac</td>
              <td>240</td>

              <td>
                <Link
                  to="/user/reg-vaccine"
                  style={{ textDecoration: "inherit" }}
                >
                  <div className="ubah">Daftar</div>
                </Link>
              </td>
            </tr>
          </table>

          <Link to="/user/agreement">
            <button>Daftar Vaksin</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserVaccineList;
