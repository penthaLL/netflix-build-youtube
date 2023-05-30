import axios from "./axios";
import React, { useEffect, useState } from "react";
import "./Row.css";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const base_url = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">      
        {movies.map( 
          (movie) => 
          ((isLargeRow && movie.poster_path) || 
            (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={` ${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
          ))
        };
      </div>
    </div>
  );
};

export default Row;
