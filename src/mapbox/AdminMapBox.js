import React, { useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import { getVaccineList } from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import icon from "./VaccineIcon.png";
import placeholder from "./placeholder.png";
import { useCallback } from "react";

export default function AdminMapBox({ updateLocation = (lat, long) => {} }) {
  const [userLocation, setUserLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "90vw",
    height: "55vh",
    latitude: 3.59,
    longitude: 98.67,

    zoom: 12,
  });

  const [selectedUserLocation, setSelectedUserLocation] = useState(null);

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
      </ReactMapGL>
    </div>
  );
}
