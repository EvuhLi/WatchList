import { Users, Heart, Eye } from "lucide-react";
import { useState } from "react";

interface MovieTwin {
  name: string;
  avatar: string;
  compatibility: number;
  sharedGenres: string[];
  mutualFavorite: string;
  watchlistCount: number;
}

const MOVIE_TWINS: MovieTwin[] = [
  {
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    compatibility: 94,
    sharedGenres: ["Neo-Noir", "Psychological"],
    mutualFavorite: "Blade Runner 2049",
    watchlistCount: 186,
  },
  {
    name: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    compatibility: 87,
    sharedGenres: ["Slow-Burn", "Mystery"],
    mutualFavorite: "Arrival",
    watchlistCount: 142,
  },
  {
    name: "Sam Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    compatibility: 82,
    sharedGenres: ["Sci-Fi", "Thriller"],
    mutualFavorite: "Dune",
    watchlistCount: 203,
  },
];

const SHARED_RECS = [
  {
    title: "Interstellar",
    recommender: "Alex Chen",
    note: "Since you both loved Arrival",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=200&h=300&fit=crop",
  },
  {
    title: "Ex Machina",
    recommender: "Jordan Lee",
    note: "Matches your shared Sci-Fi love",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=300&fit=crop",
  },
];

interface WatchlistModalProps {
  twin: MovieTwin | null;
  onClose: () => void;
}

const WatchlistModal = ({ twin, onClose }: WatchlistModalProps) => {
  if (!twin) return null;

  const sampleWatchlist = [
    { title: "Prisoners", year: 2013, rating: 8.1 },
    { title: "Zodiac", year: 2007, rating: 7.7 },
    { title: "The Prestige", year: 2006, rating: 8.5 },
    { title: "Mulholland Drive", year: 2001, rating: 7.9 },
    { title: "Oldboy", year: 2003, rating: 8.4 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="glass rounded-xl p-6 w-full max-w-md animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <img src={twin.avatar} alt={twin.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-foreground">{twin.name}'s Watchlist</h3>
            <p className="text-xs text-muted-foreground">{twin.watchlistCount} films</p>
          </div>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {sampleWatchlist.map((movie) => (
            <div key={movie.title} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm text-foreground">{movie.title}</p>
                <p className="text-xs text-muted-foreground">{movie.year}</p>
              </div>
              <span className="text-xs font-mono text-primary">{movie.rating}</span>
            </div>
          ))}
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const TwinCard = ({ twin, delay, onViewWatchlist }: { twin: MovieTwin; delay: number; onViewWatchlist: () => void }) => (
  <div
    className="glass rounded-xl p-4 animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start gap-3">
      <div className="relative">
        <img
          src={twin.avatar}
          alt={twin.name}
          className="w-12 h-12 rounded-full object-cover border border-border"
        />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
          {twin.compatibility}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground text-sm">{twin.name}</h4>
        <p className="text-xs text-muted-foreground mb-2">
          {twin.compatibility}% match
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {twin.sharedGenres.map((genre) => (
            <span
              key={genre}
              className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
    
    <div className="mt-3 pt-3 border-t border-border">
      <div className="flex items-center gap-2 text-xs">
        <Heart className="w-3 h-3 text-primary" />
        <span className="text-muted-foreground">Both love:</span>
        <span className="text-foreground font-medium truncate">{twin.mutualFavorite}</span>
      </div>
    </div>
    
    <button
      onClick={onViewWatchlist}
      className="w-full mt-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-xs font-medium flex items-center justify-center gap-2"
    >
      <Eye className="w-3 h-3" />
      View Watchlist ({twin.watchlistCount})
    </button>
  </div>
);

export const SocialTab = () => {
  const [selectedTwin, setSelectedTwin] = useState<MovieTwin | null>(null);

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">
            Your Movie Circle
          </h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Find your people through shared taste
        </p>
      </div>

      {/* Movie Twins */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Your Movie Twins
        </h3>
        <div className="space-y-3">
          {MOVIE_TWINS.map((twin, index) => (
            <TwinCard
              key={twin.name}
              twin={twin}
              delay={index * 50}
              onViewWatchlist={() => setSelectedTwin(twin)}
            />
          ))}
        </div>
      </div>

      {/* Shared Recommendations */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          From Your Twins
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {SHARED_RECS.map((rec, index) => (
            <div
              key={rec.title}
              className="glass rounded-xl overflow-hidden animate-slide-up"
              style={{ animationDelay: `${150 + index * 50}ms` }}
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={rec.image}
                  alt={rec.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="font-medium text-foreground text-sm mb-0.5">
                    {rec.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">
                    {rec.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compatibility Check CTA */}
      <div className="glass rounded-xl p-5 animate-slide-up" style={{ animationDelay: "250ms" }}>
        <h3 className="text-sm font-semibold text-foreground mb-1">
          Check Compatibility
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Enter a friend's username to see your movie match score
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="@username"
            className="flex-1 px-3 py-2 rounded-lg bg-muted border-none text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Check
          </button>
        </div>
      </div>

      {/* Watchlist Modal */}
      <WatchlistModal twin={selectedTwin} onClose={() => setSelectedTwin(null)} />
    </div>
  );
};
