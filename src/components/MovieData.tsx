import { useState, useEffect } from "react";
import axios from "axios";
import MovieSkeleton from "./MovieSkeleton";
import default_poster from "../assets/default_poster.png";

type Props = {
  movieName: string;
  hasSearched: boolean;
};

type MovieType = {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbID: string;
};

type movieApiResponseType = {
  Search?: MovieType[];
  Response: "True" | "False";
  Error?: string;
};

const MovieData = ({ movieName, hasSearched }: Props) => {
  const [movieData, setMovieData] = useState<movieApiResponseType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

  useEffect(() => {
    setLoading(true);
    if (movieName.trim() === "") {
      setLoading(false);
      return;
    }
    axios
      .get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`)
      .then((response) => {
        if (response.data.Response === "True") {
          setError("");
          setMovieData(response.data);
          localStorage.setItem("lastMovie", movieName);
          console.log(response.data);
        } else {
          setMovieData(null);
          setError(response.data.Error);
        }
        setLoading(false);
      })
      .catch(() => {
        setMovieData(null);
        setLoading(false);
        setError("something went wrong");
      });
  }, [movieName]);

  const sortedMovies = movieData?.Search
    ? [...movieData.Search].sort((a, b) => Number(b.Year) - Number(a.Year))
    : [];

  return (
    <div>
      {loading && !movieData && (
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6  mt-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      )}
      {error && (
        <p className="font-semibold text-red-500 my-3 sm:text-3xl ">{error}</p>
      )}
      {movieData && movieData.Search && (
        <>
          {hasSearched && (
            <div className="sm:text-2xl font-bold mt-3 text-slate-400 shadow-2xs  p-2 ">
              {movieData.Search.length} result(s) found for "
              <span className="text-green-400">{movieName}</span>"
            </div>
          )}

          <div
            className="mt-5 grid lg:grid-cols-3 
          xl:grid-cols-4  gap-5 items-center w-full 
          sm:grid-cols-2 "
          >
            {sortedMovies.map((movie) => (
              <div
                className=" text-white  xl:aspect-[3/6] lg:aspect-[3/4] md:aspect-[2/3] sm:aspect-[2/2] flex flex-col gap-3 bg-black/30  py-3 px-2 hover:shadow-lg shadow-slate-400 transition duration-300 "
                key={movie.imdbID}
              >
                <div className="relative group w-fit mx-auto">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.onerror = null;
                      img.src = default_poster;
                    }}
                    className="w-60 h-80 object-cover mx-auto my-2 rounded hover:scale-[1.03] transform duration-300 backdrop-blur-2xl  "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 group-hover:opacity-100 transition duration-300"></div>
                </div>

                <h2 className="font-bold  xl:text-3xl lg:text-2xl ">
                  {movie.Title}
                </h2>
                <p className="font-semibold my-2">Year : {movie.Year}</p>
                <p className="font-semibold">Type : {movie.Type}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieData;
