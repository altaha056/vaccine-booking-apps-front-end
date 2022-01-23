import React, { useEffect } from "react";
import "../style/style.css";
import { Link, Navigate } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";

import { getVacbyAdminId, getVaccineList } from "../config/api/vaccine-post";

import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import Loading from "../style/Loading";
import { createSelectorHook, useDispatch, useSelector } from "react-redux";
import AdminLogin from "./AdminLogin";

const AdminOwnVac = () => {
  const [vaccineList, setVaccineList] = useState([]);

  const { admin } = useSelector((state_admin) => state_admin);

  useEffect(() => {
    if (admin)
      getVacbyAdminId(admin.ID)
        .then(({ data }) => {
          setVaccineList(data);
          toast.info("Seluruh data berhasil dimuat");
        })
        .catch(() => {
          toast.error("oops sepertinya ada kesalahan");
        });
  }, [admin]);
  const formatDate = (date) => moment(date).locale("id").format("ll");
  const formatHour = (date) => moment(date).format("LT");

  return admin ? (
    <>
      <AdminHeader />
      <div className="mainmenu-admin">
        <div className="content">
          {vaccineList ? (
            <>
              <h2>Daftar Vaksinasi yang Akan dilaksanakan</h2>
              <table>
                <tr>
                  <th>No.</th>
                  <th>Deskripsi Vaksin</th>
                  <th>Lokasi Vaksin</th>
                  <th>Sesi</th>
                  <th>Jenis Vaksin</th>
                </tr>

                {vaccineList.map((vaccine, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{vaccine.Description}</td>
                    <td style={{ width: 400 }}>
                      {vaccine.Location}
                      <br />
                      {vaccine.Address}
                    </td>
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
                  </tr>
                ))}
              </table>
            </>
          ) : (
            <h2>Tidak ada kegiatan vaksinasi</h2>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <Navigate to="/admin/login" />
      {toast.info("anda harus login sebagai admin")}
    </>
  );
};

export default AdminOwnVac;
