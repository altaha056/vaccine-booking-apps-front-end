import React, { useEffect, useState } from "react";
import "../style/style.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";
import { AdminHeader } from "./AdminHeader";

const AdminAddVaccination = () => {
  return (
    <>
      <AdminHeader />;
      <div className="mainmenu-admin">
        <div className="content"></div>
      </div>
    </>
  );
};

export default AdminAddVaccination;
