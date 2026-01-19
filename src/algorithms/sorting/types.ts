export type AnimationType = "compare" | "swap" | "overwrite";

export interface AnimationStep {
    type: AnimationType;
    indices: [number, number]; // Indices involved
    // For 'compare': just highlights them
    // For 'swap': swaps values at these indices
    // For 'overwrite': overwrites index[0] with overwriteValue (index[1] might be ignored or used for source reference)
    overwriteValue?: number;
}

export type SortingAlgorithm = (array: number[]) => AnimationStep[];
