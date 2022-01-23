import React, { useEffect, useState } from "react";

import "../style/style.css";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import {
  getParticipantbyId,
  getParticipantByVacId,
  getVacbyId,
} from "../config/api/vaccine-post";
import { AdminHeader } from "./AdminHeader";
import UserNoParticipant from "../user/UserNoParticipant";
const AdminParticipantList = () => {
  const [participantData, setParticipantData] = useState([]);
  const [vaccinationData, setVaccinationData] = useState(null);

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
  useEffect(() => {
    getVacbyId(id)
      .then(({ data }) => {
        console.log(data);
        setVaccinationData(data);
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
                <div className="value">{vaccinationData?.Location}</div>
              </div>
              <div className="property">
                <div className="field">Alamat</div>
                <div className="value">{vaccinationData?.Address}</div>
              </div>
            </div>
            <div className="profile">
              <div className="property">
                <div className="field">Jadwal dan Sesi Vaksin</div>
                <div className="value">
                  {vaccinationData?.Sessions.map((ses, i) => (
                    <>
                      {ses.Description}: <br />
                      {formatDate(ses.StartTime)}
                      {" - "}
                      {formatDate(ses.EndTime)} <br />
                      {formatHour(ses.StartTime)} {" - "}
                      {formatHour(ses.EndTime)}
                      <br />
                      <br />
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div className="profile">
              <div className="property">
                <div className="field">Jenis Vaksin</div>
                <div className="value">{vaccinationData?.VacType}</div>
              </div>
              <div className="property">
                <div className="field">Stok Vaksin</div>
                <div className="value">{vaccinationData?.Stock}</div>
              </div>
            </div>
            <div className="profile"></div>
          </div>
          {participantData.length != 0 ? (
            <>
              <h2>Daftar Partisipan</h2>
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

              <div className="dialog-button">
                <Link to="/admin/ownvac" style={{ textDecoration: "inherit" }}>
                  <div className="back">Kembali</div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2>Belum ada partisipan</h2>
              <div className="dialog-button">
                <Link to="/admin/ownvac" style={{ textDecoration: "inherit" }}>
                  <div className="back">Kembali</div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminParticipantList;
