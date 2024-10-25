"use strict";

const { isPalindrome } = require('../isPalindrome');

describe('isPalindrome function', () => {
    test('should return true for a simple palindrome', () => {
        expect(isPalindrome('radar')).toBe(true);
    });

    test('should return true for a palindrome ignoring case', () => {
        expect(isPalindrome('Deleveled')).toBe(true);
    });

    test('should return true for a palindrome with special characters and spaces', () => {
        expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    });

    test('should return false for a non-palindrome', () => {
        expect(isPalindrome('hello')).toBe(false);
    });

    test('should return true for a numeric palindrome', () => {
        expect(isPalindrome(12321)).toBe(true);
    });

    test('should return false for a non-palindrome number', () => {
        expect(isPalindrome(12345)).toBe(false);
    });

    test('should return true for a single character string', () => {
        expect(isPalindrome('a')).toBe(true);
    });

    test('should return true for an empty string', () => {
        expect(isPalindrome('')).toBe(true);
    });
});