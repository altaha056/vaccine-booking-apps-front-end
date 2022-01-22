import React from "react";
import UserHeader from "./UserHeader";
import { getParticipantbyId } from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserTicket = () => {
  const [participantData, setParticipantData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getParticipantbyId(id)
      .then(({ data }) => {
        console.log(data);
        setParticipantData(data);
        toast.info("semua data berhasil dimuat");
      })
      .catch((err) => {
        console.log(err.response);
        toast.warn("hmm sepertinya ada kesalahan");
      });
  }, []);

  return (
    <>
      <UserHeader />
      <div className="mainmenu-user2">
        <div className="content">
          <div className="container-dual">
            <div className="profile">
              <h1>Tiket Vaksinasi</h1>
              <div className="property">
                <div className="field">Nama Partisipan</div>
                <div className="value">{participantData?.Fullname}</div>
              </div>
              <div className="property">
                <div className="field">NIK</div>
                <div className="value">{participantData?.Nik}</div>
              </div>
              <div className="property">
                <div className="field">Alamat</div>
                <div className="value">{participantData?.Address}</div>
              </div>
              <div className="property">
                <div className="field">Nomor Telepon</div>
                <div className="value">{participantData?.PhoneNumber}</div>
              </div>
            </div>
            <div className="profile">
              <div className="property">
                <div className="field">Nomor Vaksin</div>
                <div className="value">2839747236482387462384</div>
              </div>
              <div className="property">
                <div className="field">Lokasi Vaksin</div>
                <div className="value">
                  {participantData?.Vac.Location}
                  <br />
                  {participantData?.Vac.Address}
                </div>
              </div>
              <div className="property">
                <div className="field">Jadwal Vaksin</div>
                <div className="value">
                  {participantData?.Session.StartTime}
                </div>
              </div>

              <div className="property">
                <div className="field">Sesi Vaksin</div>
                <div className="value">
                  {participantData?.Session.StartTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTicket;
