
interface SortingBoardProps {
    array: number[];
    maxVal: number;
    comparingIndices: number[];
    swappingIndices: number[];
    sortedIndices: number[];
    overwriteIndex: number | null; // For merge sort visualization
    showNumbers: boolean;
}

export const SortingBoard = ({
    array,
    maxVal,
    comparingIndices,
    swappingIndices,
    sortedIndices,
    overwriteIndex,
    showNumbers
}: SortingBoardProps) => {

    return (
        <div className="w-full h-[500px] flex items-end justify-center gap-[2px] p-4 bg-muted/20 rounded-xl overflow-hidden">
            {array.map((value, idx) => {
                const isComparing = comparingIndices.includes(idx);
                const isSwapping = swappingIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                const isOverwriting = overwriteIndex === idx;

                let colorClass = "bg-primary/80"; // Default
                if (isSorted) colorClass = "bg-green-500";
                else if (isSwapping || isOverwriting) colorClass = "bg-red-500";
                else if (isComparing) colorClass = "bg-yellow-400";

                const heightPercentage = (value / maxVal) * 100;

                // Heuristic for dense arrays to rotate labels
                const shouldRotate = array.length > 25;

                return (
                    <div
                        key={idx}
                        className="flex flex-col items-center justify-end h-full group"
                        style={{
                            width: `${100 / array.length}%`,
                            maxWidth: '60px'
                        }}
                    >
                        {/* Bar */}
                        <div
                            className={`w-full rounded-t-md transition-all duration-100 ease-in-out ${colorClass} hover:opacity-100 opacity-90`}
                            style={{
                                height: `${heightPercentage}%`,
                            }}
                        />

                        {/* Number Label */}
                        {showNumbers && (
                            <div className="mt-1 flex justify-center items-start w-full h-[30px] overflow-hidden">
                                {shouldRotate ? (
                                    <span style={{ lineHeight: '0rem' }} className="text-[10px] sm:text-xs font-bold text-muted-foreground/90 transform rotate-90 origin-top-left translate-x-1.5 whitespace-nowrap leading-[0]">
                                        {value}
                                    </span>
                                ) : (
                                    <span className="text-[10px] sm:text-xs font-bold text-muted-foreground/90 text-center leading-4">
                                        {value}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
