import React, { useState } from "react";

import MovieList from "./MovieList";
import { Button } from "react-bootstrap";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovieHandler = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
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
        {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {!isLoading && movies.length === 0 && <p style={{marginLeft:'39.8rem', marginTop: "0.5rem"}}>No Movies Found</p>}
        {isLoading && <p style={{marginLeft:'41.5rem', marginTop: "1rem"}}>Loading...</p>}
      </section>
    </>
  );
};
export default MoviePage;
