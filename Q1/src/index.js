"use strict";

// Import the isPalindrome function from the isPalindrome.js module
const { isPalindrome } = require("./isPalindrome");

// Input word or number to check if it is a palindrome
let data = "=a=";

// Call the isPalindrome function and store the result
const result = isPalindrome(data);

// Output the result to the console
if (result) {
    console.log(`${data} is a palindrome.`);
} else {
    console.log(`${data} is not a palindrome.`);
}