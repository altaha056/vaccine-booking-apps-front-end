import React, { useCallback, useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import {
  getParticipantbyUser,
  updateParticipant,
} from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import Loading from "../style/Loading";
import { useSelector } from "react-redux";
import UserNoParticipant from "./UserNoParticipant";
import UserNotLogin from "./UserNotLogin";
import moment from "moment";
import { deleteParticipant } from "../config/api/vaccine-post";

const UserVaccineInformation = () => {
  const [participantList, setParticipantList] = useState(null);
  const { user } = useSelector((state) => state);

  const formatDate = (date) => moment(date).locale("id").format("ll");
  const formatHour = (date) => moment(date).format("LT");

  const getAllData = useCallback(() => {
    getParticipantbyUser()
      .then(({ data }) => {
        console.log(data);
        setParticipantList(data);
        toast.info("semua data berhasil dimuat");
      })
      .catch((err) => {
        console.log(err.response);
        toast.warn("hmm sepertinya ada kesalahan");
      });
  }, []);

  const deletePar = useCallback((id) => {
    deleteParticipant(id).then(() => {
      getAllData();
      toast.info("data partsipan berhasil dihapus");
    });
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  return participantList ? (
    <>
      <UserHeader />

      <div className="mainmenu-user2">
        <div className="content">
          {participantList.length > 0 ? (
            <>
              <h1>Daftar Vaksinasi Saya</h1>
              <table>
                <tr>
                  <th>No.</th>
                  <th>Nama Partisipan</th>
                  <th>Lokasi Vaksin</th>
                  <th>Alamat Vaksin</th>
                  <th>Jadwal Vaksin</th>
                  <th>Sesi Vaksin</th>
                  <th>Keterangan</th>
                  <th>Edit</th>
                </tr>
                {participantList.map((par, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{par.Fullname}</td>
                    <td>{par.Vac.Location}</td>
                    <td>{par.Vac.Address}</td>
                    <td>{formatDate(par.Session.StartTime)}</td>
                    <td>
                      {par.Session.Description}
                      <br />
                      {formatHour(par.Session.StartTime)}
                    </td>
                    {par.Status == "registered" ? (
                      <td>
                        <Link
                          to={`/user/ticket/${par.ID}`}
                          style={{ textDecoration: "inherit" }}
                        >
                          <div className="ubah">
                            Registered
                            <br />
                            Lihat Tiket
                          </div>
                        </Link>
                      </td>
                    ) : null}

                    {par.Status == "VACCINATED" ? (
                      <td colSpan={2}>
                        <div className="konfirmasi">vaccinated</div>
                      </td>
                    ) : null}
                    {par.Status == "canceled" ? (
                      <td colSpan={2}>
                        <div className="hapus">canceled</div>
                      </td>
                    ) : null}
                    {par.Status == "registered" ? (
                      <td>
                        <Link
                          to={`/user/updateparticipant/${par.ID}`}
                          style={{ textDecoration: "inherit" }}
                        >
                          <div className="ubah">Edit</div>
                        </Link>
                        <br />
                        <div
                          className="hapus"
                          onClick={() => deletePar(par.ID)}
                        >
                          Hapus
                        </div>
                      </td>
                    ) : null}
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
    </>
  ) : (
    <>
      {user ? (
        <>
          <UserHeader />
          <Loading />
        </>
      ) : (
        <UserNotLogin />
      )}
    </>
  );
};

export default UserVaccineInformation;
