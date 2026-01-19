import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Play, Pause, Square, Shuffle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export type SortingAlgorithmType = "bubble" | "selection" | "insertion" | "merge" | "quick" | "heap";

export interface SortingControlsProps {
    algorithm: SortingAlgorithmType;
    arraySize: number;
    speed: number;
    isSorting: boolean;
    showNumbers: boolean;
    showComparisons: boolean;
    playSound: boolean;
    onAlgorithmChange: (algo: SortingAlgorithmType) => void;
    onArraySizeChange: (size: number) => void;
    onSpeedChange: (speed: number) => void;
    onGenerateNewArray: () => void;
    onSort: () => void;
    onStop: () => void;
    onToggleShowNumbers: (show: boolean) => void;
    onToggleShowComparisons: (show: boolean) => void;
    onTogglePlaySound: (play: boolean) => void;
}

const algorithms = [
    { value: 'bubble', label: 'Bubble Sort', complexity: 'O(n²)', type: 'Comparison' },
    { value: 'selection', label: 'Selection Sort', complexity: 'O(n²)', type: 'Comparison' },
    { value: 'insertion', label: 'Insertion Sort', complexity: 'O(n²)', type: 'Comparison' },
    { value: 'merge', label: 'Merge Sort', complexity: 'O(n log n)', type: 'Divide & Conquer' },
    { value: 'quick', label: 'Quick Sort', complexity: 'O(n log n)', type: 'Divide & Conquer' },
    { value: 'heap', label: 'Heap Sort', complexity: 'O(n log n)', type: 'Comparison' }
];

export const SortingControls = ({
    algorithm,
    arraySize,
    speed,
    isSorting,
    showNumbers,
    showComparisons,
    playSound,
    onAlgorithmChange,
    onArraySizeChange,
    onSpeedChange,
    onGenerateNewArray,
    onSort,
    onStop,
    onToggleShowNumbers,
    onToggleShowComparisons,
    onTogglePlaySound
}: SortingControlsProps) => {

    return (
        <div className="flex flex-col gap-6 p-6 bg-card rounded-lg border border-border shadow-sm w-full transition-all duration-300">
            {/* Top Row: Algorithm, Size, Speed */}
            <div className="flex flex-wrap items-center gap-6 justify-between">

                {/* Algorithm Selection */}
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <Label className="text-sm font-semibold text-muted-foreground">Algorithm</Label>
                    <Select value={algorithm} onValueChange={(v) => onAlgorithmChange(v as SortingAlgorithmType)} disabled={isSorting}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            {algorithms.map((algo) => (
                                <SelectItem key={algo.value} value={algo.value}>
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium">{algo.label}</span>
                                        <span className="text-xs text-muted-foreground">{algo.complexity} • {algo.type}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Array Size */}
                <div className="flex flex-col gap-2 min-w-[150px] flex-1">
                    <div className="flex justify-between items-center">
                        <Label className="text-sm font-semibold text-muted-foreground">Array Size: {arraySize}</Label>
                    </div>
                    <Slider
                        value={[arraySize]}
                        onValueChange={(val) => onArraySizeChange(val[0])}
                        min={10}
                        max={50}
                        step={1}
                        disabled={isSorting}
                        className="cursor-pointer"
                    />
                </div>

                {/* Speed */}
                <div className="flex flex-col gap-2 min-w-[150px] flex-1">
                    <div className="flex justify-between items-center">
                        <Label className="text-sm font-semibold text-muted-foreground">Speed: {speed}ms</Label>
                    </div>
                    <Slider
                        value={[1010 - speed]} // Invert so right is faster (or left is faster? Requirement: 10ms - 1000ms. Usually right is "more", so "more speed" = lower delay)
                        // Wait, requirement: Range 10ms - 1000ms. 
                        // Let's make Right = Fast (10ms), Left = Slow (1000ms)
                        // Slider value: 0 to 990
                        // Calculated delay: 1000 - sliderValue + 10 ?
                        // let's just stick to displaying delay for now, but UI usually means "Higher value = Faster".
                        // Logic will be handled by parent, here we just pass a number.
                        // Let's presume the parent passes 'delay' as 'speed'.
                        // If I want the slider to visually show "Speed", then Right should be Fast (low delay)

                        onValueChange={(val) => {
                            // val is 0 (slowest) to 100 (fastest)?
                            // Let's implement Mapping: 
                            // Input val: 10 to 1000
                            // We want: Left=1000ms (Slow), Right=10ms (Fast)
                            // Slider Value: 1000 - speed + 10
                            onSpeedChange(1010 - val[0]);
                        }}
                        min={10}
                        max={1000}
                        step={10}
                        className="cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground px-1 uppercase tracking-wider">
                        <span>Slow</span>
                        <span>Fast</span>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Controls & Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">

                {/* Toggles */}
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <Switch id="show-numbers" checked={showNumbers} onCheckedChange={onToggleShowNumbers} />
                        <Label htmlFor="show-numbers" className="text-sm font-medium cursor-pointer">Numbers</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch id="show-comparisons" checked={showComparisons} onCheckedChange={onToggleShowComparisons} />
                        <Label htmlFor="show-comparisons" className="text-sm font-medium cursor-pointer">Comparisons</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch id="play-sound" checked={playSound} onCheckedChange={onTogglePlaySound} />
                        <Label htmlFor="play-sound" className="text-sm font-medium cursor-pointer">Sound</Label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="secondary"
                                onClick={onGenerateNewArray}
                                disabled={isSorting}
                                className="gap-2"
                            >
                                <Shuffle className="w-4 h-4" />
                                Generate
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Generate new random array</TooltipContent>
                    </Tooltip>

                    {isSorting ? (
                        <Button
                            variant="outline"
                            onClick={onStop}
                            className="gap-2 animate-in fade-in border-black hover:bg-gray-100 text-black"
                        >
                            <Square className="w-4 h-4 fill-current" />
                            Stop
                        </Button>
                    ) : (
                        <Button
                            onClick={onSort}
                            className="gap-2 min-w-[100px]"
                        >
                            <Play className="w-4 h-4" />
                            Sort
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
