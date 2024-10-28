const fs = require('fs'); // Import the file system module
const FileWatcher = require('./fileWatcher'); // Import the FileWatcher class
const db = require('./db'); // Import the database module for database operations
const path = require('path'); // Import the path module for handling file paths

// Define the folder path to watch for new .lpr files
const folderPath = path.join(__dirname, '../ACS Output Test'); // Path to the directory containing .lpr files

// Create an instance of the FileWatcher class to monitor the specified folder
const fileWatcher = new FileWatcher(folderPath);

// Function to process .lpr files and insert their data into the database
const processLprFile = async (filePath) => {
  try {
    // Read the contents of the .lpr file synchronously
    const data = fs.readFileSync(filePath, 'utf-8');
    console.log(`Processing file: ${filePath}`);
    
    // Log the raw file content, showing escape characters
    console.log(`Raw file content (with escape characters):`);
    console.log(JSON.stringify(data)); // Display exact content including escape sequences

    // Normalize escape sequences for proper processing
    const normalizedData = data.replace(/\\r/g, '\r').replace(/\\n/g, '\n');
    
    // Split the content by all possible newline combinations: \r\n, \n, or \r
    const rawValues = normalizedData.split(/\r\n|\n|\r/).filter(Boolean); // Filter out empty lines

    // Log the number of parts obtained after splitting
    console.log(`Number of parts after splitting: ${rawValues.length}`);
    console.log(`Parts:`, rawValues); // Display the split parts for debugging

    // Ensure there are enough parts for processing
    if (rawValues.length < 4) {
      console.error(`Insufficient data in file: ${filePath}`);
      console.error(`Expected at least 4 parts, but got ${rawValues.length}:`, rawValues);
      return; // Exit if there is insufficient data
    }

    // Extract the necessary values from the split data
    const countryOfVehicle = rawValues[0]; // Country of origin (e.g., 'GBZ')
    const regNumber = rawValues[1]; // Vehicle registration number
    const confidenceLevel = rawValues[2]; // Camera confidence level

    // The fourth part contains camera name and image path combined
    const combinedCameraAndImagePath = rawValues[3].trim();
    
    // Split the combined data to get camera name and image path
    const parts = combinedCameraAndImagePath.split(/[/\\]/); // Split by forward and backward slashes
    const cameraName = parts[0]; // First part is the camera name
    const imageFilePath = combinedCameraAndImagePath; // Full combined path for reference

    // Extract date and time from the image path
    const date = parts[1]; // Assuming the second part is the date
    // Extract the time from the folder structure instead of the filename
    const time = filePath.split('/').slice(-2, -1)[0]; // This gets '1210'

    // Get the image filename from the path
    const imageFilename = parts.pop(); // Get the last part as the image filename

    // Prepare data for database insertion
    const plateReadData = {
      country: countryOfVehicle,
      regNumber,
      confidenceLevel,
      cameraName,
      date,
      time,
      imageFilename,
    };

    // Insert the extracted data into the database
    await db.insertPlateRead(plateReadData);
    console.log(`Inserted data for: ${regNumber} from camera: ${cameraName}`);
  } catch (error) {
    // Log any errors that occur during processing
    console.error(`Error processing .lpr file (${filePath}):`, error.message);
  }
};

// Override the logLprFileContents method to process and insert data into the database
fileWatcher.logLprFileContents = async (filePath) => {
  await processLprFile(filePath); // Call the processLprFile function to handle the file
};

// Start watching the folder for new .lpr files
fileWatcher.startWatching(); // Initiate the file watcher

console.log('File watcher started. Monitoring for new .lpr files...'); // Log the start of the file watcher

module.exports = {
  processLprFile,
  // other exports...
};