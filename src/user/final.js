import React, { useRef, useState, useEffect } from 'react'
import "../style/iconforMap.css"
// Backend
import {
  getNearbyFacilities, registerParticipant,getVaccineList,
} from "../config/api/vaccine-post";

// Mapbox
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
const token = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = token;

function Final({ onChangePlace = (data) => {} }) {
  const mapContainer = useRef(null)

  const [userLocation, setUserLocation] = useState();
  const [nearbyFacilitiesFromUserPos, setNearbyFacilitiesFromUserPos] = useState([]);
  const [vaccineList, setVaccineList] = useState([]);
  const [lokasiVaksin, setLokasiVaksin] = useState([]);
  
  
  const [radius, setRadius] = useState(5);
  const [lng, setLng] = useState(98.6520151);
  const [lat, setLat] = useState(3.5611232);
  const [zoom, setZoom] = useState(13);

  const [dataForGraph, setDataForGraph]=useState()
  
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

    geolocate.on("geolocate", (e) => {
      const {longitude,latitude } = e.coords;
      updateUserLocation(latitude, longitude);
      console.log("e.coords");
      console.log(e.coords);
    });

    
    
    map.current.on("click",({lngLat})=>{
      const { lat, lng } = lngLat;
      updateUserLocation(lat, lng);
    })
    
    //get vaccine location
    
    getVaccineList()
      .then(({ data }) => {
        setVaccineList(data);
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
      const el = document.createElement("div");
      el.id = `marker-${vaccine.ID}`;
      el.className = "markerVacLoc";

      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat([vaccine.Longitude, vaccine.Latitude])
        .addTo(map.current)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<p >${vaccine.Location}<br/>${vaccine.Description}</p>`
          )
        )
    })
  }, [vaccineList]);

  const updateUserLocation = async (latitude, longitude) => {
    setUserLocation({ latitude, longitude });
    getNearbyFacilities({ latitude, longitude, radius })
        .then(async({ data }) => {
          setNearbyFacilitiesFromUserPos(data);
          getNearestVac()
        })
        .catch((err) => {
          // console.log("error while fetching data", err.response);
        });
  }

  
  const getNearestVac = useEffect(() => {
    (async()=>{
      if (userLocation != null && nearbyFacilitiesFromUserPos.length) {
        const nearest = nearbyFacilitiesFromUserPos.slice(0,3)
        // console.log("nearest");
        // console.log(nearest);
        //*****code below if you wanna get the nearest place based on the route. not the manhattan distance******
        const lines = (await Promise.all( await nearest.map(async (data) => {
          return await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${data.Longitude},${data.Latitude}?overview=full&steps=true&geometries=geojson&access_token=${token}&language=id`
          )
            .then(async (res) => await res.json())
            .then(({ code, routes }) => (routes))
        })))
        lines.map((line,index)=>line[0]["location"]=nearest[index].Location)
        lines.sort((a,b) => {return a[0].distance-b[0].distance} );
        // console.log("lines");
        // console.log(lines);
        drawline(lines[0][0])
        let linesToCompare = lines.flat()
        setDataForGraph(linesToCompare)
        // console.log("lines to compare");
        // console.log(linesToCompare);
        // create new pop up every time a user location is read
        // nearest.map(vac=>{
        //   new mapboxgl.Popup({ closeOnClick: true }).setLngLat([vac.Longitude, vac.Latitude]).setHTML(`<p>${vac.Location}</p>`).addTo(map.current);
        // })
        //*****code below if you wanna get the nearest place based on manhattan distance. not based on the route because it will consume so much api******//

        // const lines =  await fetch(
        //     `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${nearest.Longitude},${nearest.Latitude}?alternatives=true&overview=full&steps=true&geometries=geojson&access_token=${token}&language=id`)
        //     .then(async (res) => await res.json()).then(({ code, routes }) => routes)
        //     console.log(lines);
        // drawline(lines[0])

        const searchResult = [userLocation.longitude, userLocation.latitude]
        const nearestResult = [nearest[0].Longitude, nearest[0].Latitude]
        const bbox = getBbox(nearestResult, searchResult)
        getBoxFitBounds(bbox)
        // flyToLoc(nearestResult)
        
      }
    })()
   
  }, [nearbyFacilitiesFromUserPos, userLocation]);
  

  useEffect(() => {
    onChangePlace(dataForGraph)
  }, [dataForGraph])
  
  
  const getBoxFitBounds=(bbox)=>{
      map.current.fitBounds(bbox, {
        padding: 100,
      });
  }
  
  const drawline = (data) => {
    const route = data.geometry.coordinates;
    const steps = data.legs[0].steps;

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

  const getBbox=(nearestResult, searchResult)=>{
    const lats = [
      nearestResult[1],
      searchResult[1],
    ];
    const lons = [
      nearestResult[0],
      searchResult[0],
    ];
    const sortedLons = lons.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
    const sortedLats = lats.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });
    return [
      [sortedLons[0], sortedLats[0]],
      [sortedLons[1], sortedLats[1]],
    ];
  }

  
  const  flyToLoc=(coordinate)=>{
    map.flyTo({
      center: coordinate,
      zoom: 14.5,
    });
  }
  
  return (
    <div>
      
      <div ref={mapContainer} className="map-container"></div>
    </div>
  )
}

export default Final