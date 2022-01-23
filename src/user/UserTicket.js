import React from "react";
import UserHeader from "./UserHeader";
import { getParticipantbyId } from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Pdf from "react-to-pdf";
import moment from "moment";
import { useTable, usePagination } from "react-table";

const UserTicket = () => {
  const [participantData, setParticipantData] = useState(null);

  const { id } = useParams();

  const formatDate = (date) => moment(date).locale("id").format("ll");
  const formatHour = (date) => moment(date).format("LT");

  const ref = React.createRef();

  const options = {
    orientation: "landscape",
    unit: "in",
    format: [20, 10],
  };

  useEffect(() => {
    getParticipantbyId(id)
      .then(({ data }) => {
        console.log(data);
        setParticipantData(data);
        toast.info("data berhasil dimuat");
      })
      .catch((err) => {
        console.log(err.response);
        toast.warn("hmm sepertinya ada kesalahan");
      });
  }, []);

  return (
    <div>
      <UserHeader />
      <div className="mainmenu-user2">
        <div className="content" ref={ref}>
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

              <div className="property">
                <div className="add">
                  <Pdf
                    targetRef={ref}
                    filename="tiket-vaksin.pdf"
                    x={1.2}
                    y={1.2}
                    scale={1.6}
                    options={options}
                  >
                    {({ toPdf }) => <div onClick={toPdf}>Unduh pdf</div>}
                  </Pdf>
                </div>
              </div>
            </div>
            <div className="profile">
              <div className="property">
                <div className="field">Nomor Vaksin</div>
                <div className="value">
                  {participantData?.Vac.ID}
                  {participantData?.SessionID}
                  {participantData?.UserID}
                  {participantData?.ID}
                </div>
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
                  {formatDate(participantData?.Session.StartTime)}
                </div>
              </div>
              <div className="property">
                <div className="field">Sesi Vaksin</div>
                <div className="value">
                  {participantData?.Session.Description}
                  <br />
                  {formatHour(participantData?.Session.StartTime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTicket;
