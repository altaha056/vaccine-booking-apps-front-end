import React from "react";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
const UserNoParticipant = () => {
  return (
    <>
      {/* <UserHeader /> */}
      <div className="mainmenu-user2">
        <div className="content">
          <h1>
            Kelihatannya kamu belum ada daftar vaksin. <br />
            kamu bisa daftarkan orang lain juga loh.
          </h1>

          <div className="dialog-button">
            <Link to="/user/agreement" style={{ textDecoration: "inherit" }}>
              <div className="add">Daftar</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNoParticipant;
