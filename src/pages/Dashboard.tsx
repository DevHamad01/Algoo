import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
import { useAuth } from "@/contexts/AuthContext";
import {
    Play,
    RotateCcw,
    Trash2,
    Settings,
    BookOpen,
    BarChart3,
    User,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Dashboard Page - Professional Layout
 * Main algorithm visualizer with sidebar navigation
 */
const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const { user, signOut } = useAuth();
    const [grid, setGrid] = useState<Cell[][]>(() => createInitialGrid());
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>("astar");
    const [speed, setSpeed] = useState<Speed>("medium");
    const [isDraggingStart, setIsDraggingStart] = useState(false);
    const [isDraggingEnd, setIsDraggingEnd] = useState(false);
    const [showNodeDistance, setShowNodeDistance] = useState(false);

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

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("Signed out successfully");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black text-white flex flex-col border-r border-gray-800">
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-xl">A</span>
                        </div>
                        <span className="text-xl font-bold">Algoo</span>
                    </Link>
                </div>

                {/* User Info */}
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{user?.displayName || "User"}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <div className="space-y-1">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white"
                        >
                            <Play className="w-5 h-5" />
                            <span className="font-medium">Visualizer</span>
                        </Link>
                        <Link
                            to="/learn"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors"
                        >
                            <BookOpen className="w-5 h-5" />
                            <span className="font-medium">Learn</span>
                        </Link>
                        <Link
                            to="/tutorials"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors"
                        >
                            <BarChart3 className="w-5 h-5" />
                            <span className="font-medium">Tutorials</span>
                        </Link>
                    </div>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-black">Algorithm Visualizer</h1>
                            <p className="text-sm text-gray-600">Interactive pathfinding visualization</p>
                        </div>
                        <div className="flex items-center gap-4">
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
                        </div>
                    </div>
                </header>

                {/* Visualizer Area */}
                <div className="flex-1 p-8 overflow-auto">
                    <div className="max-w-[1600px] mx-auto space-y-6">
                        {/* Action Buttons */}
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={visualize}
                                disabled={isVisualizing}
                                className="bg-black hover:bg-gray-900 text-white"
                            >
                                <Play className="w-4 h-4 mr-2" />
                                {isVisualizing ? "Visualizing..." : "Visualize"}
                            </Button>
                            <Button
                                onClick={handleClearPath}
                                disabled={isVisualizing}
                                variant="outline"
                                className="border-gray-300"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Clear Path
                            </Button>
                            <Button
                                onClick={handleClearBoard}
                                disabled={isVisualizing}
                                variant="outline"
                                className="border-gray-300"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Clear Board
                            </Button>
                        </div>

                        <Legend />

                        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                            <div className="flex justify-center">
                                <Grid
                                    grid={grid}
                                    onMouseDown={handleMouseDown}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseUp={handleMouseUp}
                                    showNodeDistance={showNodeDistance}
                                />
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                            <h3 className="font-semibold text-lg text-black mb-4">How to use:</h3>
                            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
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
            </main>
        </div>
    );
};

export default Dashboard;
