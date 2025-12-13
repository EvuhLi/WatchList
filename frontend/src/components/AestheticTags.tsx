import { Check } from "lucide-react";

const AESTHETICS = [
  { id: "dark-academia", label: "Dark Academia" },
  { id: "y2k", label: "Y2K" },
  { id: "neon-noir", label: "Neon Noir" },
  { id: "dreamy", label: "Dreamy" },
  { id: "gritty", label: "Gritty Realism" },
  { id: "vintage", label: "Vintage" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "pastoral", label: "Pastoral" },
  { id: "minimalist", label: "Minimalist" },
  { id: "maximalist", label: "Maximalist" },
];

interface AestheticTagsProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const AestheticTags = ({ selected, onChange }: AestheticTagsProps) => {
  const toggleAesthetic = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Aesthetic Vibes
      </h3>
      <div className="flex flex-wrap gap-2">
        {AESTHETICS.map((aesthetic) => {
          const isSelected = selected.includes(aesthetic.id);
          return (
            <button
              key={aesthetic.id}
              onClick={() => toggleAesthetic(aesthetic.id)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }
              `}
            >
              {isSelected && <Check className="w-3 h-3 inline mr-1" />}
              {aesthetic.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
