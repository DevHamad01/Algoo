import { AlgorithmType, Speed } from "@/types/pathfinding";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Play, RotateCcw, Eraser } from "lucide-react";

interface ControlsProps {
  algorithm: AlgorithmType;
  speed: Speed;
  isVisualizing: boolean;
  showNodeDistance: boolean;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  onSpeedChange: (speed: Speed) => void;
  onVisualize: () => void;
  onClearBoard: () => void;
  onClearPath: () => void;
  onToggleNodeDistance: (show: boolean) => void;
}

const algorithmNames: Record<AlgorithmType, string> = {
  bfs: "Breadth-First Search",
  dijkstra: "Dijkstra's Algorithm",
  astar: "A* Search",
  greedy: "Greedy Best-First",
};

const speedValues: Record<Speed, number> = {
  slow: 50,
  medium: 20,
  fast: 5,
};

export const Controls = ({
  algorithm,
  speed,
  isVisualizing,
  showNodeDistance,
  onAlgorithmChange,
  onSpeedChange,
  onVisualize,
  onClearBoard,
  onClearPath,
  onToggleNodeDistance,
}: ControlsProps) => {
  const handleSpeedSliderChange = (value: number[]) => {
    const speedValue = value[0];
    if (speedValue <= 15) onSpeedChange("fast");
    else if (speedValue <= 35) onSpeedChange("medium");
    else onSpeedChange("slow");
  };

  return (
    <div className="flex flex-wrap items-center gap-6 p-6 bg-card rounded-lg border border-border shadow-sm">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-foreground">Algorithm:</label>
        <Select
          value={algorithm}
          onValueChange={(value) => onAlgorithmChange(value as AlgorithmType)}
          disabled={isVisualizing}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(algorithmNames).map(([key, name]) => (
              <SelectItem key={key} value={key}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 min-w-[200px]">
        <label className="text-sm font-medium text-foreground">Speed:</label>
        <Slider
          value={[speedValues[speed]]}
          onValueChange={handleSpeedSliderChange}
          min={5}
          max={50}
          step={1}
          disabled={isVisualizing}
          className="flex-1"
        />
        <span className="text-sm text-muted-foreground capitalize w-16">{speed}</span>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="node-distance"
          checked={showNodeDistance}
          onCheckedChange={onToggleNodeDistance}
          disabled={isVisualizing}
        />
        <Label htmlFor="node-distance" className="text-sm font-medium text-foreground cursor-pointer">
          Show Node Distance
        </Label>
      </div>

      <div className="flex gap-2 ml-auto">
        <Button
          onClick={onVisualize}
          disabled={isVisualizing}
          className="gap-2"
        >
          <Play className="w-4 h-4" />
          Visualize
        </Button>
        
        <Button
          onClick={onClearPath}
          disabled={isVisualizing}
          variant="secondary"
          className="gap-2"
        >
          <Eraser className="w-4 h-4" />
          Clear Path
        </Button>

        <Button
          onClick={onClearBoard}
          disabled={isVisualizing}
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Clear Board
        </Button>
      </div>
    </div>
  );
};
