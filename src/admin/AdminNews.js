import React from "react";
import { Link, Navigate } from "react-router-dom";
import NewsFetching from "./NewsFetching";
import { AdminHeader } from "./AdminHeader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminNews = () => {
  const { admin } = useSelector((state_admin) => state_admin);

  return admin ? (
    <div className="mainmenu-admin">
      <AdminHeader />
      <div className="content">
        <div className="grid-container">
          <NewsFetching />
        </div>
      </div>
    </div>
  ) : (
    <>
      <Navigate to="/admin/login" />
      {toast.info("anda harus login sebagai admin")}
    </>
  );
};

export default AdminNews;
