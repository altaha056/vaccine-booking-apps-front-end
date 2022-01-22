import React from "react";
import { useState } from "react";
import UserHeader from "./UserHeader";
import { NavLink } from "react-router-dom";

import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";

const lokasivaksin = [
  { value: "RS USU", label: "RS USU" },
  { value: "RS Bhayangkara", label: "RS Bhayangkara" },
  { value: "RS Permata", label: "RS Permata" },
];

const jadwalvaksin = [{ value: "11 Januari 2022", label: "11 Januari 2022" }];
const jenisvaksin = [
  { value: "Astra zaneca", label: "Astra zaneca" },
  { value: "Sinovac", label: "Sinovac" },
  { value: "Moderna", label: "Moderna" },
  { value: "Pfizer", label: "Pfizer" },
];

const sesivaksin = [
  { value: "Sesi 1. 07:00 - 12:00", label: "Sesi 1. 07:00 - 12:00" },
  { value: "Sesi 2. 13:00 - 16.00", label: "Sesi 2. 13:00 - 16.00" },
];

const UserEditVaccineRegistration = () => {
  const baseData = {
    email: "",
    password: "",
    confirmpassword: "",
    nik: "",
    fullname: "",
    phonenumber: "",
  };
  const [data, setData] = useState(baseData);

  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [errMsgEmail, setErrMsgEmail] = useState("");

  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;
  const [errMsgPassword, setErrMsgPassword] = useState("");

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

    if (name === "email") {
      if (regexEmail.test(value)) {
        setErrMsgEmail("");
      } else {
        setErrMsgEmail(
          <div className="error-messages">
            <p>Seems like your email not valid</p>
          </div>
        );
      }
    }
    if (name === "password") {
      if (regexPassword.test(value)) {
        setErrMsgPassword("");
      } else {
        setErrMsgPassword(
          <div className="error-messages">
            <p>
              Password minimum 8 characters wchic contain at least 1 number and
              1 characters
            </p>
          </div>
        );
      }
    }
    if (name === "confirmpassword") {
      if (value === data.password) {
        setErrMsgPassword("");
      } else {
        setErrMsgPassword(
          <div className="error-messages">
            <p>Password not match</p>
          </div>
        );
      }
    }
    if (name === "phonenumber") {
      if (regexPhoneNumber.test(value)) {
        setErrMsgPhoneNumber("");
      } else {
        setErrMsgPhoneNumber(
          <div className="error-messages">
            <p>Phone number must contains 9-14 numbers only</p>
          </div>
        );
      }
    }
    if (name === "nik") {
      if (regexNik.test(value)) {
        setErrMsgNik("");
      } else {
        setErrMsgNik(
          <div className="error-messages">
            <p>NIK must contain 16 numbers</p>
          </div>
        );
      }
    }

    if (name === "fullname") {
      if (regexFullname.test(value)) {
        setErrMsgFullname("");
      } else {
        setErrMsgFullname(
          <div className="error-messages">
            <p>Fullname only accept 6-30 characters</p>
          </div>
        );
      }
    }
    setData({ ...data, [name]: value });
    console.log("data: ", data);
  };

  const handleSubmit = (event) => {
    if (
      data.email.length === 0 ||
      data.password.length === 0 ||
      data.fullname.length === 0 ||
      data.nik.length === 0 ||
      data.phonenumber.length === 0
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
      event.preventDefault();
    }
  };

  return (
    <>
      <UserHeader />

      <div className="mainmenu-user2">
        <div className="content">
          <div className="container-dual">
            <div className="profile">
              <div className="property">
                <div className="field">Nama partisipan</div>
                <div className="value">Altaha</div>
              </div>
              <div className="property">
                <div className="field">Lokasi vaksin sebelumnya</div>
                <div className="value">
                  RS Universitas Sumatera Utara Jl. Dr. Mansyur No.66, Merdeka,
                  Kec. Medan Baru, Kota Medan, Sumatera Utara 20154
                </div>
              </div>
              <div className="property">
                <div className="field">Jadwal vaksin sebelumnya</div>
                <div className="value">11 Januari 2022</div>
              </div>
              <div className="property">
                <div className="field">Sesi vaksin sebelumnya</div>
                <div className="value">Sesi 1, 08.00-12.00 WIB</div>
              </div>
            </div>
            <div className="profile">
              <form>
                <p>Nama</p>
                <input
                  className="inputuser"
                  type="text"
                  name="nama"
                  min="10"
                  max="100"
                  required
                />
                <p>NIK</p>
                <input
                  className="inputuser"
                  type="number"
                  name="nik"
                  min="10"
                  max="100"
                  required
                />
                <p>Nomor telepon</p>
                <input
                  className="inputuser"
                  type="number"
                  name="nomor_telepon"
                  min="10"
                  max="100"
                  required
                />
                <p>Alamat</p>
                <input
                  className="inputuser"
                  type="text"
                  name="alamat"
                  min="10"
                  max="100"
                  required
                />

                <p>Lokasi Vaksin</p>
                <div className="dropdown">
                  <Select options={lokasivaksin} />
                </div>
                <p>Jadwal Vaksin</p>
                <div className="dropdown">
                  <Select options={jadwalvaksin} />
                </div>

                <p>Sesi Vaksin</p>
                <div className="dropdown">
                  <Select options={sesivaksin} />
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

export default UserEditVaccineRegistration;
