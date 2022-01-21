import React, { useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import { getVaccineList } from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import icon from "./VaccineIcon.png";
import placeholder from "./placeholder.png";
import { useCallback } from "react";

export default function MapBox({ updateLocation = (lat, long) => {} }) {
  const [vaccineList, setVaccineList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "90vw",
    height: "55vh",
    latitude: 3.59,
    longitude: 98.67,

    zoom: 12,
  });

  const [selectedVacFacilities, setSelectedVacFacilities] = useState(null);
  const [selectedUserLocation, setSelectedUserLocation] = useState(null);

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

  const getUserLoc = useCallback(() => {
    console.log("Clicked!");
    navigator.geolocation.getCurrentPosition((position) => {
      let userLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      let newViewport = {
        width: "90vw",
        height: "55vh",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 14,
      };
      setUserLocation(userLocation);
      updateLocation(userLocation.lat, userLocation.long);
      setViewport(newViewport);
    });
  }, []);

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
        <button onClick={getUserLoc} className="mylocation">
          Lokasi saya
        </button>
        {userLocation ? (
          <Marker latitude={userLocation.lat} longitude={userLocation.long}>
            <button
              className="iconVaccine"
              onClick={(e) => {
                e.preventDefault();
                setSelectedUserLocation(userLocation);
              }}
            >
              <img src={placeholder} className="iconVaccine" />
            </button>
          </Marker>
        ) : null}

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

        {selectedUserLocation ? (
          <Popup
            latitude={selectedUserLocation.lat}
            longitude={selectedUserLocation.long}
            onClose={() => {
              setSelectedUserLocation(null);
            }}
          >
            <div className="peta_description">
              <p>Latitude: {selectedUserLocation.lat}</p>
              <p>Longitude: {selectedUserLocation.long}</p>
            </div>
          </Popup>
        ) : null}

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
