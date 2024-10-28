const fs = require('fs'); // Import the file system module
const path = require('path'); // Import the path module

class FileWatcher {
    constructor(folderPath) {
        this.folderPath = folderPath; // Path of the folder to watch
        this.previousFiles = new Set(); // Set to track previously detected files
    }

    // Function to read all files in a directory recursively
    readFilesRecursively(dir) {
        const files = fs.readdirSync(dir); // Read the contents of the directory
        let allFiles = new Set(); // Set to store all file paths

        files.forEach(file => {
            const fullPath = path.join(dir, file); // Get full path of the file
            const isDirectory = fs.statSync(fullPath).isDirectory(); // Check if it's a directory

            if (isDirectory) {
                // If it's a directory, read its contents recursively
                const nestedFiles = this.readFilesRecursively(fullPath);
                nestedFiles.forEach(nestedFile => allFiles.add(nestedFile)); // Add nested files to the set
            } else {
                allFiles.add(fullPath); // Store the full path of the file
            }
        });

        return allFiles; // Return all found files
    }

    // Function to log contents of .lpr files
    logLprFileContents(filePath) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                // Handle file read errors
                console.error(`Error reading file ${filePath}: ${err}`);
                return; // Exit on error
            }
            console.log(`Contents of ${filePath}:\n${data}`); // Log the file contents
            // Here, you could call a function to insert data into the database if needed.
        });
    }

    // Function to check for changes in the directory
    checkForChanges() {
        const currentFiles = this.readFilesRecursively(this.folderPath); // Get current files in the directory

        // Check for added files
        currentFiles.forEach(file => {
            if (!this.previousFiles.has(file)) { // If the file is new
                console.log(`File added: ${file}`);
                // Check if the added file is an .lpr file
                if (file.endsWith('.lpr')) {
                    this.logLprFileContents(file); // Log its contents
                    // Here you could also call a function to process the file and insert into the database
                }
            }
        });

        // Check for removed files
        this.previousFiles.forEach(file => {
            if (!currentFiles.has(file)) { // If the file is no longer present
                console.log(`File removed: ${file}`);
            }
        });

        // Update previous files to the current state
        this.previousFiles = currentFiles;
    }

    // Start watching the folder for changes
    startWatching(interval = 1000) {
        console.log(`Watching for changes in ${this.folderPath}...`);
        setInterval(() => this.checkForChanges(), interval); // Check for changes at the specified interval
    }
}

// Export the FileWatcher class for use in other modules
module.exports = FileWatcher;