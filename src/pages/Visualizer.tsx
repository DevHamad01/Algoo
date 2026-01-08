import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Cell, AlgorithmType, Speed } from "@/types/pathfinding";
import { createInitialGrid, resetGrid } from "@/utils/gridHelpers";
import { bfs } from "@/algorithms/bfs";
import { dijkstra } from "@/algorithms/dijkstra";
import { astar } from "@/algorithms/astar";
import { greedy } from "@/algorithms/greedy";
import { Grid } from "@/components/Grid";
import { Controls } from "@/components/Controls";
import { Legend } from "@/components/Legend";
import { toast } from "sonner";

const Visualizer = () => {
  const [searchParams] = useSearchParams();
  const [grid, setGrid] = useState<Cell[][]>(() => createInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("astar");
  const [speed, setSpeed] = useState<Speed>("medium");
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);
  const [showNodeDistance, setShowNodeDistance] = useState(false);

  // Pre-select algorithm from URL parameter
  useEffect(() => {
    const algoParam = searchParams.get("algorithm");
    if (algoParam && ["bfs", "dijkstra", "astar", "greedy"].includes(algoParam)) {
      setAlgorithm(algoParam as AlgorithmType);
    }
  }, [searchParams]);

  const speedDelays: Record<Speed, number> = {
    slow: 50,
    medium: 20,
    fast: 5,
  };

  const handleMouseDown = (row: number, col: number) => {
    const cell = grid[row][col];
    
    if (cell.type === "start") {
      setIsDraggingStart(true);
    } else if (cell.type === "end") {
      setIsDraggingEnd(true);
    } else {
      const newGrid = toggleWall(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed && !isDraggingStart && !isDraggingEnd) return;

    if (isDraggingStart) {
      const newGrid = moveStartNode(grid, row, col);
      setGrid(newGrid);
    } else if (isDraggingEnd) {
      const newGrid = moveEndNode(grid, row, col);
      setGrid(newGrid);
    } else {
      const newGrid = toggleWall(grid, row, col);
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setIsDraggingStart(false);
    setIsDraggingEnd(false);
  };

  const toggleWall = (currentGrid: Cell[][], row: number, col: number): Cell[][] => {
    const newGrid = currentGrid.map((r) => [...r]);
    const cell = newGrid[row][col];
    
    if (cell.type === "start" || cell.type === "end") return newGrid;
    
    cell.type = cell.type === "wall" ? "unvisited" : "wall";
    return newGrid;
  };

  const moveStartNode = (currentGrid: Cell[][], row: number, col: number): Cell[][] => {
    const newGrid = currentGrid.map((r) => r.map((c) => ({ ...c })));
    
    for (let r = 0; r < newGrid.length; r++) {
      for (let c = 0; c < newGrid[r].length; c++) {
        if (newGrid[r][c].type === "start") {
          newGrid[r][c].type = "unvisited";
        }
      }
    }
    
    if (newGrid[row][col].type !== "end" && newGrid[row][col].type !== "wall") {
      newGrid[row][col].type = "start";
    }
    
    return newGrid;
  };

  const moveEndNode = (currentGrid: Cell[][], row: number, col: number): Cell[][] => {
    const newGrid = currentGrid.map((r) => r.map((c) => ({ ...c })));
    
    for (let r = 0; r < newGrid.length; r++) {
      for (let c = 0; c < newGrid[r].length; c++) {
        if (newGrid[r][c].type === "end") {
          newGrid[r][c].type = "unvisited";
        }
      }
    }
    
    if (newGrid[row][col].type !== "start" && newGrid[row][col].type !== "wall") {
      newGrid[row][col].type = "end";
    }
    
    return newGrid;
  };

  const visualize = async () => {
    if (isVisualizing) return;

    setIsVisualizing(true);
    const clearedGrid = resetGrid(grid);
    setGrid(clearedGrid);

    const startCell = findCell(clearedGrid, "start");
    const endCell = findCell(clearedGrid, "end");

    if (!startCell || !endCell) {
      toast.error("Please set start and end nodes!");
      setIsVisualizing(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    let result;
    switch (algorithm) {
      case "bfs":
        result = bfs(clearedGrid, startCell, endCell);
        break;
      case "dijkstra":
        result = dijkstra(clearedGrid, startCell, endCell);
        break;
      case "astar":
        result = astar(clearedGrid, startCell, endCell);
        break;
      case "greedy":
        result = greedy(clearedGrid, startCell, endCell);
        break;
    }

    await animateAlgorithm(result.visitedNodesInOrder, result.shortestPath);
    
    if (result.shortestPath.length === 0) {
      toast.error("No path found due to obstacles!");
    } else {
      toast.success(`Path found! Length: ${result.shortestPath.length - 1} steps`);
    }

    setIsVisualizing(false);
  };

  const animateAlgorithm = async (visitedNodes: Cell[], shortestPath: Cell[]) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, speedDelays[speed]));
      
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]);
        const node = visitedNodes[i];
        if (newGrid[node.row][node.col].type !== "start" && 
            newGrid[node.row][node.col].type !== "end") {
          newGrid[node.row][node.col].type = "visited";
          newGrid[node.row][node.col].visitOrder = i + 1;
        }
        return newGrid;
      });
    }

    for (let i = 0; i < shortestPath.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]);
        const node = shortestPath[i];
        if (newGrid[node.row][node.col].type !== "start" && 
            newGrid[node.row][node.col].type !== "end") {
          newGrid[node.row][node.col].type = "path";
          newGrid[node.row][node.col].pathOrder = i + 1;
        }
        return newGrid;
      });
    }
  };

  const findCell = (grid: Cell[][], type: "start" | "end"): Cell | null => {
    for (const row of grid) {
      for (const cell of row) {
        if (cell.type === type) return cell;
      }
    }
    return null;
  };

  const handleClearBoard = () => {
    setGrid(createInitialGrid());
    toast.success("Board cleared!");
  };

  const handleClearPath = () => {
    setGrid(resetGrid(grid));
    toast.success("Path cleared!");
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <Controls
          algorithm={algorithm}
          speed={speed}
          isVisualizing={isVisualizing}
          showNodeDistance={showNodeDistance}
          onAlgorithmChange={setAlgorithm}
          onSpeedChange={setSpeed}
          onVisualize={visualize}
          onClearBoard={handleClearBoard}
          onClearPath={handleClearPath}
          onToggleNodeDistance={setShowNodeDistance}
        />

        <Legend />

        <div className="flex justify-center">
          <Grid
            grid={grid}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            showNodeDistance={showNodeDistance}
          />
        </div>

        <div className="bg-card p-6 rounded-lg border border-border space-y-2">
          <h3 className="font-semibold text-lg text-foreground">How to use:</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Drag the start (green) and end (red) nodes to reposition them</li>
            <li>Click and drag on empty cells to draw walls</li>
            <li>Select an algorithm and adjust the visualization speed</li>
            <li>Click "Visualize" to watch the algorithm find the shortest path</li>
            <li>Use "Clear Path" to reset the visualization while keeping your walls</li>
            <li>Use "Clear Board" to reset everything including walls</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
