import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import { getParticipantbyUser } from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import Loading from "../style/Loading";
import { useSelector } from "react-redux";
import UserNoParticipant from "./UserNoParticipant";
import UserNotLogin from "./UserNotLogin";

const UserVaccineInformation = () => {
  const [participantList, setParticipantList] = useState(null);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    getParticipantbyUser()
      .then(({ data }) => {
        console.log(data);
        setParticipantList(data);
      })
      .catch((err) => {
        console.log(err.response);
        toast.warn("hmm sepertinya ada kesalahan");
      });
  }, []);

  if (participantList == null) {
    toast.info("tidak ada data untuk ditampilkan");
  } else if (participantList > 0) {
    toast.info("seluruh data berhasil ditampilkan");
  }
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
                  <th>NIK</th>
                  <th>Nomor Telepon</th>
                  <th>Lokasi Vaksin</th>
                  <th>Jadwal Vaksin</th>
                  <th>Sesi Vaksin</th>
                  <th>Keterangan</th>
                  <th>Tiket</th>
                </tr>
                {participantList.map((par, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{par.Fullname}</td>
                    <td>{par.Nik}</td>
                    <td>{par.PhoneNumber}</td>
                    <td>{par.Vac.Location}</td>
                    <td>{par.Session.StartTime}</td>
                    <td>{par.Session.StartTime}</td>
                    <td>{par.Status}</td>
                    <td>
                      <Link
                        to="/user/ticket"
                        style={{ textDecoration: "inherit" }}
                      >
                        <div className="ubah">Lihat</div>
                      </Link>
                    </td>
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
      {user ? null : <UserNotLogin />}
      <UserHeader />
      <Loading />
    </>
  );
};

export default UserVaccineInformation;
