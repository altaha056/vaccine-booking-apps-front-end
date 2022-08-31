import React, { useRef, useState, useEffect } from 'react'

// Backend
import {
  getNearbyFacilities, registerParticipant,getVaccineList,
} from "../config/api/vaccine-post";

// Mapbox
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
const token = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = token;

function Final() {
  const mapContainer = useRef(null)

  const [userLocation, setUserLocation] = useState();
  const [nearbyFacilitiesFromUserPos, setNearbyFacilitiesFromUserPos] = useState([]);
  const [vaccineList, setVaccineList] = useState([]);
  const [lokasiVaksin, setLokasiVaksin] = useState([]);
  
  const [radius, setRadius] = useState(5);
  const [lng, setLng] = useState(98.6520151);
  const [lat, setLat] = useState(3.5611232);
  const [zoom, setZoom] = useState(13);


  const map = useRef(null);

  const bounds = [
    [98.549242, 3.487502],// Southwest coordinates
    [98.754549, 3.801692], // Northeast coordinates
  ];
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
    showAccuracyCircle: false,
  });

  useEffect(()=>{
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

    geolocate.on("geolocate", (e) => {
      console.log("A geolocate event has occurred.");
      const {longitude,latitude } = e.coords;
      updateUserLocation(latitude, longitude);
    });

    //get vaccine location
    
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
      
  },[]);

  
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

  const updateUserLocation = async (latitude, longitude) => {
    setUserLocation({ latitude, longitude });
    getNearbyFacilities({ latitude, longitude, radius })
        .then(async({ data }) => {
          data.map(async a => {
            await  fetch(
              `https://api.mapbox.com/directions/v5/mapbox/driving/${longitude},${latitude};${a.Longitude},${a.Latitude}?steps=true&geometries=geojson&access_token=${token}`
            )
          })
          setNearbyFacilitiesFromUserPos(data);
        })
        .catch((err) => {
          console.log("error while fetching data");
        });
  }
  return (
    <div>
      <div ref={mapContainer} className="map-container"></div>
    </div>
  )
}

export default Final