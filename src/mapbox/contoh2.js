const datas = [
  {
    lng: -84.511987,
    lat: 39.102638,
  },
  {
    lng: -84.511987,
    lat: 39.102638,
  },
  {
    lng: -84.511987,
    lat: 39.102638,
  },
];
const current = {
  lng: -84.519161,
  lat: 39.134209,
};
const token =
  "pk.eyJ1IjoiYXJpZmlza2FuZGFyIiwiYSI6ImNrMnhuODQxdTBiNGszbm1vdWJyMXIwbjgifQ.zC6YieciiPLnoeuY_YVP8g";

const [distances, setDistances] = useState([]);

const getRoute = useCallback(
  ({ code, routes }) => {
    if (code == "Ok") {
      setDistances([...distances, routes[0].distance]);
    }
  },
  [distances]
);

datas.map((data) => {
  fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${current.lng},${current.lat};${data.lng},${data.lat}?geometries=geojson&access_token=${token}`
  )
    .then((res) => res.json())
    .then((data) => getRoute(data));
});

useEffect(() => {
  console.log(distances);
}, [distances]);
