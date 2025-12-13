import { Slider } from "@/components/ui/slider";

interface VibeSliderProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
}

export const VibeSlider = ({
  label,
  leftLabel,
  rightLabel,
  value,
  onChange,
}: VibeSliderProps) => {
  return (
    <div className="glass rounded-lg p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {value}
        </span>
      </div>
      
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        max={100}
        step={1}
        className="mb-2"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
};
