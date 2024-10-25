# Palindrome Checker

A simple Node.js application that checks if a given word or number is a palindrome. The application ignores case and non-alphanumeric characters, making it versatile for various inputs.

## Features

- Checks for palindromes in strings and numbers.
- Ignores case sensitivity and non-alphanumeric characters.
- Comprehensive unit tests to ensure functionality.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

To check if a word or number is a palindrome, modify the `data` variable in `index.js` and run the application:

```bash
npm start
```

### Example
```javascript
let data = "A man, a plan, a canal: Panama"; // This will output that it is a palindrome.
```

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

### Test Cases
The following test cases are included:
- Simple palindromes (e.g., "radar")
- Case insensitive checks (e.g., "Deleveled")
- Palindromes with special characters (e.g., "A man, a plan, a canal: Panama")
- Non-palindromes (e.g., "hello")
- Numeric palindromes (e.g., 12321)
- Empty strings and single character strings

## License

This project is licensed under the MIT License.
