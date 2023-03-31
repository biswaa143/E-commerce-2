import React, { useEffect, useState } from "react";

import MovieList from "./MovieList";
import { Button } from "react-bootstrap";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  const fetchMovieHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film/");
      if (!response.ok) {
        throw new Error("Something went wrong....Retrying");
      }
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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  let content = (
    <p style={{ marginLeft: "39.8rem", marginTop: "0.5rem" }}>
      No Movies Found
    </p>
  );

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  const cancelRetrying = () => {
    content = <p></p>;
    setError(null);
    setRetry(false);
  };

  if (error) {
    content = (
      <div>
        {" "}
        {`${error}`}{" "}
        <Button variant="outline-danger" onClick={cancelRetrying}>
          {" "}
          cancel
        </Button>{" "}
      </div>
    );
  }

  useEffect(() => {
    if(retry) {
      const timer = setTimeout(() => {
        fetchMovieHandler(setMovies, setIsLoading, setError , setRetry)
        .setRetry(false); 
        console.log('retrying..')
      }, 5000);
      return ()=>clearTimeout(timer);
    }
  },[retry,setMovies])

  useEffect(()=>{
    fetchMovieHandler(setMovies, setIsLoading, setError , setRetry) 
  },[setMovies])

  if (isLoading) {
    content = (
      <p style={{ marginLeft: "41.5rem", marginTop: "1rem" }}>Loading...</p>
    );
  }

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
      <section>{content}</section>
    </>
  );
};
export default MoviePage;
