import React, { useEffect, useState } from "react";

function NewsFetching() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://covid19.mathdro.id/api/confirmed")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Fetching Data...</div>;
  } else {
    return (
      <ul>
        {items.slice(0, 10).map((item, i) => (
          <li key={i}>
            {item.countryRegion} {item.confirmed} {item.deaths}
          </li>
        ))}
      </ul>
    );
  }
}

export default NewsFetching;
