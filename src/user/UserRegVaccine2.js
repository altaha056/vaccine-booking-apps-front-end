import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import UserHeader from "./UserHeader";
import icon from "../mapbox/VaccineIcon.png";
import { NavLink } from "react-router-dom";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import VacIcon from "../mapbox/VaccineIcon.png";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";
import UserNotLogin from "./UserNotLogin";
import MapBox from "../mapbox/Mapbox";
import {
  getNearbyFacilities,
  registerParticipant,
} from "../config/api/vaccine-post";
import { toast } from "react-toastify";
import { getVaccineList } from "../config/api/vaccine-post";
import moment from "moment";

import { useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

const token = process.env.REACT_APP_MAPBOX_TOKEN;

mapboxgl.accessToken = token;

const UserRegVaccine2 = () => {
  const [vaccineList, setVaccineList] = useState([]);
  const [lokasiVaksin, setLokasiVaksin] = useState([]);
  const [distances, setDistances] = useState([]);
  const [selectedVacFacilities, setSelectedVacFacilities] = useState(null);

  const [sesiVaksin, setSesiVaksin] = useState([]);
  const [selectedVaccineLocation, setSelectedVaccineLocation] = useState();
  const [selectedSessionId, setSelectedSessionId] = useState();

  useEffect(() => {
    getVaccineList()
      .then(({ data }) => {
        setVaccineList(data);
        console.log("daftar seluruh vaksinasi: ", data);
        setLokasiVaksin(
          data.map(({ ID, Location, Address }) => ({
            value: ID,
            label: Location + " " + Address,
          }))
        );
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  const baseData = {
    nik: "",
    fullname: "",
    phone_number: "",
    address: "",
    session_id: "",
  };
  const [data, setData] = useState(baseData);
  const { user } = useSelector((state) => state);

  const formatDate = (date) => moment(date).locale("id").format("ll");
  const formatHour = (date) => moment(date).locale("id").format("LT");
  const [userLocation, setUserLocation] = useState();
  const [radius, setRadius] = useState(5);

  const [errMsg, setErrMsg] = useState("");

  const handleInput = (e) => {
    const name = e.target.id;
    const value = e.target.value;

    setData({ ...data, [name]: value });
    console.log("data: ", data);
  };
  const handleInputRadius = (e) => {
    e.preventDefault();
    const value =
      e.target.type == "number" ? Number(e.target.value) : e.target.value;
    console.log(value);
    setRadius(value);
    console.log("radius = ", radius);
  };
  const handleSubmitRadius = (e) => {
    let latitude = userLocation.latitude;
    let longitude = userLocation.longitude;

    getNearbyFacilities({ latitude, longitude, radius })
      .then(({ data }) => {
        console.log("daftar vaksinas dalam radius", radius, "km: ", data);
        setNearbyFacilitiesFromUserPos(data);
      })
      .catch((err) => {
        console.log(err.response);
        toast.warn("hmm sepertinya ada kesalahan");
      });
    e.preventDefault();
  };
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (
        data.fullname.length === 0 ||
        data.nik.length === 0 ||
        data.phone_number.length === 0
      ) {
        setErrMsg(
          <div className="error-messages">
            <p>You must fill all fields</p>
          </div>
        );
        event.preventDefault();
      }
      if (data.password != data.confirmpassword) {
        setErrMsg(
          <div className="error-messages">
            <p>Password not match</p>
          </div>
        );
      }

      data.session_id = selectedSessionId?.value;

      registerParticipant(data, selectedVaccineLocation?.value)
        .then((res) => {
          toast.success("pendaftaran berhasil 🤩 🥳 ");
        })
        .catch(({ meta }) => {
          meta.description.forEach((err) => {
            toast.warn(err);
          });
        });
      event.preventDefault();
    },
    [selectedSessionId, data]
  );

  const [nearbyFacilitiesFromUserPos, setNearbyFacilitiesFromUserPos] =
    useState([]);

  const updateUserLocation = useCallback(
    (latitude, longitude) => {
      console.log(latitude, longitude);
      setUserLocation({ latitude, longitude });

      getNearbyFacilities({ latitude, longitude, radius })
        .then(({ data }) => {
          console.log("daftar vaksinasi dalam radius", radius, "km: ", data);
          setNearbyFacilitiesFromUserPos(data);

        })
        .catch((err) => {
          console.log(err.response);
          toast.warn("hmm sepertinya ada kesalahan");
        });
    },
    [userLocation]
  );

  useEffect(() => {
    setSelectedSessionId(null);
    if (selectedVaccineLocation) {
      for (let i = 0; i < vaccineList.length; i++) {
        const element = vaccineList[i];
        if (element.ID == selectedVaccineLocation.value) {
          setSesiVaksin(
            element.Sessions.map(({ ID, Description, StartTime }) => ({
              value: ID,
              label:
                Description +
                " tanggal " +
                formatDate(StartTime) +
                " pukul " +
                formatHour(StartTime),
            }))
          );
        }
      }
      console.log(selectedVaccineLocation);
    }
  }, [selectedVaccineLocation]);

  const drawline = (data) => {
    const route = data.geometry.coordinates;
    const steps = data.legs[0].steps;

    const coordForMatrix = Array(steps.length);
    for (let i = 0; i < coordForMatrix.length; i++) {
      coordForMatrix[i] = Array(steps.length).fill(0);
    }
    steps.map((x, i) => (coordForMatrix[i][i + 1] = x.weight));
    console.log(coordForMatrix);

    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.current.getSource("route")) {
      map.current.getSource("route").setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  }

  useEffect(() => {
    (async()=>{
      if (userLocation != null && nearbyFacilitiesFromUserPos.length) {
        console.log("koordinat user ", userLocation);
        const lines = (await Promise.all( await nearbyFacilitiesFromUserPos.map(async (data) => {
          return await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${data.Longitude},${data.Latitude}?alternatives=true&overview=full&steps=true&geometries=geojson&access_token=${token}`
          )
            .then(async (res) => await res.json())
            .then(({ code, routes }) => routes);
        }))).sort((a,b) => a.distance > b.distance ? 1:a.distance < b.distance?-1:0 );
          console.log(lines);
          drawline(lines[0][0])
      }
    })()
   
  }, [nearbyFacilitiesFromUserPos, userLocation]);

  

  const mapContainer = useRef(null);
  const map = useRef(null);
  const bounds = [
    [98.405881, 3.494404], // Southwest coordinates
    [98.916406, 3.690163], // Northeast coordinates
  ];
  const [lng, setLng] = useState(98.6520151);
  const [lat, setLat] = useState(3.5611232);
  const [zoom, setZoom] = useState(13);

  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
    showAccuracyCircle: false,
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      maxBounds: bounds, // Set the map's geographical boundaries.
      customAttribution: "Untuk skripsi Altaha",
    });

    map.current.addControl(
      new mapboxgl.FullscreenControl({
        container: document.querySelector("content"),
      })
    );

    map.current.addControl(geolocate);

    map.current.addControl(new mapboxgl.NavigationControl());
  }, []);


  useEffect(() => {
    vaccineList.map((vaccine) => {
      new mapboxgl.Marker()
        .setLngLat([vaccine.Longitude, vaccine.Latitude])
        .addTo(map.current)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<p >${vaccine.Location}<br/>${vaccine.Description}</p>`
          )
        );
    });
  }, [vaccineList]);

  useEffect(() => {
    geolocate.on("geolocate", (e) => {
      console.log("A geolocate event has occurred.");
      let lon = e.coords.longitude;
      let lat = e.coords.latitude;
      let position = [lon, lat];
      console.log(position);
      updateUserLocation(lat, lon);
    });
  }, []);

  geolocate.on("outofmaxbounds", () => {
    console.log("An outofmaxbounds event has occurred.");
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("error", () => {
      console.log("An error event has occurred.");
    });
  },[]);

  return (
    <>
      {user ? null : <UserNotLogin />}
      <div className="headerTop">
        <UserHeader />
      </div>

      <div className="mainmenu-user2">
        <div className="content">
          <div className="peta">
            <div className="titlemap">
              <h1>Daftar Vaksinasi</h1>
              <button className="iconVaccine">
                <img src={VacIcon} className="iconVaccine" />
              </button>
            </div>
            {/* peta di sini */}
            {/* peta di sini */}
            {/* peta di sini */}
            {/* <MapBox updateLocation={updateUserLocation} /> */}
            {/* peta di sini */}
            {/* peta di sini */}
            {/* peta di sini */}
            
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            <div ref={mapContainer} className="map-container"></div>
          </div>
          <div className="container-dual">
            <div className="profile">
              <div className="property">
                {nearbyFacilitiesFromUserPos ? (
                  <>
                    <div className="value">
                      <p>Lokasi vaksinasi terdekat</p>
                      <br />
                      <p>Cari lokasi vaksinasi dalam radius km:</p>
                      <form
                        onSubmit={handleSubmitRadius}
                        className="dialog-button"
                      >
                        <input
                          type="number"
                          className="inputuser2"
                          value={radius}
                          onChange={handleInputRadius}
                          min="0"
                          step="0.1"
                          max="20"
                        />
                        <input type="submit" className="add2" value="Lihat" />
                      </form>
                    </div>
                    {nearbyFacilitiesFromUserPos.length >= 1 ? (
                      <>
                        {nearbyFacilitiesFromUserPos.map((loc, index) => (
                          <div className="value" key={index}>
                            <h4>{loc.Location}</h4>
                            <p>{loc.Address}</p>
                            <br />
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="value">
                        <p>Tidak ada data untuk ditampilkan</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="value">
                    <p>
                      Klik tombol "lokasi saya" di pojok kanan atas peta untuk
                      melihat lokasi vaksinasi di sekitar{" "}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="profile">
              <form spellCheck="false" onSubmit={handleSubmit}>
                <p>Nama</p>
                <input
                  className="inputuser"
                  type="text"
                  id="fullname"
                  onChange={handleInput}
                  value={data.fullname}
                  required
                />
                <p>NIK</p>
                <input
                  className="inputuser"
                  type="number"
                  onChange={handleInput}
                  id="nik"
                  value={data.nik}
                  required
                />
                <p>Nomor telepon</p>
                <input
                  className="inputuser"
                  type="number"
                  onChange={handleInput}
                  id="phone_number"
                  value={data.phone_number}
                  required
                />
                <p>Alamat</p>
                <input
                  className="inputuser"
                  type="text"
                  onChange={handleInput}
                  id="address"
                  value={data.address}
                  required
                />

                <p>Lokasi Vaksin</p>
                <div className="dropdown">
                  <Select
                    options={lokasiVaksin}
                    value={selectedVaccineLocation}
                    onChange={setSelectedVaccineLocation}
                    required
                  />
                </div>

                <p>Sesi Vaksin</p>
                <div className="dropdown">
                  <Select
                    options={sesiVaksin}
                    value={selectedSessionId}
                    onChange={setSelectedSessionId}
                    id="session_id"
                    required
                    // onChange={handleInput}
                  />
                </div>
                <div className="dialog-button">
                  <Link
                    to="/user/landingpage"
                    style={{ textDecoration: "inherit" }}
                  >
                    <div className="back">Kembali</div>
                  </Link>
                  <input type="submit" className="add" value="Tambah" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegVaccine2;
