import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div
      key={movie._id}
      className="relative min-w-[200px] bg-gray-800 rounded-lg shadow-lg overflow-hidden group flex-shrink-0"
    >
      <img
        src={
          "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2F" +
          movie.poster_url +
          "&w=256&q=75"
        }
        alt={movie.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-white truncate">
          {movie.name}
        </h3>
        <p className="text-sm text-gray-400 truncate">{movie.year}</p>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <FontAwesomeIcon icon={faPlay} className="text-white text-4xl" />
      </div>
    </div>
  );
};

export default MovieCard;
