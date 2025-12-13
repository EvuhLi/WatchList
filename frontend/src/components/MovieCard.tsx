interface MovieCardProps {
  title: string;
  year: number;
  rating: number;
  genre: string;
  image: string;
  matchPercent: number;
  delay?: number;
}

const getMatchColor = (match: number) => {
  if (match >= 90) return "bg-match-high text-white";
  if (match >= 80) return "bg-match-mid text-primary-foreground";
  return "bg-match-low text-white";
};

export const MovieCard = ({
  title,
  year,
  rating,
  genre,
  image,
  matchPercent,
  delay = 0,
}: MovieCardProps) => {
  return (
    <div
      className="glass rounded-xl overflow-hidden group cursor-pointer animate-slide-up hover:scale-[1.02] transition-transform"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="aspect-[2/3] relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Match badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-bold ${getMatchColor(
            matchPercent
          )}`}
        >
          {matchPercent}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h4 className="font-medium text-foreground text-sm mb-0.5 line-clamp-1">
            {title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{year}</span>
            <span>•</span>
            <span>{genre}</span>
            <span>•</span>
            <span className="text-primary font-medium">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};