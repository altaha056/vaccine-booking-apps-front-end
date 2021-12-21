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
              <th>Vaksin</th>
              <th>Stok</th>
            </tr>
            <tr>
              <td>1.</td>
              <td>
                RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka,
                Kec. Medan Baru, Kota Medan, Sumatera Utara 20154
              </td>
              <td>Sesi 1 Kamis 27 November 2021 08.00 - 11.30 WIB.</td>
              <td>Sinovac</td>
              <td>240</td>
            </tr>
            <tr>
              <td>2.</td>
              <td>
                RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka,
                Kec. Medan Baru, Kota Medan, Sumatera Utara 20154
              </td>
              <td>Sesi 1 Kamis 27 November 2021 08.00 - 11.30 WIB.</td>
              <td>Sinovac</td>
              <td>240</td>
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
