import React, { useEffect } from "react";

import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import { getVaccineList } from "../config/api/vaccine-post";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";

const UserVaccineList = () => {
  const [vaccineList, setVaccineList] = useState([]);

  useEffect(() => {
    getVaccineList()
      .then(({ data }) => {
        setVaccineList(data);
        toast.success("Data fetching complete");
      })
      .catch(() => {
        toast.error("internal server error");
      });
  }, []);

  const formatDate = (date) => moment(date).locale("id").format("ll");
  const formatHour = (date) => moment(date).format("LT");

  return (
    <>
      {/* countLength = {vaccineList.length} */}
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

          {/* <table>
            <tr>
              <th>No.</th>
              <th>Deskripsi Vaksin</th>
              <th>Lokasi Vaksin</th>
              <th>Sesi</th>
              <th>Jenis Vaksin</th>
              <th>Daftar</th>
            </tr>
            <tr>
              <td rowSpan={2}>1</td>
              <td rowSpan={2}>ini deskripsi</td>
              <td rowSpan={2}>rs bhayangkara</td>
              <td>sesi 1</td>
              <td rowSpan={2}>astra</td>
              <td rowSpan={2}>daftar</td>
            </tr>
            <tr>
              <td>sesi 1</td>
            </tr>
          </table> */}
          <Link to="/user/agreement">
            <button>Daftar Vaksin</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserVaccineList;
