import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWx0YWhhIiwiYSI6ImNreW1lYnp6bDAxbWcyb2xqZjZsYzYwdWsifQ.7Oezd-XT8iHNi4rr2Jtphw";

export default function AdminMapBox({ onChangePlace = (data) => {} }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(100);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(5);
  const [tempat, setTempat] = useState();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("click", ({ lngLat }) => {
      // console.log(e);
      const { lat, lng } = lngLat;

      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?limit=1&types=poi%2Ccountry%2Cregion%2Caddress%2Cneighborhood%2Cplace%2Cpostcode%2Clocality%2Cdistrict&access_token=pk.eyJ1IjoiYWx0YWhhIiwiYSI6ImNreW1lYnp6bDAxbWcyb2xqZjZsYzYwdWsifQ.7Oezd-XT8iHNi4rr2Jtphw`
      )
        .then((res) => {
          if (res.status === 200) return res.json();
        })
        .then((resJson) => {
          setTempat(resJson.features[0]);
        });
    });
  }, []);

  useEffect(() => {
    onChangePlace(tempat);
  }, [tempat]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
    <>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
}
