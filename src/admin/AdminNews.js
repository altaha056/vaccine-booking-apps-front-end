import React from "react";
import { Link } from "react-router-dom";
import NewsFetching from "./NewsFetching";
import { AdminHeader } from "./AdminHeader";
const AdminNews = () => {
  return (
    <div className="mainmenu-admin">
      <AdminHeader />
      <div className="content">
        <div className="grid-container">
          <NewsFetching />
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
