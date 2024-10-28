"use strict";

/**
 * Checks if a given input (word or number) is a palindrome, ignoring case
 * and non-alphanumeric characters.
 * 
 * @param {string|number} input - The word or number to check.
 * @returns {boolean} True if the input is a palindrome, false otherwise.
 */
function isPalindrome(input) {
    // Convert input to string to handle numbers and make it lowercase for case insensitivity
    const str = input.toString().toLowerCase();

    // Remove non-alphanumeric characters (e.g., spaces, punctuation)
    const cleanedStr = str.replace(/[^a-z0-9]/g, '');

    // Check if the cleaned string reads the same forward and backward
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

module.exports = { isPalindrome };


