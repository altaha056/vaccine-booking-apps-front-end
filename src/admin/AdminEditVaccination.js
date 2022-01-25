import React, { useCallback, useEffect, useState } from "react";
import "../style/style.css";
import Select from "react-select";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { AdminHeader } from "./AdminHeader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addVacApi,
  getVacbyAdminId,
  getVacbyId,
} from "../config/api/vaccine-post";
import AdminMapBox from "../mapbox/AdminMapBox";
import { updateVac } from "../config/api/vaccine-post";
import moment from "moment";

const AdminEditVaccination = () => {
  useEffect(() => {
    getAllData();
  }, []);

  const { id } = useParams();

  const [priorData, setPriorData] = useState();

  const [inputList, setInputList] = useState([
    {
      description: "",
      startTime: "",
      endTime: "",
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
    id: Number(id),
    description: "",
    location: "",
    address: "",
    latitude: 0,
    longitude: 0,
    sessions: [],
    vacType: "",
    stock: 1,
  };
  const [data, setData] = useState(baseData);

  const getAllData = useCallback(() => {
    getVacbyId(id)
      .then(({ data }) => {
        setPriorData(data);
        setData({
          id: data.ID,
          description: data.Description,
          location: data.Location,
          address: data.Address,
          latitude: data.Latitude,
          longitude: data.Longitude,
          sessions: data.Sessions.map((session) => ({
            id: session.ID,
            description: session.Description,
            startTime: session.StartTime,
            endTime: session.EndTime,
          })),
          vacType: data.VacType,
          stock: data.Stock,
        });
        // toast.info("Seluruh data berhasil dimuat");
      })
      .catch(() => {
        toast.error("oops sepertinya ada kesalahan");
      });
  }, []);
  const handleInput = (e) => {
    const name = e.target.id;
    const value =
      e.target.type == "number" ? Number(e.target.value) : e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      updateVac(data)
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
  const handleAddClick = useCallback(() => {
    setInputList([...data, { description: "", startTime: "", endTime: "" }]);
  }, [data]);

  useEffect(() => {
    setData({ ...data, sessions: inputList });
  }, [inputList]);

  const formatDate = (date) => moment(date).locale("id").format("ll");
  const formatHour = (date) => moment(date).format("LT");

  return (
    <>
      {admin ? (
        <>
          <AdminHeader />;
          <div className="mainmenu-admin">
            <div className="content">
              <h2>Edit Kegiatan Vaksinasi</h2>

              <table>
                <tr>
                  <th>ID</th>
                  <th>Deskripsi Vaksin</th>
                  <th>Lokasi Vaksin</th>
                  <th>Sesi</th>
                  <th>Vaksin</th>
                </tr>

                <tr>
                  <td>{data?.id}.</td>
                  <td>{data?.description}</td>
                  <td style={{ width: 400 }}>
                    {data?.location}
                    <br />
                    {data?.address}
                  </td>
                  <td>
                    {data?.sessions.map((ses, i) => (
                      <>
                        {ses.description}: <br />
                        {formatDate(ses.startTime)}
                        {" - "}
                        {formatDate(ses.endTime)} <br />
                        {formatHour(ses.startTime)} {" - "}
                        {formatHour(ses.endTime)}
                        <br />
                        <br />
                      </>
                    ))}
                  </td>
                  <td>
                    {data?.vacType}

                    <br />
                    {"Stok vaksin: "}
                    {data?.stock}
                  </td>
                </tr>
              </table>
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
                    {data.sessions.map((x, i) => {
                      return (
                        <>
                          <p className="value">
                            Sesi {i + 1}
                            {data.length !== 1 && (
                              <button
                                onClick={() => handleRemoveClick(i)}
                                className="hapus-sesi"
                              >
                                Hapus sesi
                              </button>
                            )}
                            {data.length - 1 === i && (
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
                            name="description"
                            className="inputuser"
                            type="text"
                            placeholder="Masukkan nama sesi"
                            value={x.description}
                            onChange={(e) => handleInput(e, i)}
                          />
                          <p>Jadwal mulai sesi</p>
                          <input
                            type="datetime-local"
                            name="startTime"
                            className="inputuser"
                            value={x.startTime}
                            onChange={(e) => handleInput(e, i)}
                          />
                          <p>Jadwal selesai sesi</p>
                          <input
                            type="datetime-local"
                            name="endTime"
                            className="inputuser"
                            value={x.endTime}
                            onChange={(e) => handleInput(e, i)}
                          />
                        </>
                      );
                    })}

                    {JSON.stringify(data)}
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    {JSON.stringify(inputList)}
                    <p>.</p>
                    <p>.</p>
                    {JSON.stringify(priorData)}
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

export default AdminEditVaccination;
