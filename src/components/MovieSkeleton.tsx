const MovieSkeleton = () => {
  return (
    <div className="bg-black p-4 w-sm rounded animate-pulse">

      <div className="w-full h-72 bg-gray-700 rounded"></div>

      <div className="mt-4 h-5 bg-gray-700 rounded"></div>

      <div className="mt-3 h-4 bg-gray-700 rounded w-1/2"></div>

      <div className="mt-2 h-4 bg-gray-700 rounded w-1/3"></div>

    </div>
  );
};

export default MovieSkeleton;