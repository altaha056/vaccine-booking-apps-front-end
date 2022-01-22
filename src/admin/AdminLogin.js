import React, { useState } from "react";
import "../style/style.css";
import Logo from "../style/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorizationHeader } from "../config/axios";
import { updateProfileAdmin } from "../store/actions/admins";
import { adminLogin } from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
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

  const { admin } = useSelector((state_admin) => state_admin);

  const saveLoginState = (data_admin) => {
    localStorage.setItem("vac:token-admin", JSON.stringify(data_admin));
    setAuthorizationHeader(data_admin.Token);
    dispatch(updateProfileAdmin(data_admin));
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
    adminLogin(data)
      .then((res) => {
        saveLoginState({ ...res.data, email: data.email });
        toast.success("berhasil login");
      })
      .catch(({ meta }) => {
        meta.description.forEach((err) => {
          console.log(err);
          toast.error(err);
        });
      });
  };

  return (
    <>
      {admin ? <Navigate to="/admin/profile" /> : null}
      <div className="admin-bg-login">
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

export default AdminLogin;
