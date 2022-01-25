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
  const zulutime = "";
  const [inputList, setInputList] = useState([
    {
      Description: "",
      StartTime: "",
      EndTime: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const { admin } = useSelector((state_admin) => state_admin);

  const baseData = {
    description: "",
    location: "",
    address: "",
    latitude: 0,
    longitude: 0,
    sessions: inputList,
    vacType: "",
    stock: 1,
  };
  const [data, setData] = useState(baseData);

  const handleInput = (e) => {
    const name = e.target.id;
    const value =
      e.target.type == "number" ? Number(e.target.value) : e.target.value;

    setData({ ...data, [name]: value });
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

  const ambilTempat = useCallback(
    (tempat) => {
      console.log(tempat);
      if (tempat)
        setData({
          ...data,
          address: tempat.place_name,
          latitude: tempat.center[0],
          longitude: tempat.center[1],
          location: tempat.text,
        });
    },
    [data]
  );

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { Description: "", StartTime: "", EndTime: "" },
    ]);
  };

  const addZulu = ":00Z00:00";

  return (
    <>
      {admin ? (
        <>
          <AdminHeader />;
          <div className="mainmenu-admin">
            <div className="content">
              <h2>Tambah Kegiatan Vaksinasi Baru</h2>

              <form spellCheck="false" onSubmit={handleSubmit}>
                <div className="container-dual">
                  <div className="profile">
                    <AdminMapBox onChangePlace={ambilTempat} />
                    <br />

                    <p>Deskripsi Vaksinasi</p>
                    <textarea
                      className="inputpeta"
                      type="text"
                      id="description"
                      onChange={handleInput}
                      value={data.description}
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
                    <p>Stok Vaksin</p>
                    <input
                      className="inputuser"
                      type="number"
                      id="stock"
                      onChange={handleInput}
                      value={data.stock}
                      required
                    />
                    <input type="submit" className="add" value="Tambah" />
                  </div>
                  <div className="profile">
                    <p>Lokasi</p>
                    <input
                      className="inputuser"
                      type="text"
                      id="location"
                      onChange={handleInput}
                      value={data.location}
                      required
                    />

                    <p>Alamat</p>
                    <textarea
                      className="inputpeta"
                      type="text"
                      id="address"
                      onChange={handleInput}
                      value={data.address}
                      required
                    />
                    <p>Latitude</p>
                    <input
                      className="inputuser"
                      type="text"
                      id="latitude"
                      onChange={handleInput}
                      value={data.latitude}
                      required
                    />
                    <p>Longitude</p>
                    <input
                      className="inputuser"
                      type="text"
                      id="longitude"
                      onChange={handleInput}
                      value={data.longitude}
                      required
                    />

                    {/*  */}
                    {inputList.map((x, i) => {
                      return (
                        <>
                          <p className="value">
                            Sesi {i + 1}
                            {inputList.length !== 1 && (
                              <button
                                onClick={() => handleRemoveClick(i)}
                                className="hapus-sesi"
                              >
                                Hapus sesi
                              </button>
                            )}
                            {inputList.length - 1 === i && (
                              <button
                                onClick={handleAddClick}
                                className="tambah-sesi"
                              >
                                Tambah sesi
                              </button>
                            )}
                          </p>
                          <p>Deskripsi sesi</p>
                          <input
                            name="Description"
                            className="inputuser"
                            type="text"
                            placeholder="Masukkan nama sesi"
                            value={x.Description}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                          <p>Jadwal mulai sesi</p>
                          <input
                            type="datetime-local"
                            name="StartTime"
                            className="inputuser"
                            value={x.StartTime}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                          <p>Jadwal selesai sesi</p>
                          <input
                            type="datetime-local"
                            name="EndTime"
                            className="inputuser"
                            value={x.EndTime}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </>
                      );
                    })}

                    {JSON.stringify(data)}
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
