import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <div className="relative min-w-[200px] bg-gray-800 rounded-lg shadow-lg overflow-hidden group flex-shrink-0">
      <img
        src={episode.image}
        alt={episode.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-white truncate">
          {episode.title}
        </h3>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <FontAwesomeIcon icon={faPlay} className="text-white text-4xl" />
      </div>
    </div>
  );
};

export default EpisodeCard;
