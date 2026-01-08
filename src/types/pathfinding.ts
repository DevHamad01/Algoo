export type CellType = "start" | "end" | "wall" | "unvisited" | "visited" | "path" | "current";

export interface Cell {
  row: number;
  col: number;
  type: CellType;
  distance: number;
  isVisited: boolean;
  previousCell: Cell | null;
  heuristic?: number;
  fScore?: number;
  visitOrder?: number;
  pathOrder?: number;
}

export type AlgorithmType = "bfs" | "dijkstra" | "astar" | "greedy";

export interface AlgorithmResult {
  visitedNodesInOrder: Cell[];
  shortestPath: Cell[];
}

export type Speed = "slow" | "medium" | "fast";
