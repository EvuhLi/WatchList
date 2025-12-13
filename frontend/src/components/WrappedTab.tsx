import { Film, Clock, TrendingUp, Zap } from "lucide-react";

const GENRE_DATA = [
  { name: "Psychological Thriller", percent: 28, color: "bg-primary" },
  { name: "Neo-Noir", percent: 22, color: "bg-accent" },
  { name: "Slow-Burn Drama", percent: 18, color: "bg-steel" },
  { name: "Sci-Fi Mystery", percent: 16, color: "bg-gold-muted" },
  { name: "Dark Comedy", percent: 10, color: "bg-muted-foreground" },
  { name: "Other", percent: 6, color: "bg-slate" },
];

const VIBE_TRAITS = [
  { trait: "Prefers Ambiguity", description: "You love films that leave questions unanswered", score: 92 },
  { trait: "Visual Storytelling", description: "Cinematography matters as much as dialogue", score: 88 },
  { trait: "Slow-Burn Tension", description: "Patience for buildup, love for payoff", score: 85 },
  { trait: "Moral Complexity", description: "No heroes, no villains—just people", score: 82 },
  { trait: "Atmospheric Immersion", description: "You watch for the world, not just the plot", score: 78 },
];

const SIGNATURE_DIRECTORS = [
  { name: "Denis Villeneuve", count: 8 },
  { name: "David Fincher", count: 6 },
  { name: "Park Chan-wook", count: 5 },
];

const StatCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  delay,
}: {
  icon: any;
  label: string;
  value: string;
  subtext: string;
  delay: number;
}) => (
  <div
    className="glass rounded-xl p-4 animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <Icon className="w-5 h-5 text-primary mb-2" />
    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
    <p className="text-xl font-semibold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground">{subtext}</p>
  </div>
);

export const WrappedTab = () => {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">
          Your Movie DNA
        </h2>
        <p className="text-muted-foreground text-sm">
          Based on 247 films watched this year
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={Film}
          label="Films Watched"
          value="247"
          subtext="Top 5% of users"
          delay={0}
        />
        <StatCard
          icon={Clock}
          label="Hours Spent"
          value="412h"
          subtext="17 days of cinema"
          delay={50}
        />
        <StatCard
          icon={TrendingUp}
          label="Avg Rating"
          value="7.8"
          subtext="Discerning taste"
          delay={100}
        />
        <StatCard
          icon={Zap}
          label="Vibe Score"
          value="94"
          subtext="Highly distinctive"
          delay={150}
        />
      </div>

      {/* Genre Breakdown */}
      <div className="glass rounded-xl p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <h3 className="text-sm font-semibold text-foreground mb-4">Genre Breakdown</h3>
        <div className="space-y-3">
          {GENRE_DATA.map((genre) => (
            <div key={genre.name} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-foreground">{genre.name}</span>
                <span className="text-muted-foreground font-mono">{genre.percent}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${genre.color} rounded-full transition-all duration-700`}
                  style={{ width: `${genre.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vibe Fingerprint */}
      <div className="glass rounded-xl p-5 animate-slide-up" style={{ animationDelay: "300ms" }}>
        <h3 className="text-sm font-semibold text-foreground mb-1">Your Vibe Fingerprint</h3>
        <p className="text-xs text-muted-foreground mb-4">
          The traits that define your taste
        </p>
        
        <div className="space-y-4">
          {VIBE_TRAITS.map((trait) => (
            <div key={trait.trait}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="text-sm text-foreground font-medium">{trait.trait}</span>
                  <p className="text-xs text-muted-foreground">{trait.description}</p>
                </div>
                <span className="text-xs font-mono text-primary font-semibold">{trait.score}</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${trait.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signature Directors */}
      <div className="glass rounded-xl p-5 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <h3 className="text-sm font-semibold text-foreground mb-3">Your Signature Directors</h3>
        <div className="space-y-2">
          {SIGNATURE_DIRECTORS.map((director, index) => (
            <div key={director.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-mono w-4">{index + 1}</span>
                <span className="text-sm text-foreground">{director.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{director.count} films</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
