import { Cell, AlgorithmResult } from "@/types/pathfinding";
import { getNeighbors, getShortestPath, manhattanDistance } from "@/utils/gridHelpers";

export const greedy = (grid: Cell[][], startCell: Cell, endCell: Cell): AlgorithmResult => {
  const visitedNodesInOrder: Cell[] = [];
  const openSet: Cell[] = [startCell];
  
  startCell.distance = 0;
  startCell.heuristic = manhattanDistance(startCell, endCell);

  while (openSet.length > 0) {
    // Sort by heuristic only (greedy approach)
    openSet.sort((a, b) => (a.heuristic || Infinity) - (b.heuristic || Infinity));
    const currentCell = openSet.shift()!;

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
        neighbor.heuristic = manhattanDistance(neighbor, endCell);
        
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return { visitedNodesInOrder, shortestPath: [] };
};
