import React, { useEffect, useState } from "react";
import "../style/style.css";
import Logo from "../style/logo.svg";
import { NavLink } from "react-router-dom";
import setAuthorizationHeader from "../config/axios/set-authorization-header";
import { detailsOwnUser, loginUser } from "../config/api/vaccine-post";
import { useDispatch } from "react-redux";
import { updateProfile } from "../store/actions/users";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
const UserLogin = () => {
  const baseData = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(baseData);

  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [errMsgEmail, setErrMsgEmail] = useState("");

  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;
  const [errMsgPassword, setErrMsgPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);

  const saveLoginState = (data) => {
    localStorage.setItem("vac:token", JSON.stringify(data));
    setAuthorizationHeader(data.token);
    dispatch(updateProfile(data));
  };

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
    setData({ ...data, [name]: value });
    console.log("data: ", data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.email.length === 0 || data.password.length === 0) {
      setErrMsg(
        <div className="error-messages">
          <p>Password can not be empty</p>
        </div>
      );

      return;
    }
    loginUser(data)
      .then((res) => {
        saveLoginState({ ...res.data, email: data.email });
        toast.success("berhasil login");
      })
      .catch(({ meta }) => {
        //console.log(err);
        meta.description.forEach((err) => {
          toast.error(err);
        });
      });
  };

  return (
    <>
      {user ? <Navigate to="/user/profile" /> : null}
      <div className="user-bg-login">
        <div className="loginbox">
          <div className="grid-container-admin">
            <div className="login-header">
              <h1>Login</h1>
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
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={handleInput}
                    required
                  />
                  <label>Password</label>
                </div>
                <button type="submit">Continue</button>
              </form>
              {/* here the error message */}
              <div className="yet-register">
                <NavLink to="/user/register" style={{ textDecoration: "none" }}>
                  <span> create account</span>
                </NavLink>{" "}
                or{" "}
                <NavLink
                  to="/user/landingpage"
                  style={{ textDecoration: "none" }}
                >
                  <span> log in as guest</span>
                </NavLink>
              </div>
              <div className="error-message-container">
                {errMsgEmail}
                {errMsgPassword}
                {errMsg}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
