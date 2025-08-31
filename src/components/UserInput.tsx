import { useState } from "react";
import MovieData from "./MovieData";

const UserInput = () => {
  const [movie, setMovie] = useState("");
  const [movieName, setMovieName] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMovieName(movie);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="searchBar">
        <div
          className="w-80 flex justify-between gap-2 border-2 sm:flex
         sm:justify-between sm:gap-2 p-2 sm:w-150 mx-auto rounded"
        >
          <label className="hidden md:block p-2 text-lg font-semibold">
            Enter the movie name :
          </label>
          <input
            type="text"
            placeholder="search your movie here....."
            onChange={(e) => setMovie(e.target.value)}
            className="border sm:flex-4 rounded flex-2 pl-2"
          ></input>
          <button
            type="submit"
            className=" flex-1 sm:flex-1 border bg-amber-400
             hover:bg-amber-400/80 p-1 rounded"
          >
            search
          </button>
        </div>
      </form>
      {movieName && <MovieData movieName={movieName}></MovieData>}
    </div>
  );
};

export default UserInput;
