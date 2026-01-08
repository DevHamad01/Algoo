import { Cell } from "@/types/pathfinding";
import { cn } from "@/lib/utils";
import { Play, Target } from "lucide-react";

interface GridCellProps {
  cell: Cell;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  showNodeDistance: boolean;
}

export const GridCell = ({ cell, onMouseDown, onMouseEnter, onMouseUp, showNodeDistance }: GridCellProps) => {
  const getCellClassName = () => {
    const baseClasses = "cell w-6 h-6 cursor-pointer relative flex items-center justify-center";
    
    switch (cell.type) {
      case "start":
        return cn(baseClasses, "cell-start");
      case "end":
        return cn(baseClasses, "cell-end");
      case "wall":
        return cn(baseClasses, "cell-wall");
      case "visited":
        return cn(baseClasses, "cell-visited");
      case "path":
        return cn(baseClasses, "cell-path");
      case "current":
        return cn(baseClasses, "cell-current");
      default:
        return cn(baseClasses, "cell-unvisited hover:bg-secondary/50");
    }
  };

  const renderContent = () => {
    if (cell.type === "start") {
      return <Play className="w-3 h-3 text-white fill-white" />;
    }
    if (cell.type === "end") {
      return <Target className="w-3 h-3 text-white" />;
    }
    
    if (showNodeDistance) {
      if (cell.type === "path" && cell.pathOrder !== undefined) {
        return <span className="text-[10px] font-bold text-foreground">{cell.pathOrder}</span>;
      }
      if (cell.type === "visited" && cell.visitOrder !== undefined) {
        return <span className="text-[9px] font-semibold text-muted-foreground">{cell.visitOrder}</span>;
      }
    }
    
    return null;
  };

  return (
    <div
      className={getCellClassName()}
      onMouseDown={() => onMouseDown(cell.row, cell.col)}
      onMouseEnter={() => onMouseEnter(cell.row, cell.col)}
      onMouseUp={onMouseUp}
    >
      {renderContent()}
    </div>
  );
};
