import React, { useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import { getVaccineList } from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import icon from "./VaccineIcon.png";

export default function MapBox() {
  const [vaccineList, setVaccineList] = useState([]);

  useEffect(() => {
    getVaccineList()
      .then(({ data }) => {
        setVaccineList(data);
        toast.info("Seluruh lokasi vaksin berhasil dimuat");
      })
      .catch(() => {
        toast.error("ups sepertinya ada kesalahan");
      });
  }, []);

  const [viewport, setViewport] = useState({
    width: "90vw",
    height: "55vh",
    latitude: 3.59,
    longitude: 98.67,

    zoom: 12,
  });

  const [selectedVacFacilities, setSelectedVacFacilities] = useState(null);

  return (
    <div className="peta">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/altaha/ckymkxtz8892y16rbbojgb3xu"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {vaccineList.map((vaccine) => (
          <Marker
            key={vaccine.ID}
            latitude={vaccine.Latitude}
            longitude={vaccine.Longitude}
          >
            {/* {vaccine.Location} */}
            <button
              className="iconVaccine"
              onClick={(e) => {
                e.preventDefault();
                setSelectedVacFacilities(vaccine);
              }}
            >
              <img src={icon} className="iconVaccine" />
            </button>
          </Marker>
        ))}
        {selectedVacFacilities ? (
          <Popup
            latitude={selectedVacFacilities.Latitude}
            longitude={selectedVacFacilities.Longitude}
            onClose={() => {
              setSelectedVacFacilities(null);
            }}
          >
            <div className="peta_description">
              <p>{selectedVacFacilities.Location}</p>
              <p>{selectedVacFacilities.Description}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
