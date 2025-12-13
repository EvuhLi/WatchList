const ROTATING_MOVIES = [
  { title: "Hell or High Water", match: 88, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop" },
  { title: "Arrival", match: 92, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop" },
  { title: "Sicario", match: 85, image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop" },
  { title: "Ex Machina", match: 91, image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=450&fit=crop" },
  { title: "Drive", match: 87, image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=450&fit=crop" },
  { title: "Her", match: 89, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=450&fit=crop" },
  { title: "Whiplash", match: 94, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop" },
  { title: "Nightcrawler", match: 86, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop" },
];

const getMatchColor = (match: number) => {
  if (match >= 90) return "bg-match-high text-white";
  if (match >= 80) return "bg-match-mid text-primary-foreground";
  return "bg-match-low text-white";
};

export const RotatingMovieGrid = () => {
  // Double the movies for seamless loop
  const movies = [...ROTATING_MOVIES, ...ROTATING_MOVIES];

  return (
    <div className="relative h-[600px] overflow-hidden rounded-2xl">
      {/* Gradient overlays */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <div className="animate-scroll">
        <div className="grid grid-cols-2 gap-3 p-2">
          {movies.map((movie, index) => (
            <div
              key={`${movie.title}-${index}`}
              className="relative rounded-xl overflow-hidden aspect-[2/3] group"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Match badge */}
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-bold ${getMatchColor(
                  movie.match
                )}`}
              >
                {movie.match}
              </div>
              
              {/* Title on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs font-medium text-white truncate">
                  {movie.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
