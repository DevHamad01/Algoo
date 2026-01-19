import { AnimationStep, SortingAlgorithm } from "./types";

// Bubble Sort
export const bubbleSort: SortingAlgorithm = (array) => {
    const animations: AnimationStep[] = [];
    const auxArray = [...array];
    const n = auxArray.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Compare j and j + 1
            animations.push({ type: "compare", indices: [j, j + 1] });
            if (auxArray[j] > auxArray[j + 1]) {
                // Swap
                animations.push({ type: "swap", indices: [j, j + 1] });
                [auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];
            }
        }
    }
    return animations;
};

// Selection Sort
export const selectionSort: SortingAlgorithm = (array) => {
    const animations: AnimationStep[] = [];
    const auxArray = [...array];
    const n = auxArray.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            animations.push({ type: "compare", indices: [minIdx, j] });
            if (auxArray[j] < auxArray[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            animations.push({ type: "swap", indices: [i, minIdx] });
            [auxArray[i], auxArray[minIdx]] = [auxArray[minIdx], auxArray[i]];
        }
    }
    return animations;
};

// Insertion Sort
export const insertionSort: SortingAlgorithm = (array) => {
    const animations: AnimationStep[] = [];
    const auxArray = [...array];
    const n = auxArray.length;

    for (let i = 1; i < n; i++) {
        let key = auxArray[i];
        let j = i - 1;

        animations.push({ type: "compare", indices: [i, j] }); // Initial compare
        while (j >= 0 && auxArray[j] > key) {
            animations.push({ type: "compare", indices: [j + 1, j] }); // Compare while moving
            // Overwrite j + 1 with auxArray[j]
            animations.push({ type: "overwrite", indices: [j + 1, j], overwriteValue: auxArray[j] });
            auxArray[j + 1] = auxArray[j];
            j = j - 1;
        }
        // Place key
        animations.push({ type: "overwrite", indices: [j + 1, i], overwriteValue: key });
        auxArray[j + 1] = key;
    }
    return animations;
};

// Merge Sort
export const mergeSort: SortingAlgorithm = (array) => {
    const animations: AnimationStep[] = [];
    if (array.length <= 1) return animations;
    const auxArray = [...array];
    mergeSortHelper(auxArray, 0, array.length - 1, [...array], animations);
    return animations;
};

function mergeSortHelper(
    mainArray: number[],
    startIdx: number,
    endIdx: number,
    auxArray: number[],
    animations: AnimationStep[]
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations);
}

function doMerge(
    mainArray: number[],
    startIdx: number,
    middleIdx: number,
    endIdx: number,
    auxArray: number[],
    animations: AnimationStep[]
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        animations.push({ type: "compare", indices: [i, j] });
        if (auxArray[i] <= auxArray[j]) {
            animations.push({ type: "overwrite", indices: [k, i], overwriteValue: auxArray[i] });
            mainArray[k++] = auxArray[i++];
        } else {
            animations.push({ type: "overwrite", indices: [k, j], overwriteValue: auxArray[j] });
            mainArray[k++] = auxArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push({ type: "compare", indices: [i, i] }); // Dummy compare for visualization consistency
        animations.push({ type: "overwrite", indices: [k, i], overwriteValue: auxArray[i] });
        mainArray[k++] = auxArray[i++];
    }
    while (j <= endIdx) {
        animations.push({ type: "compare", indices: [j, j] });
        animations.push({ type: "overwrite", indices: [k, j], overwriteValue: auxArray[j] });
        mainArray[k++] = auxArray[j++];
    }
}

// Quick Sort
export const quickSort: SortingAlgorithm = (array) => {
    const animations: AnimationStep[] = [];
    const auxArray = [...array];
    quickSortHelper(auxArray, 0, auxArray.length - 1, animations);
    return animations;
};

function quickSortHelper(array: number[], startIdx: number, endIdx: number, animations: AnimationStep[]) {
    if (startIdx >= endIdx) return;
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
}

function partition(array: number[], startIdx: number, endIdx: number, animations: AnimationStep[]) {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;
    for (let i = startIdx; i < endIdx; i++) {
        animations.push({ type: "compare", indices: [i, endIdx] });
        if (array[i] < pivotValue) {
            animations.push({ type: "swap", indices: [i, pivotIdx] });
            [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            pivotIdx++;
        }
    }
    animations.push({ type: "swap", indices: [pivotIdx, endIdx] });
    [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
    return pivotIdx;
}

// Heap Sort
export const heapSort: SortingAlgorithm = (array) => {
    const animations: AnimationStep[] = [];
    const auxArray = [...array];
    const n = auxArray.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(auxArray, n, i, animations);
    }

    for (let i = n - 1; i > 0; i--) {
        animations.push({ type: "swap", indices: [0, i] });
        [auxArray[0], auxArray[i]] = [auxArray[i], auxArray[0]];
        heapify(auxArray, i, 0, animations);
    }

    return animations;
};

function heapify(array: number[], n: number, i: number, animations: AnimationStep[]) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
        animations.push({ type: "compare", indices: [left, largest] });
        if (array[left] > array[largest]) {
            largest = left;
        }
    }

    if (right < n) {
        animations.push({ type: "compare", indices: [right, largest] });
        if (array[right] > array[largest]) {
            largest = right;
        }
    }

    if (largest !== i) {
        animations.push({ type: "swap", indices: [i, largest] });
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest, animations);
    }
}
