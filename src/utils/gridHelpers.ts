import { Cell, CellType } from "@/types/pathfinding";

export const getGridDimensions = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1024;
  if (width < 640) {
    // Mobile
    return { rows: 20, cols: 15, startRow: 2, startCol: 7, endRow: 17, endCol: 7 };
  }
  if (width < 1024) {
    // Tablet
    return { rows: 35, cols: 15, startRow: 4, startCol: 7, endRow: 30, endCol: 7 };
  }
  // Desktop
  return { rows: 20, cols: 50, startRow: 10, startCol: 10, endRow: 10, endCol: 40 };
};

export const createInitialGrid = (): Cell[][] => {
  const { rows, cols, startRow, startCol, endRow, endCol } = getGridDimensions();
  const grid: Cell[][] = [];
  for (let row = 0; row < rows; row++) {
    const currentRow: Cell[] = [];
    for (let col = 0; col < cols; col++) {
      let type: CellType = "unvisited";
      if (row === startRow && col === startCol) type = "start";
      if (row === endRow && col === endCol) type = "end";

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
  const numRows = grid.length;
  const numCols = grid[0].length;

  if (row > 0) neighbors.push(grid[row - 1][col]); // Up
  if (row < numRows - 1) neighbors.push(grid[row + 1][col]); // Down
  if (col > 0) neighbors.push(grid[row][col - 1]); // Left
  if (col < numCols - 1) neighbors.push(grid[row][col + 1]); // Right

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
