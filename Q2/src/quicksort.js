/**
 * Quicksort algorithm implementation to sort an array of numbers.
 * This is a recursive sorting algorithm that selects a 'pivot' element
 * and partitions the array into left (less than pivot), right (greater than pivot),
 * and middle (equal to pivot) subarrays. It recursively sorts the left and right subarrays.
 *
 * @param {Array<number>} arr - The array of numbers (integers or floats) to be sorted.
 * @returns {Array<number>} - A new array with elements sorted in ascending order.
 */
function quicksort(arr) {
    // Base case: An array with 0 or 1 element is already sorted
    if (arr.length <= 1) {
        return arr;  // Return the array as is if it's empty or has one element
    }

    // Choose the pivot element as the middle element of the array
    const pivot = arr[Math.floor(arr.length / 2)];

    // Partition the array into three parts:
    // 'left' for elements less than the pivot
    const left = arr.filter(el => el < pivot);

    // 'right' for elements greater than the pivot
    const right = arr.filter(el => el > pivot);

    // 'middle' for elements equal to the pivot (handling duplicates)
    const middle = arr.filter(el => el === pivot);

    // Recursively sort the left and right arrays and concatenate the results with the middle array
    // The result will be a new sorted array
    return [...quicksort(left), ...middle, ...quicksort(right)];
}

// Export the quicksort function to be used in other files
module.exports = { quicksort };