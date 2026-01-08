import { Cell, CellType } from "@/types/pathfinding";

export const GRID_ROWS = 20;
export const GRID_COLS = 50;
export const START_NODE_ROW = 10;
export const START_NODE_COL = 10;
export const END_NODE_ROW = 10;
export const END_NODE_COL = 40;

export const createInitialGrid = (): Cell[][] => {
  const grid: Cell[][] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow: Cell[] = [];
    for (let col = 0; col < GRID_COLS; col++) {
      let type: CellType = "unvisited";
      if (row === START_NODE_ROW && col === START_NODE_COL) type = "start";
      if (row === END_NODE_ROW && col === END_NODE_COL) type = "end";

      currentRow.push({
        row,
        col,
        type,
        distance: Infinity,
        isVisited: false,
        previousCell: null,
      });
    }
    grid.push(currentRow);
  }
  return grid;
};

export const getNeighbors = (cell: Cell, grid: Cell[][]): Cell[] => {
  const neighbors: Cell[] = [];
  const { row, col } = cell;

  if (row > 0) neighbors.push(grid[row - 1][col]); // Up
  if (row < GRID_ROWS - 1) neighbors.push(grid[row + 1][col]); // Down
  if (col > 0) neighbors.push(grid[row][col - 1]); // Left
  if (col < GRID_COLS - 1) neighbors.push(grid[row][col + 1]); // Right

  return neighbors.filter((neighbor) => neighbor.type !== "wall");
};

export const manhattanDistance = (cell1: Cell, cell2: Cell): number => {
  return Math.abs(cell1.row - cell2.row) + Math.abs(cell1.col - cell2.col);
};

export const getShortestPath = (endCell: Cell): Cell[] => {
  const shortestPath: Cell[] = [];
  let currentCell: Cell | null = endCell;

  while (currentCell !== null) {
    shortestPath.unshift(currentCell);
    currentCell = currentCell.previousCell;
  }

  return shortestPath;
};

export const resetGrid = (grid: Cell[][]): Cell[][] => {
  return grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      distance: Infinity,
      isVisited: false,
      previousCell: null,
      heuristic: undefined,
      fScore: undefined,
      type: cell.type === "visited" || cell.type === "path" || cell.type === "current" 
        ? "unvisited" 
        : cell.type,
    }))
  );
};
