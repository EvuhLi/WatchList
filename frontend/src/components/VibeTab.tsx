import { useState } from "react";
import { VibeSlider } from "./VibeSlider";
import { AestheticTags } from "./AestheticTags";
import { MovieCard } from "./MovieCard";
import { RotatingMovieGrid } from "./RotatingMovieGrid";
import { Wand2 } from "lucide-react";

const SAMPLE_MOVIES = [
  {
    title: "Blade Runner 2049",
    year: 2017,
    rating: 8.0,
    genre: "Sci-Fi",
    image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop",
  },
  {
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.8,
    genre: "Epic",
    image: "https://images.unsplash.com/photo-1547499417-29204c97a03d?w=400&h=600&fit=crop",
  },
  {
    title: "The Batman",
    year: 2022,
    rating: 7.8,
    genre: "Noir",
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
  },
  {
    title: "Everything Everywhere",
    year: 2022,
    rating: 8.9,
    genre: "Absurdist",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
  },
];

const CORE_VIBES = [
  { id: "intensity", label: "Intensity", leftLabel: "Cozy", rightLabel: "Intense" },
  { id: "pacing", label: "Pacing", leftLabel: "Slow-burn", rightLabel: "Fast-paced" },
  { id: "tone", label: "Tone", leftLabel: "Dark", rightLabel: "Hopeful" },
  { id: "depth", label: "Depth", leftLabel: "Cerebral", rightLabel: "Fun" },
];

const GENRE_VIBES = [
  { id: "action", label: "Action", leftLabel: "Minimal", rightLabel: "Heavy" },
  { id: "romance", label: "Romance", leftLabel: "None", rightLabel: "Central" },
  { id: "horror", label: "Horror", leftLabel: "None", rightLabel: "Terrifying" },
  { id: "comedy", label: "Comedy", leftLabel: "Serious", rightLabel: "Hilarious" },
];

export const VibeTab = () => {
  const [coreVibes, setCoreVibes] = useState<Record<string, number>>({
    intensity: 50,
    pacing: 50,
    tone: 50,
    depth: 50,
  });

  const [genreVibes, setGenreVibes] = useState<Record<string, number>>({
    action: 50,
    romance: 30,
    horror: 20,
    comedy: 50,
  });

  const [selectedAesthetics, setSelectedAesthetics] = useState<string[]>(["dark-academia"]);
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCoreVibeChange = (id: string, value: number) => {
    setCoreVibes((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenreVibeChange = (id: string, value: number) => {
    setGenreVibes((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 800);
  };

  return (
    <div className="flex gap-6 pb-8">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">
            What's tonight's vibe?
          </h2>
          <p className="text-muted-foreground text-sm">
            Tune the sliders to find the perfect movie
          </p>
        </div>

        {/* Core Vibe Sliders */}
        <div className="space-y-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Mood & Tone
          </h3>
          <div className="space-y-3">
            {CORE_VIBES.map((vibe) => (
              <VibeSlider
                key={vibe.id}
                label={vibe.label}
                leftLabel={vibe.leftLabel}
                rightLabel={vibe.rightLabel}
                value={coreVibes[vibe.id]}
                onChange={(value) => handleCoreVibeChange(vibe.id, value)}
              />
            ))}
          </div>
        </div>

        {/* Genre Sliders */}
        <div className="space-y-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Genre Mix
          </h3>
          <div className="space-y-3">
            {GENRE_VIBES.map((vibe) => (
              <VibeSlider
                key={vibe.id}
                label={vibe.label}
                leftLabel={vibe.leftLabel}
                rightLabel={vibe.rightLabel}
                value={genreVibes[vibe.id]}
                onChange={(value) => handleGenreVibeChange(vibe.id, value)}
              />
            ))}
          </div>
        </div>

        {/* Aesthetics */}
        <AestheticTags
          selected={selectedAesthetics}
          onChange={setSelectedAesthetics}
        />

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Wand2 className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
          {isGenerating ? "Generating..." : "Generate Recommendations"}
        </button>

        {/* Results */}
        {showResults && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground">
              Top Matches
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SAMPLE_MOVIES.map((movie, index) => (
                <MovieCard
                  key={movie.title}
                  {...movie}
                  matchPercent={Math.floor(95 - index * 7)}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rotating Movie Grid - Desktop Only */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <RotatingMovieGrid />
      </div>
    </div>
  );
};
