import React, { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "react-fetch-hook";

function NewsFetching() {
  const { isLoading, error, data } = useFetch(
    "https://newsapi.org/v2/top-headlines?apiKey=e2c33fa4d8af42bf8273a226d28060e6&q=covid"
  );

  if (isLoading) return "loading...";
  if (error) return "error fetching data";

  const qr = data.articles.map((article) => (
    <div className="grid-item">
      <a
        href={article.url}
        style={{ textDecoration: "inherit" }}
        target="_blank"
      >
        <img src={article.urlToImage} />

        <div className="description">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="detail">
            <p>{article.publishedAt}</p>
            <p>{article.source.name}</p>
          </div>
        </div>
      </a>
    </div>
  ));

  return <>{qr}</>;
}

export default NewsFetching;
