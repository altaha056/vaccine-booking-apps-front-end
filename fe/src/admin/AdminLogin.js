import React from "react";
import "../style/style.css";
import Logo from "../style/logo.svg";
const AdminLogin = () => {
  return (
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
            <form>
              <div className="inputbox">
                <input type="text" required />
                <label>Email</label>
              </div>
              <div className="inputbox">
                <input type="password" required />
                <label>Password</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
