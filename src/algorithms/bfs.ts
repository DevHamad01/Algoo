import { Cell, AlgorithmResult } from "@/types/pathfinding";
import { getNeighbors, getShortestPath } from "@/utils/gridHelpers";

export const bfs = (grid: Cell[][], startCell: Cell, endCell: Cell): AlgorithmResult => {
  const visitedNodesInOrder: Cell[] = [];
  const queue: Cell[] = [startCell];
  startCell.distance = 0;

  while (queue.length > 0) {
    const currentCell = queue.shift()!;
    
    if (currentCell.isVisited) continue;
    if (currentCell.type === "wall") continue;

    currentCell.isVisited = true;
    visitedNodesInOrder.push(currentCell);

    // Check if we reached the end using row/col comparison
    if (currentCell.row === endCell.row && currentCell.col === endCell.col) {
      return {
        visitedNodesInOrder,
        shortestPath: getShortestPath(currentCell),
      };
    }

    const neighbors = getNeighbors(currentCell, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && neighbor.type !== "wall") {
        neighbor.distance = currentCell.distance + 1;
        neighbor.previousCell = currentCell;
        queue.push(neighbor);
      }
    }
  }

  return { visitedNodesInOrder, shortestPath: [] };
};
