import { Cell, AlgorithmResult } from "@/types/pathfinding";
import { getNeighbors, getShortestPath, manhattanDistance } from "@/utils/gridHelpers";

export const astar = (grid: Cell[][], startCell: Cell, endCell: Cell): AlgorithmResult => {
  const visitedNodesInOrder: Cell[] = [];
  const openSet: Cell[] = [startCell];
  
  startCell.distance = 0;
  startCell.heuristic = manhattanDistance(startCell, endCell);
  startCell.fScore = startCell.heuristic;

  while (openSet.length > 0) {
    // Sort by fScore
    openSet.sort((a, b) => (a.fScore || Infinity) - (b.fScore || Infinity));
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
      if (neighbor.isVisited || neighbor.type === "wall") continue;

      const tentativeG = currentCell.distance + 1;

      if (tentativeG < neighbor.distance) {
        neighbor.previousCell = currentCell;
        neighbor.distance = tentativeG;
        neighbor.heuristic = manhattanDistance(neighbor, endCell);
        neighbor.fScore = neighbor.distance + neighbor.heuristic;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return { visitedNodesInOrder, shortestPath: [] };
};
