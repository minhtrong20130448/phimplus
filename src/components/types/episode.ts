interface HorizontalEpisodeListProps {
  movie: any;
  episodes: any;
  title: string;
}

interface Episode {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface EpisodeCardProps {
  episode: Episode;
}
