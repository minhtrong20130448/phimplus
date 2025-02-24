import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MovieBasicCard = ({ movie }: MovieCardProps) => {
  return (
    <div
      key={movie.id}
      className="relative min-w-[200px] bg-gray-800 rounded-lg shadow-lg overflow-hidden group flex-shrink-0"
    >
      <div>
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <FontAwesomeIcon icon={faPlay} className="text-white text-4xl" />
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-lg font-semibold text-white truncate">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

export default MovieBasicCard;
