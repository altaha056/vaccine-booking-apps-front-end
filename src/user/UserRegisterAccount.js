import React, { useState } from "react";
import "../style/style.css";
import Logo from "../style/logo.svg";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Axios from "axios";
import { registerUser } from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserRegisterAccount = () => {
  const { user } = useSelector((state) => state);

  const baseData = {
    email: "",
    password: "",
    confirmpassword: "",
    nik: "",
    name: "",
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
              Password minimum 8 characters which contain at least 1 number and
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
    if (name === "name") {
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

  const [successRegistered, setSuccessRegistered] = useState(false);

  const handleSubmit = (event) => {
    if (
      data.email.length === 0 ||
      data.password.length === 0 ||
      data.name.length === 0 ||
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
    registerUser(data)
      .then((res) => {
        toast.success("berhasil daftar");
        setSuccessRegistered(true);
      })
      .catch(({ meta }) => {
        //console.log(err);
        meta.description.forEach((err) => {
          toast.error(err);
        });
      });
    event.preventDefault();
  };

  const navigate = useNavigate();

  return (
    <>
      {successRegistered ? navigate("/user/login") : null}
      {user ? <Navigate to="/user/profile" /> : null}
      <div className="user-bg-login">
        <div className="loginbox">
          <div className="grid-container-admin">
            <div className="login-header">
              <h1>Register</h1>
            </div>
            <div className="login-logo">
              <img src={Logo} alt="logo" />
            </div>
            <div className="login-form">
              <form spellCheck="false" onSubmit={handleSubmit}>
                <div className="inputbox">
                  <input
                    type="text"
                    value={data.email}
                    id="email"
                    onChange={handleInput}
                    required
                  />

                  <label>Email</label>
                </div>
                <div className="inputbox">
                  <input
                    type="text"
                    value={data.nik}
                    id="nik"
                    onChange={handleInput}
                    required
                  />

                  <label>NIK</label>
                </div>
                <div className="inputbox">
                  <input
                    type="text"
                    value={data.name}
                    id="name"
                    onChange={handleInput}
                    required
                  />

                  <label>Fullname</label>
                </div>

                <div className="inputbox">
                  <input
                    type="text"
                    value={data.phonenumber}
                    id="phonenumber"
                    onChange={handleInput}
                    required
                  />

                  <label>Phone Number</label>
                </div>
                <div className="inputbox">
                  <input
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={handleInput}
                    required
                  />
                  <label>Password</label>
                </div>
                <div className="inputbox">
                  <input
                    type="password"
                    id="confirmpassword"
                    value={data.confirmpassword}
                    onChange={handleInput}
                    required
                  />
                  <label>Confirm Password</label>
                </div>
                <button>Continue</button>
              </form>
              {/* here the error message */}
              <div className="yet-register">
                Have account?
                <NavLink to="/user/login" style={{ textDecoration: "none" }}>
                  <span> Login</span>
                </NavLink>
                <br />
                or
                <br />
                <NavLink
                  to="/user/landingpage"
                  style={{ textDecoration: "none" }}
                >
                  log in as guest
                </NavLink>
              </div>
              <div className="error-message-container">
                {errMsgEmail}
                {errMsgPassword}
                {errMsg}
                {errMsgFullname}
                {errMsgNik}
                {errMsgPhoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegisterAccount;
