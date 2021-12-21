import React from "react";
import UserHeader from "./UserHeader";
const UserVaccineInformation = () => {
  return (
    <>
      <UserHeader />

      <div className="mainmenu-user2">
        <div className="content">
          <h1>Daftar Vaksinasi Saya</h1>

          <table>
            <tr>
              <th>No.</th>
              <th>Nama Partisipan</th>
              <th>NIK</th>
              <th>Nomor Telepon</th>
              <th>Lokasi Vaksin</th>
              <th>Jadwal Vaksin</th>
              <th>Keterangan</th>
              <th>Tiket</th>
            </tr>
            <tr>
              <td>1.</td>
              <td>Altaha</td>
              <td>1234567891123456</td>
              <td>08123123123</td>
              <td>RS Bhayangkara</td>
              <td>Senin, 11 Januari 2022. 08.00 - 12.00 WIB</td>
              <td>
                <div className="konfirmasi">Accepted</div>
              </td>
              <td>Unduh</td>
            </tr>
            <tr>
              <td>2.</td>
              <td>Aditya</td>
              <td>1234567891123456</td>
              <td>RS Bhayangkara</td>
              <td>Senin, 11 Januari 2022. 08.00 - 12.00 WIB</td>
              <td>08123123123</td>
              <td>
                <div className="na">Pending</div>
              </td>
              <td>-</td>
            </tr>
            <tr>
              <td>3.</td>
              <td>Bagja</td>
              <td>1234567891123456</td>
              <td>08123123123</td>
              <td>RS Bhayangkara</td>
              <td>Senin, 11 Januari 2022. 08.00 - 12.00 WIB</td>
              <td>
                <div className="hapus">Rejected</div>
              </td>
              <td>-</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserVaccineInformation;
