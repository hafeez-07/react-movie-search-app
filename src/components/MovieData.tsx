import { useState, useEffect } from "react";
import axios from "axios";

type movieProp = {
  movieName: string;
};

type MovieType = {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
};

type movieApiResponseType = {
  Search?: MovieType[];
  Response: "True" | "False";
  Error?: string;
};

const MovieData = ({ movieName }: movieProp) => {
  const [movieData, setMovieData] = useState<movieApiResponseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    setLoading(true);
    if (typeof movieName !== "string" || movieName.trim() === "") {
      setLoading(false);
      return;
    }
    axios
      .get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`)
      .then((response) => {
        if (response.data.Response === "True") {
          setError("");
          setMovieData(response.data);
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

  return (
    <div>
      {loading && <p className="font-semibold my-3">Loading.....🥰</p>}
      {error && (
        <p className="font-semibold text-red-500 my-3 sm:text-3xl ">{error}</p>
      )}
      {movieData && movieData.Search && (
        <>
          <p className="sm:text-2xl font-bold my-3 text-green-400 shadow-2xs border bg-slate-900 p-2 ">
            Total {movieData.Search.length} result(s) found
          </p>
          <div
            className="grid lg:grid-cols-3 lg:grid-rows-4 
          xl:grid-cols-4 xl:grid-rows-3 gap-5 items-center w-full 
          sm:grid-cols-2 sm:grid-rows-5"
          >
            {movieData.Search.map((movie, index) => (
              <div
                className="border-2 xl:aspect-[3/6] lg:aspect-[3/4] md:aspect-[2/3] sm:aspect-[2/2] flex flex-col gap-3 bg-[#E7D3D3] "
                key={index}
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-60 h-80 object-cover mx-auto my-2 "
                />
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
