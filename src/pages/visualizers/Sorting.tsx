import { useState, useEffect, useRef, useCallback } from "react";
import { SortingControls, SortingAlgorithmType } from "@/components/sorting/SortingControls";
import { SortingBoard } from "@/components/sorting/SortingBoard";
import {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    heapSort
} from "@/algorithms/sorting/sortingAlgorithms";
import { AnimationStep } from "@/algorithms/sorting/types";
import { toast } from "sonner";

const Sorting = () => {
    const getDeviceLimits = () => {
        if (typeof window === "undefined") return { max: 50, isMobile: false };
        if (window.innerWidth < 640) return { max: 10, isMobile: true };
        if (window.innerWidth < 1024) return { max: 30, isMobile: false };
        return { max: 50, isMobile: false };
    };

    // State
    const [array, setArray] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<SortingAlgorithmType>("bubble");
    const [arraySize, setArraySize] = useState(() => {
        const limits = getDeviceLimits();
        if (limits.isMobile) return 10;
        if (limits.max < 50) return limits.max; // e.g., default tablet max to 30
        return 50;
    });
    const [speed, setSpeed] = useState(100); // ms delay
    const [isSorting, setIsSorting] = useState(false);

    // Visualization State
    const [comparingIndices, setComparingIndices] = useState<number[]>([]);
    const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    const [overwriteIndex, setOverwriteIndex] = useState<number | null>(null);

    // Toggles
    const [showNumbers, setShowNumbers] = useState(false);
    const [showComparisons, setShowComparisons] = useState(true);

    const [deviceLimits, setDeviceLimits] = useState(getDeviceLimits());

    useEffect(() => {
        const handleResize = () => {
            const limits = getDeviceLimits();
            setDeviceLimits(limits);
            setArraySize(prev => {
                let newSize = prev;
                if (limits.isMobile) newSize = 10;
                else if (prev > limits.max) newSize = limits.max;

                if (newSize !== prev) {
                    // Update visual array elements directly to match the forced change
                    const newArray = [];
                    for (let i = 0; i < newSize; i++) {
                        newArray.push(Math.floor(Math.random() * 496) + 5);
                    }
                    setArray(newArray);
                    setSortedIndices([]);
                    setComparingIndices([]);
                    setSwappingIndices([]);
                    setOverwriteIndex(null);
                }
                return newSize;
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Refs for control during async loop
    const sortingRef = useRef(false);
    const speedRef = useRef(speed);

    // Update speed ref when state changes
    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    // Initial load
    useEffect(() => {
        generateArray();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Generate Array
    const generateArray = useCallback(() => {
        if (isSorting) return;
        const newArray = [];
        // Requirements: Value range 5 to 500
        for (let i = 0; i < arraySize; i++) {
            newArray.push(Math.floor(Math.random() * 496) + 5);
        }
        setArray(newArray);

        // Reset Visuals
        setSortedIndices([]);
        setComparingIndices([]);
        setSwappingIndices([]);
        setOverwriteIndex(null);
    }, [arraySize, isSorting]);

    // Handle Size Change (Regenerate on change)
    const handleArraySizeChange = (size: number) => {
        setArraySize(size);
        // We can't immediately use the new size in generateArray because state update is async,
        // but since generateArray depends on arraySize, adding it to dependency and calling it in useEffect would trigger it.
        // Or we can just do it manually here with the new size.
        // However, standard React way: update state, let effect handle it? 
        // Or explicitly:
        const newArray = [];
        for (let i = 0; i < size; i++) {
            newArray.push(Math.floor(Math.random() * 496) + 5);
        }
        setArray(newArray);
        setSortedIndices([]);
        setComparingIndices([]);
        setSwappingIndices([]);
        setOverwriteIndex(null);
    };

    const stopSorting = () => {
        sortingRef.current = false;
        setIsSorting(false);
        setComparingIndices([]);
        setSwappingIndices([]);
        setOverwriteIndex(null);
        toast.info("Sorting stopped.");
    };

    const handleSort = async () => {
        if (isSorting) return;

        setIsSorting(true);
        sortingRef.current = true;

        // Reset indices before starting (keep array)
        setSortedIndices([]);

        // 1. Get Animations
        let animations: AnimationStep[] = [];
        const auxArray = [...array];

        switch (algorithm) {
            case "bubble": animations = bubbleSort(auxArray); break;
            case "selection": animations = selectionSort(auxArray); break;
            case "insertion": animations = insertionSort(auxArray); break;
            case "merge": animations = mergeSort(auxArray); break;
            case "quick": animations = quickSort(auxArray); break;
            case "heap": animations = heapSort(auxArray); break;
            default: break;
        }

        // 2. Play Animations
        for (let i = 0; i < animations.length; i++) {
            if (!sortingRef.current) break; // Check for stop

            const step = animations[i];

            // Handle Step
            if (step.type === "compare") {
                if (showComparisons) {
                    setComparingIndices(step.indices);
                }
            } else if (step.type === "swap") {
                setSwappingIndices(step.indices);
                setArray((prev) => {
                    const newArr = [...prev];
                    const [i, j] = step.indices;
                    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                    return newArr;
                });
            } else if (step.type === "overwrite") {
                setComparingIndices([]); // Clear compare usually
                setOverwriteIndex(step.indices[0]); // Index being overwritten
                setArray((prev) => {
                    const newArr = [...prev];
                    if (step.overwriteValue !== undefined) {
                        newArr[step.indices[0]] = step.overwriteValue;
                    }
                    return newArr;
                });
            }

            // Wait
            await new Promise(r => setTimeout(r, speedRef.current));

            // Cleanup step visuals
            if (step.type === "compare") {
                // Don't clear immediately if we want to see it? 
                // Actually usually better to clear or let next step overwrite.
            } else {
                setSwappingIndices([]);
                setOverwriteIndex(null);
            }
        }

        // Finish
        setComparingIndices([]);
        setSwappingIndices([]);
        setOverwriteIndex(null);

        if (sortingRef.current) {
            // Mark all as sorted
            const indices = Array.from({ length: array.length }, (_, i) => i);
            setSortedIndices(indices);
            toast.success("Sorting Complete!");
        }

        setIsSorting(false);
        sortingRef.current = false;
    };

    return (
        <div className="min-h-screen bg-background p-4 sm:p-8 animate-fade-in">
            <div className="max-w-[1200px] mx-auto space-y-8">
                {/* Header / Micro-intro */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Sorting Visualizer</h1>
                    <p className="text-muted-foreground text-lg">
                        Watch how algorithms think.
                    </p>
                </div>

                {/* Controls */}
                <SortingControls
                    algorithm={algorithm}
                    arraySize={arraySize}
                    speed={speed}
                    isSorting={isSorting}
                    showNumbers={showNumbers}
                    showComparisons={showComparisons}
                    isMobile={deviceLimits.isMobile}
                    maxArraySize={deviceLimits.max}
                    onAlgorithmChange={setAlgorithm}
                    onArraySizeChange={handleArraySizeChange}
                    onSpeedChange={setSpeed}
                    onGenerateNewArray={generateArray}
                    onSort={handleSort}
                    onStop={stopSorting}
                    onToggleShowNumbers={setShowNumbers}
                    onToggleShowComparisons={setShowComparisons}
                />

                {/* VISUALIZATION AREA */}
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden p-6 min-h-[500px] flex items-center justify-center relative">
                    {/* Optional: Add "Thinking" text or overlays here */}
                    <SortingBoard
                        array={array}
                        maxVal={500}
                        comparingIndices={comparingIndices}
                        swappingIndices={swappingIndices}
                        sortedIndices={sortedIndices}
                        overwriteIndex={overwriteIndex}
                        showNumbers={showNumbers}
                    />
                </div>

                {/* Algorithm Info Footer (Optional, from requirements: "Micro-introduction") 
                     Actually the requirements said "Intent line" appears when selecting algorithm.
                     Let's add a small info box below or above.
                 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
                    <div className="p-4 rounded-lg bg-muted/30">
                        <span className="font-semibold block mb-1">Time Complexity</span>
                        {algorithm === 'bubble' || algorithm === 'insertion' || algorithm === 'selection' ? 'O(n²)' : 'O(n log n)'}
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                        <span className="font-semibold block mb-1">Algorithm Type</span>
                        {algorithm === 'merge' || algorithm === 'quick' ? 'Divide & Conquer' : 'Comparison-based'}
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                        <span className="font-semibold block mb-1">Description</span>
                        {algorithm === 'bubble' && "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."}
                        {algorithm === 'selection' && "Divides the input list into two parts: a sorted sublist of items which is built up from left to right."}
                        {algorithm === 'insertion' && "Builds the final sorted array (or list) one item at a time."}
                        {algorithm === 'merge' && "Divides the unsorted list into n sublists, then repeatedly merges sublists to produce new sorted sublists."}
                        {algorithm === 'quick' && "Picks an element as pivot and partitions the given array around the picked pivot."}
                        {algorithm === 'heap' && "Converts the array into a heap data structure, then repeatedly extracts the max element."}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sorting;
