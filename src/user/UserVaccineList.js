import React, { useEffect } from "react";

import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import { getVaccineList } from "../config/api/vaccine-post";
import { useState } from "react";
import moment from "moment";

const UserVaccineList = () => {
  const [vaccineList, setVaccineList] = useState([]);

  useEffect(() => {
    getVaccineList().then(({ data }) => {
      setVaccineList(data);
    });
  }, []);

  const formatDate = (date) => moment(date).locale("id").format("ll");
  const formatHour = (date) => moment(date).format("LT");

  return (
    <>
      <UserHeader />
      <div className="mainmenu-user">
        <div className="content">
          <h2>Daftar Vaksinasi yang Akan dilaksanakan</h2>
          <table>
            <tr>
              <th>No.</th>
              <th>Lokasi Vaksin</th>
              <th>Tanggal Vaksin</th>
              <th>Jadwal Vaksin</th>
              <th>Vaksin</th>
              <th>Stok</th>
              <th>Daftar</th>
            </tr>
            {vaccineList.map((vaccine, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{vaccine.Description}</td>
                <td>
                  {vaccine.Sessions.map((ses, i) => (
                    <>
                      {ses.Description} <br />
                      {formatDate(ses.StartTime)}
                      {" - "}
                      {formatDate(ses.EndTime)} <br />
                    </>
                  ))}
                </td>
                <td>
                  {vaccine.Sessions.map((ses, i) => (
                    <>
                      {ses.Description}
                      <br /> {formatHour(ses.StartTime)} {" - "}
                      {formatHour(ses.EndTime)}
                      <br />
                    </>
                  ))}
                </td>
                <td>{vaccine.VacType}</td>
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
            ))}
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
