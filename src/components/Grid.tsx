import { Cell } from "@/types/pathfinding";
import { GridCell } from "./GridCell";

interface GridProps {
  grid: Cell[][];
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  showNodeDistance: boolean;
}

export const Grid = ({ grid, onMouseDown, onMouseEnter, onMouseUp, showNodeDistance }: GridProps) => {
  return (
    <div className="inline-block border-2 border-border rounded-lg overflow-hidden shadow-lg bg-card">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="flex">
          {row.map((cell, cellIdx) => (
            <GridCell
              key={cellIdx}
              cell={cell}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
              onMouseUp={onMouseUp}
              showNodeDistance={showNodeDistance}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
