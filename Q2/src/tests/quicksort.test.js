const assert = require('assert');
const { quicksort } = require('../quicksort');  // Import the quicksort function

// Define the test suite for the quicksort function
describe('Quicksort Algorithm Tests', () => {
    
    // Test: Sorting an array of positive integers
    it('should sort an array of integers in ascending order', () => {
        const result = quicksort([5, 2, 9, 1, 5, 6]);
        assert.deepStrictEqual(result, [1, 2, 5, 5, 6, 9]);
    });

    // Test: Sorting an array of floating-point numbers
    it('should sort an array of floating-point numbers in ascending order', () => {
        const result = quicksort([3.1, 2.4, 0.5, 4.5, 1.9]);
        assert.deepStrictEqual(result, [0.5, 1.9, 2.4, 3.1, 4.5]);
    });

    // Test: Sorting an array with negative numbers
    it('should sort an array containing negative numbers', () => {
        const result = quicksort([-3, 5, 1, -10, 7, -1]);
        assert.deepStrictEqual(result, [-10, -3, -1, 1, 5, 7]);
    });

    // Test: Sorting an array with duplicate elements
    it('should handle and sort an array with duplicate values correctly', () => {
        const result = quicksort([4, 4, 3, 1, 4, 2, 2]);
        assert.deepStrictEqual(result, [1, 2, 2, 3, 4, 4, 4]);
    });

    // Test: Sorting an already sorted array
    it('should return the same array when the array is already sorted', () => {
        const result = quicksort([1, 2, 3, 4, 5]);
        assert.deepStrictEqual(result, [1, 2, 3, 4, 5]);
    });

    // Test: Sorting an array sorted in reverse order
    it('should sort an array sorted in descending order', () => {
        const result = quicksort([5, 4, 3, 2, 1]);
        assert.deepStrictEqual(result, [1, 2, 3, 4, 5]);
    });

    // Test: Sorting an empty array
    it('should return an empty array when the input is empty', () => {
        const result = quicksort([]);
        assert.deepStrictEqual(result, []);
    });

    // Test: Sorting an array with one element
    it('should return the same array when the array has only one element', () => {
        const result = quicksort([7]);
        assert.deepStrictEqual(result, [7]);
    });
});