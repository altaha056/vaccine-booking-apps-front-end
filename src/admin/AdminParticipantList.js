import React, { useEffect, useState } from "react";

import "../style/style.css";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import {
  getParticipantbyId,
  getParticipantByVacId,
} from "../config/api/vaccine-post";
import { AdminHeader } from "./AdminHeader";
import UserNoParticipant from "../user/UserNoParticipant";
const AdminParticipantList = () => {
  const [participantData, setParticipantData] = useState(null);

  const { id } = useParams();

  const formatDate = (date) => moment(date).locale("id").format("ll");
  const formatHour = (date) => moment(date).format("LT");

  useEffect(() => {
    getParticipantByVacId(id)
      .then(({ data }) => {
        console.log(data);
        setParticipantData(data);
        toast.info("data berhasil dimuat");
      })
      .catch((err) => {
        console.log(err.response);
        toast.warn("hmm sepertinya ada kesalahan");
      });
  }, []);

  return (
    <>
      <AdminHeader />

      <div className="mainmenu-admin">
        <div className="content">
          <div className="container-dual">
            <div className="profile">
              <div className="property">
                <div className="field">Lokasi</div>
                <div className="value">
                  RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka,
                  Kec. Medan Baru, Kota Medan, Sumatera Utara 20154
                </div>
              </div>
              <div className="property">
                <div className="field">Jadwal Vaksin</div>
                <div className="value">Kamis 27 November 2021</div>
              </div>
              <div className="property">
                <div className="field">Sesi Vaksin</div>
                <div className="value">Sesi 1 08.00 - 11.30 WIB.</div>
              </div>
              <div className="property">
                <div className="field">Jenis Vaksin</div>
                <div className="value">Sinovac</div>
              </div>
              <div className="property">
                <div className="field">Stok Vaksin</div>
                <div className="value">240</div>
              </div>

              <div className="dialog-button">
                <Link to="/admin/ownvac" style={{ textDecoration: "inherit" }}>
                  <div className="back">Kembali</div>
                </Link>
              </div>
            </div>
            <div className="profile">
              {participantData ? (
                <>
                  <div className="property">
                    <div className="value">Daftar Peserta</div>
                  </div>
                  <table>
                    <tr>
                      <th>No.</th>
                      <th>Nama Partisipan</th>
                      <th>NIK</th>
                      <th>Nomor Telepon</th>
                      <th>Alamat</th>
                      <th>Sesi</th>
                      <th>Status</th>
                    </tr>
                    {participantData.map((par, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{par.Fullname}</td>
                        <td>{par.Nik}</td>
                        <td>{par.PhoneNumber}</td>
                        <td>{par.Address}</td>
                        <td>
                          {par.Session.Description}
                          <br />
                          {formatHour(par.Session.StartTime)}
                        </td>
                        <td>{par.Status}</td>
                      </tr>
                    ))}
                  </table>
                </>
              ) : (
                <>
                  <UserNoParticipant />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminParticipantList;
