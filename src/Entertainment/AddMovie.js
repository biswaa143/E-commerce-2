import React, { useState } from "react";

import MovieList from "./MovieList";
import { Button } from "react-bootstrap";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const fetchMovieHandler = async () => {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
  };
  return (
    <>
      <section>
        <Button
          style={{ marginLeft: "40rem", marginTop: "1rem" }}
          onClick={fetchMovieHandler}
        >
          Fetch Movies
        </Button>
      </section>
      <section>
        <MovieList movies={movies} />
      </section>
    </>
  );
};
export default MoviePage;
