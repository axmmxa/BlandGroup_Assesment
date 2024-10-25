// Import the 'readline' module to enable interaction with the console
const readline = require('readline');

// Import the quicksort function from the 'quicksort' module
const { quicksort } = require('./quicksort');

// Create an interface for reading input and output via the console
const rl = readline.createInterface({
    input: process.stdin,   // Standard input stream (console input)
    output: process.stdout  // Standard output stream (console output)
});

let elements = [];  // Array to hold elements that will be input by the user

/**
 * Ask the user for the number of elements to sort.
 * If the input is a valid number between 1 and 10, it proceeds to ask for the elements.
 */
rl.question('Enter the number of elements to sort (max 10): ', (numElements) => {
    // Convert the user's input (string) to an integer
    numElements = parseInt(numElements);

    // Check if the number of elements is within the valid range (1 to 10)
    if (numElements > 10 || numElements <= 0) {
        // Display an error message if the input is invalid
        console.log('Please enter a valid number between 1 and 10.');
        rl.close();  // Close the readline interface to stop the program
        return;      // Exit early to prevent further execution
    }

    let count = 0;  // Counter to track the number of elements input by the user

    /**
     * Function to prompt the user to enter an individual element.
     * Once the required number of elements is input, it proceeds to sort and display them.
     */
    const askForElement = () => {
        // Prompt the user for a single element (e.g., element 1, element 2, etc.)
        rl.question(`Enter element ${count + 1}: `, (element) => {
            // Parse the user's input as a float to handle both integers and floats
            const parsedElement = parseFloat(element);
            
            // Add the parsed element to the 'elements' array
            elements.push(parsedElement);
            count++;  // Increment the count to track the number of inputs

            // If we haven't reached the required number of elements, ask for the next one
            if (count < numElements) {
                askForElement();  // Recursively call to prompt for the next element
            } else {
                // Once all elements are input, display them in their original order
                console.log('Original Elements:', elements);
                
                // Sort the elements using the quicksort algorithm
                const sortedElements = quicksort(elements);
                
                // Display the sorted elements
                console.log('Sorted Elements:', sortedElements);
                
                // Close the readline interface to end the program
                rl.close();
            }
        });
    };

    // Begin asking the user to input elements
    askForElement();
});



