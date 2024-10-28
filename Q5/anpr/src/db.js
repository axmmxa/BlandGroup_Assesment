const mysql = require('mysql2/promise'); // Import mysql2 with promise support

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',             // Database host, usually 'localhost'
  user: 'root',                  // Replace with your MySQL username
  password: '',                  // Replace with your MySQL password
  database: 'anpr_db',           // Replace with your database name 
  charset: 'utf8mb4',            // Setting character set explicitly
});

// Function to connect to the database and log the connection status
const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    console.log('Successfully connected to the database');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Error connecting to the database:', error); // Log any connection errors
    throw error; // Propagate the error to the caller
  }
};

// Function to insert plate read data into the database
const insertPlateRead = async (data) => {
  const { country, regNumber, confidenceLevel, cameraName, date, time, imageFilename } = data;

  // SQL query to insert a new record into the plate_reads table
  const query = `
    INSERT INTO plate_reads (country, reg_number, confidence_level, camera_name, date, time, image_filename)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  // Values to be inserted into the query
  const values = [country, regNumber, confidenceLevel, cameraName, date, time, imageFilename];

  const connection = await pool.getConnection(); // Get a connection from the pool
  try {
    const [results] = await connection.execute(query, values); // Execute the query with the provided values
    return results; // Return the results of the query
  } catch (error) {
    throw error; // Propagate the error to the caller
  } finally {
    connection.release(); // Release the connection back to the pool
  }
};

// Connect to the database when the module is loaded
connectToDatabase();

// Export the insertPlateRead function for use in other modules
module.exports = {
  insertPlateRead,
  connectToDatabase,
};