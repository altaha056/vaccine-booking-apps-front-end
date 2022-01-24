import React, { useCallback, useEffect, useState } from "react";
import "../style/style.css";
import Select from "react-select";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { AdminHeader } from "./AdminHeader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addVacApi } from "../config/api/vaccine-post";
import AdminMapBox from "../mapbox/AdminMapBox";

const AdminAddVaccination = () => {
  const { admin } = useSelector((state_admin) => state_admin);

  const baseData = {
    description: "",
    location: "",
    address: "",
    latitude: "",
    longitude: "",
    sessions: "",
    vacType: "",
    stock: "",
  };
  const [data, setData] = useState(baseData);

  const handleInput = (e) => {
    const name = e.target.id;
    const value = e.target.value;

    setData({ ...data, [name]: value });
    console.log("data: ", data);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      addVacApi(data)
        .then((res) => {
          toast.success("berhasil menambahkan kegiatan vaksinasi baru");
        })
        .catch(({ meta }) => {
          meta.description.forEach((err) => {
            toast.warn(err);
          });
        });
    },
    [data]
  );

  return (
    <>
      {admin ? (
        <>
          <AdminHeader />;
          <div className="mainmenu-admin">
            <div className="content">
              <h2>Tambah Kegiatan Vaksinasi Baru</h2>
              <AdminMapBox/>

              <form spellCheck="false" onSubmit={handleSubmit}>
                <div className="container-dual">
                  <div className="profile">
                    <p>Lokasi</p>
                    <input
                      className="inputuser"
                      type="text"
                      id="location"
                      onChange={handleInput}
                      value={data.location}
                      disabled
                      required
                    />
                    <p>Alamat</p>
                    <input
                      className="inputuser"
                      type="text"
                      id="address"
                      onChange={handleInput}
                      value={data.address}
                      disabled
                      required
                    />
                    <p>Deskripsi Vaksinasi</p>
                    <input
                      className="inputuser"
                      type="text"
                      id="description"
                      onChange={handleInput}
                      value={data.description}
                      required
                    />
                    <p>Stok Vaksin</p>
                    <input
                      className="inputuser"
                      type="number"
                      id="stock"
                      onChange={handleInput}
                      value={data.stock}
                      required
                    />
                  </div>
                  <div className="profile">
                    <p>Latitude</p>
                    <input
                      className="inputuser"
                      type="text"
                      id="latitude"
                      onChange={handleInput}
                      value={data.latitude}
                      disabled
                      required
                    />
                    <p>Longitude</p>
                    <input
                      className="inputuser"
                      type="text"
                      id="longitude"
                      onChange={handleInput}
                      value={data.longitude}
                      disabled
                      required
                    />

                    <p>Jenis Vaksin</p>
                    <input
                      className="inputuser"
                      type="text"
                      id="vacType"
                      onChange={handleInput}
                      value={data.vacType}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navigate to="/admin/login" />
          {toast.info("anda harus login sebagai admin")}
        </>
      )}
    </>
  );
};

export default AdminAddVaccination;
