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

const speedToSliderMap: Record<Speed, number> = {
  slow: 1,
  medium: 2,
  fast: 3,
};

const sliderToSpeedMap: Record<number, Speed> = {
  1: "slow",
  2: "medium",
  3: "fast",
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
    onSpeedChange(sliderToSpeedMap[value[0]]);
  };

  return (
    <div className="flex flex-col lg:flex-row flex-wrap items-start lg:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-card rounded-lg border border-border shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
        <label className="text-sm font-medium text-foreground shrink-0">Algorithm:</label>
        <Select
          value={algorithm}
          onValueChange={(value) => onAlgorithmChange(value as AlgorithmType)}
          disabled={isVisualizing}
        >
          <SelectTrigger className="w-full sm:w-[220px]">
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

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto lg:min-w-[200px]">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <label className="text-sm font-medium text-foreground shrink-0">Speed:</label>
          <span className="text-sm text-muted-foreground capitalize sm:hidden">{speed}</span>
        </div>
        <Slider
          value={[speedToSliderMap[speed]]}
          onValueChange={handleSpeedSliderChange}
          min={1}
          max={3}
          step={1}
          disabled={isVisualizing}
          className="flex-1 w-full my-2 sm:my-0"
        />
        <span className="text-sm text-muted-foreground capitalize w-16 hidden sm:inline-block">{speed}</span>
      </div>

      <div className="flex items-center gap-2 w-full lg:w-auto">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-2 w-full lg:w-auto lg:ml-auto mt-2 lg:mt-0">
        <Button
          onClick={onVisualize}
          disabled={isVisualizing}
          className="col-span-2 sm:col-span-1 w-full gap-2"
        >
          <Play className="w-4 h-4" />
          Visualize
        </Button>

        <Button
          onClick={onClearPath}
          disabled={isVisualizing}
          variant="secondary"
          className="col-span-1 w-full gap-2 hover:bg-secondary hover:text-secondary-foreground"
        >
          <Eraser className="w-4 h-4" />
          Clear Path
        </Button>

        <Button
          onClick={onClearBoard}
          disabled={isVisualizing}
          variant="outline"
          className="col-span-1 w-full gap-2 hover:bg-background hover:text-foreground"
        >
          <RotateCcw className="w-4 h-4" />
          Clear Board
        </Button>
      </div>
    </div>
  );
};
