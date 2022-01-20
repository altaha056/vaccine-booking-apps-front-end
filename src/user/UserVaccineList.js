import React, { useEffect } from "react";

import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import { getVaccineList } from "../config/api/vaccine-post";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import Loading from "../style/Loading";

const UserVaccineList = () => {
  const [vaccineList, setVaccineList] = useState([]);

  useEffect(() => {
    getVaccineList()
      .then(({ data }) => {
        setVaccineList(data);
        toast.success("Seluruh data berhasil ditampilkan");
      })
      .catch(() => {
        toast.error("oops sepertinya ada kesalahan");
      });
  }, []);

  const formatDate = (date) => moment(date).locale("id").format("ll");
  const formatHour = (date) => moment(date).format("LT");

  return vaccineList ? (
    <>
      <UserHeader />
      <div className="mainmenu-user">
        <div className="content">
          <h2>Daftar Vaksinasi yang Akan dilaksanakan</h2>
          <table>
            <tr>
              <th>No.</th>
              <th>Deskripsi Vaksin</th>
              <th>Lokasi Vaksin</th>
              <th>Sesi</th>
              <th>Jenis Vaksin</th>
              <th>Daftar</th>
            </tr>
            {vaccineList.map((vaccine, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{vaccine.Description}</td>
                <td>{vaccine.Location}</td>
                <td>
                  {vaccine.Sessions.map((ses, i) => (
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
                </td>
                <td>{vaccine.VacType}</td>
                <td>
                  <Link
                    to="/user/reg-vaccine"
                    style={{ textDecoration: "inherit" }}
                  >
                    <div className="ubah">Daftar</div>
                  </Link>
                </td>
              </tr>
            ))}
          </table>

          <Link to="/user/agreement">
            <button>Daftar Vaksin</button>
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <UserHeader />
      <Loading />
    </>
  );
};

export default UserVaccineList;
