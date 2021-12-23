import React from "react";
import UserHeader from "./UserHeader";
const UserTicket = () => {
  return (
    <>
      <UserHeader />
      <div className="mainmenu-user2">
        <div className="content">
          <div className="container-dual">
            <div className="profile">
              <h1>Tiket Vaksinasi</h1>
              <div className="property">
                <div className="field">Nama Partisipan</div>
                <div className="value">Altaha</div>
              </div>
              <div className="property">
                <div className="field">NIK</div>
                <div className="value">1234567891123456</div>
              </div>
              <div className="property">
                <div className="field">Alamat</div>
                <div className="value">Jl. Pancasila Nomor 1</div>
              </div>
              <div className="property">
                <div className="field">Nomor Telepon</div>
                <div className="value">08123123123</div>
              </div>
            </div>
            <div className="profile">
              <div className="property">
                <div className="field">Nomor Vaksin</div>
                <div className="value">2839747236482387462384</div>
              </div>
              <div className="property">
                <div className="field">Lokasi Vaksin</div>
                <div className="value">
                  RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka,
                  Kec. Medan Baru, Kota Medan, Sumatera Utara 20154
                </div>
              </div>
              <div className="property">
                <div className="field">Jadwal Vaksin</div>
                <div className="value">12 Januari 2022</div>
              </div>

              <div className="property">
                <div className="field">Sesi Vaksin</div>
                <div className="value">Sesi 1 08.00-12.00 wib</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTicket;
