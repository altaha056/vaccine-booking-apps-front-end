import React, { useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import { getVaccineList } from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import icon from "./VaccineIcon.png";
import placeholder from "./placeholder.png";
import { useCallback } from "react";

const token = process.env.REACT_APP_MAPBOX_TOKEN;

export default function MapBox({ updateLocation = (lat, long) => {} }) {
  const [vaccineList, setVaccineList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [distances, setDistances] = useState([]);

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

  // const getRoute = useCallback(
  //   ({ code, routes }) => {
  //     if (code == "Ok") {
  //       setDistances([...distances, routes[0].distance]);
  //     }
  //   },
  //   [distances]
  // );

  // useEffect(() => {
  //   if (userLocation != null) {
  //     console.log("koordinat user ", userLocation);
  //     vaccineList.map((data) => {
  //       fetch(
  //         `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.long},${userLocation.lat};${data.Longitude},${data.Latitude}?geometries=geojson&access_token=${token}`
  //       )
  //         .then((res) => res.json())
  //         .then((data) => getRoute(data));
  //     });
  //   }
  // }, [vaccineList, userLocation]);

  // useEffect(() => {
  //   console.log(distances);
  // }, [distances]);

  const bounds = [
    [-122.66336, 37.492987], // Southwest coordinates
    [-122.250481, 37.871651], // Northeast coordinates
  ];

  return (
    <div className="peta">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/altaha/ckymkxtz8892y16rbbojgb3xu"
        mapboxApiAccessToken={token}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        maxBounds={bounds}
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
