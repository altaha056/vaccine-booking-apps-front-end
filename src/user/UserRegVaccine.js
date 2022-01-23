import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import UserHeader from "./UserHeader";
import { NavLink } from "react-router-dom";
import VacIcon from "../mapbox/VaccineIcon.png";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";
import UserNotLogin from "./UserNotLogin";
import MapBox from "../mapbox/Mapbox";
import {
  getNearbyFacilities,
  registerParticipant,
} from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import { getVaccineList } from "../config/api/vaccine-post";
import moment from "moment";

const UserRegVaccine = () => {
  const [vaccineList, setVaccineList] = useState([]);
  const [lokasiVaksin, setLokasiVaksin] = useState([]);

  const [sesiVaksin, setSesiVaksin] = useState([]);
  const [selectedVaccineLocation, setSelectedVaccineLocation] = useState();
  const [selectedSessionId, setSelectedSessionId] = useState();

  useEffect(() => {
    getVaccineList()
      .then(({ data }) => {
        setVaccineList(data);
        console.log(data);
        setLokasiVaksin(
          data.map(({ ID, Location, Address }) => ({
            value: ID,
            label: Location + " " + Address,
          }))
        );
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  const baseData = {
    nik: "",
    fullname: "",
    phone_number: "",
    address: "",
    session_id: "",
  };
  const [data, setData] = useState(baseData);
  const { user } = useSelector((state) => state);

  const formatDate = (date) => moment(date).locale("id").format("ll");
  const formatHour = (date) => moment(date).format("LT");
  const [userLocation, setUserLocation] = useState();

  const regexFullname = /^[a-zA-Z\s]{6,30}$/i;
  const [errMsgFullname, setErrMsgFullname] = useState("");

  const regexPhoneNumber = /^[0-9]{9,14}$/i;
  const [errMsgPhoneNumber, setErrMsgPhoneNumber] = useState("");

  const regexNik = /^[0-9]{16,16}$/i;
  const [errMsgNik, setErrMsgNik] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const handleInput = (e) => {
    const name = e.target.id;
    const value = e.target.value;

    setData({ ...data, [name]: value });
    console.log("data: ", data);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (
        data.fullname.length === 0 ||
        data.nik.length === 0 ||
        data.phone_number.length === 0
      ) {
        setErrMsg(
          <div className="error-messages">
            <p>You must fill all fields</p>
          </div>
        );
        event.preventDefault();
      }
      if (data.password != data.confirmpassword) {
        setErrMsg(
          <div className="error-messages">
            <p>Password not match</p>
          </div>
        );
      }

      data.session_id = selectedSessionId?.value;

      registerParticipant(data, selectedVaccineLocation?.value)
        .then((res) => {
          toast.success("pendaftaran berhasil 🤩 🥳 ");
        })
        .catch(({ meta }) => {
          meta.description.forEach((err) => {
            toast.warn(err);
          });
        });
      event.preventDefault();
    },
    [selectedSessionId, data]
  );

  const [nearbyFacilitiesFromUserPos, setNearbyFacilitiesFromUserPos] =
    useState(null);

  const [radius, setRadius] = useState(7);

  const updateUserLocation = useCallback(
    (latitude, longitude) => {
      console.log(latitude, longitude);
      setUserLocation({ latitude, longitude });

      getNearbyFacilities({ latitude, longitude, radius })
        .then(({ data }) => {
          console.log(data);
          setNearbyFacilitiesFromUserPos(data);
        })
        .catch((err) => {
          console.log(err.response);
          toast.warn("hmm sepertinya ada kesalahan");
        });
    },
    [userLocation]
  );

  useEffect(() => {
    setSelectedSessionId(null);
    if (selectedVaccineLocation) {
      for (let i = 0; i < vaccineList.length; i++) {
        const element = vaccineList[i];
        if (element.ID == selectedVaccineLocation.value) {
          setSesiVaksin(
            element.Sessions.map(({ ID, Description, StartTime }) => ({
              value: ID,
              label:
                Description +
                " tanggal " +
                formatDate(StartTime) +
                " pukul " +
                formatDate(StartTime),
            }))
          );
        }
      }
      console.log(selectedVaccineLocation);
    }
  }, [selectedVaccineLocation]);

  return (
    <>
      {user ? null : <UserNotLogin />}

      <UserHeader />

      <div className="mainmenu-user2">
        <div className="content">
          <div className="peta">
            <div className="titlemap">
              <h1>Daftar Vaksinasi</h1>
              {/* <img src={VacIcon} className="iconVaccine" /> */}
              <button className="iconVaccine">
                <img src={VacIcon} className="iconVaccine" />
              </button>
            </div>
            <MapBox updateLocation={updateUserLocation} />
          </div>
          <div className="container-dual">
            <div className="profile">
              <div className="property">
                {nearbyFacilitiesFromUserPos ? (
                  <>
                    <div className="value">
                      <p>Rekomendasi lokasi vaksinasi terdekat:</p>
                      <br />
                    </div>
                    {nearbyFacilitiesFromUserPos.length >= 1 ? (
                      <>
                        {nearbyFacilitiesFromUserPos.map((loc, index) => (
                          <>
                            <div className="value">
                              <h4>{loc.Location}</h4>
                              <p>{loc.Address}</p>
                              <br />
                            </div>
                          </>
                        ))}
                      </>
                    ) : (
                      <div className="value">
                        <p>Tidak ada data untuk ditampilkan</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="value">
                    <p>
                      Klik tombol lokasi saya di pojok kiri atas peta untuk
                      melihat lokasi vaksinasi di sekitar{" "}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="profile">
              <form spellCheck="false" onSubmit={handleSubmit}>
                <p>Nama</p>
                <input
                  className="inputuser"
                  type="text"
                  id="fullname"
                  onChange={handleInput}
                  value={data.fullname}
                  required
                />
                <p>NIK</p>
                <input
                  className="inputuser"
                  type="number"
                  onChange={handleInput}
                  id="nik"
                  value={data.nik}
                  required
                />
                <p>Nomor telepon</p>
                <input
                  className="inputuser"
                  type="number"
                  onChange={handleInput}
                  id="phone_number"
                  value={data.phone_number}
                  required
                />
                <p>Alamat</p>
                <input
                  className="inputuser"
                  type="text"
                  onChange={handleInput}
                  id="address"
                  value={data.address}
                  required
                />

                <p>Lokasi Vaksin</p>
                <div className="dropdown">
                  <Select
                    options={lokasiVaksin}
                    value={selectedVaccineLocation}
                    onChange={setSelectedVaccineLocation}
                    required
                  />
                </div>

                <p>Sesi Vaksin</p>
                <div className="dropdown">
                  <Select
                    options={sesiVaksin}
                    value={selectedSessionId}
                    onChange={setSelectedSessionId}
                    id="session_id"
                    required
                    // onChange={handleInput}
                  />
                </div>
                <div className="dialog-button">
                  <Link
                    to="/user/landingpage"
                    style={{ textDecoration: "inherit" }}
                  >
                    <div className="back">Kembali</div>
                  </Link>
                  <input type="submit" className="add" value="Tambah" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegVaccine;
