import { Cell, AlgorithmResult } from "@/types/pathfinding";
import { getNeighbors, getShortestPath } from "@/utils/gridHelpers";

export const dijkstra = (grid: Cell[][], startCell: Cell, endCell: Cell): AlgorithmResult => {
  const visitedNodesInOrder: Cell[] = [];
  startCell.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift()!;

    if (closestNode.type === "wall") continue;
    if (closestNode.distance === Infinity) {
      return { visitedNodesInOrder, shortestPath: [] };
    }

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    // Check if we reached the end using row/col comparison
    if (closestNode.row === endCell.row && closestNode.col === endCell.col) {
      return {
        visitedNodesInOrder,
        shortestPath: getShortestPath(closestNode),
      };
    }

    updateUnvisitedNeighbors(closestNode, grid);
  }

  return { visitedNodesInOrder, shortestPath: [] };
};

const getAllNodes = (grid: Cell[][]): Cell[] => {
  const nodes: Cell[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const sortNodesByDistance = (unvisitedNodes: Cell[]): void => {
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
};

const updateUnvisitedNeighbors = (node: Cell, grid: Cell[][]): void => {
  const unvisitedNeighbors = getNeighbors(node, grid).filter((n) => !n.isVisited);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousCell = node;
  }
};
