// Import required modules
const fs = require('fs'); // File system module for file operations
const path = require('path'); // Path module for handling file paths
const FileWatcher = require('../src/fileWatcher'); // Import the FileWatcher class from the source code

// Mocking the fs and path modules to avoid actual file system access during testing
jest.mock('fs'); // Mock the fs module
jest.mock('path'); // Mock the path module

// Grouping tests for the FileWatcher class
describe('FileWatcher', () => {
    let fileWatcher; // Variable to hold the instance of FileWatcher
    const testFolderPath = 'testFolder'; // Define the test folder path for file watching

    // Setup before each test case
    beforeEach(() => {
        fileWatcher = new FileWatcher(testFolderPath); // Create a new instance of FileWatcher
        fs.readdirSync.mockClear(); // Clear any previous mock calls for readdirSync
        fs.statSync.mockClear(); // Clear any previous mock calls for statSync
    });

    // Test case for the readFilesRecursively method
    test('readFilesRecursively should return all file paths in nested directories', () => {
        // Mock the directory structure and files for testing
        fs.readdirSync.mockImplementation((dir) => {
            // Define the behavior of readdirSync based on the directory being read
            if (dir === 'testFolder') return ['subfolder1', 'file1.lpr']; // Root folder contents
            if (dir === path.join('testFolder', 'subfolder1')) return ['file2.lpr']; // Contents of subfolder1
            return []; // Return empty array for any other directory
        });

        // Mock the behavior of statSync to indicate whether a path is a directory
        fs.statSync.mockImplementation((filePath) => {
            return {
                isDirectory: () => filePath && filePath.endsWith('subfolder1') // Check if the path ends with 'subfolder1'
            };
        });

        // Call the method to be tested
        const files = fileWatcher.readFilesRecursively(testFolderPath);

        // Validate the expected outcome
        expect(files).toEqual(new Set([
            path.join('testFolder', 'file1.lpr'), // Expect the file1.lpr to be found
            path.join('testFolder', 'subfolder1', 'file2.lpr') // Expect the file2.lpr to be found
        ]));
    });

    // Test case for the logLprFileContents method
    test('logLprFileContents should log the contents of a .lpr file', (done) => {
        const filePath = 'testFolder/testFile.lpr'; // Define a sample file path
        const mockFileContents = "GBZ\r9112A\r77\rGIBEXIT2\\20140827\\1210/w27082014,12140198,9112A,77.jpg"; // Mock content for the .lpr file
    
        // Mock the fs.readFile function to simulate reading file contents
        fs.readFile.mockImplementation((path, encoding, callback) => {
            callback(null, mockFileContents); // Call the callback with mock contents simulating a successful file read
        });
    
        // Mock console.log to verify that it was called with the expected arguments
        console.log = jest.fn();
    
        // Call the method to log the file contents
        fileWatcher.logLprFileContents(filePath);
    
        // Use setImmediate to wait for any asynchronous logging to complete
        setImmediate(() => {
            // Validate that console.log was called with the correct message
            expect(console.log).toHaveBeenCalledWith(`Contents of ${filePath}:\n${mockFileContents}`);
            done(); // Indicate that the asynchronous test is complete
        });
    });
});