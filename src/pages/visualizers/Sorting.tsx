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

// Sound helper
const playNote = (freq: number) => {
    try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = freq;

        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
        console.error("Audio play failed", e);
    }
};

const Sorting = () => {
    // State
    const [array, setArray] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<SortingAlgorithmType>("bubble");
    const [arraySize, setArraySize] = useState(50);
    const [speed, setSpeed] = useState(100); // ms delay
    const [isSorting, setIsSorting] = useState(false);

    // Visualization State
    const [comparingIndices, setComparingIndices] = useState<number[]>([]);
    const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    const [overwriteIndex, setOverwriteIndex] = useState<number | null>(null);

    // Toggles
    const [showNumbers, setShowNumbers] = useState(false);
    const [showComparisons, setShowComparisons] = useState(true); // Default true
    const [playSound, setPlaySound] = useState(false);

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
                    if (playSound) {
                        // Play sound based on value? Or just a blip?
                        // A nice touch is mapping value to frequency.
                        // We need the values. We can look them up in current 'array' state?
                        // BUT 'array' state might lag if we update it too frequently? 
                        // Actually 'array' is in state.
                        // Optimization: We are updating array state for swaps/overwrites.
                        // So array[step.indices[0]] should be correct.
                        const val = array[step.indices[0]];
                        // Map 5-500 to 200Hz-800Hz
                        const freq = 200 + (val || 0);
                        playNote(freq);
                    }
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
                    playSound={playSound}
                    onAlgorithmChange={setAlgorithm}
                    onArraySizeChange={handleArraySizeChange}
                    onSpeedChange={setSpeed}
                    onGenerateNewArray={generateArray}
                    onSort={handleSort}
                    onStop={stopSorting}
                    onToggleShowNumbers={setShowNumbers}
                    onToggleShowComparisons={setShowComparisons}
                    onTogglePlaySound={setPlaySound}
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
