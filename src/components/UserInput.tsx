import { useState } from "react";
import MovieData from "./MovieData";

const UserInput = () => {
  const lastSearched = localStorage.getItem("lastMovie") || "avengers";
  const [movie, setMovie] = useState("");

  const [movieName, setMovieName] = useState(lastSearched);
  const [hasSearched, setHasSearched] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (movie.trim() === "") {
      return;
    }
    setMovieName(movie);
    setHasSearched(true);
    setMovie("");
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="searchBar">
        <div
          className="group w-80 bg-zinc-700 focus-within:bg-zinc-800 flex justify-between items-center gap-2 border-2 border-slate-500 
         sm:gap-2 p-2 sm:w-[600px] mx-auto rounded-3xl focus-within:ring-1 focus-within:ring-slate-500  transition duration-300 ease-in"
        >
          <svg
            className="h-6 w-6 px-1 fill-gray-400 group-focus-within:fill-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
          <input
            type="text"
            placeholder="search movie here....."
            onChange={(e) => setMovie(e.target.value)}
            value={movie}
            className="w-full  text-zinc-300 outline-none sm:flex-4 "
          ></input>
          <button type="submit">
            <svg
              className="h-4 px-1 fill-gray-400 group-focus-within:fill-gray-200 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z" />
            </svg>
          </button>
        </div>
      </form>
      {movieName && (
        <MovieData movieName={movieName} hasSearched={hasSearched}></MovieData>
      )}
    </div>
  );
};

export default UserInput;
