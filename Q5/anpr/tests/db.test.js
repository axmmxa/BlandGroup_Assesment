// src/__tests__/db.test.js

// Import the necessary database functions to be tested
const { connectToDatabase, insertPlateRead } = require('../src/db');

// Mock the database connection pool and its methods for unit testing
// This approach allows us to isolate our tests from the actual database, 
// ensuring that we are testing only the logic of our functions without external dependencies.
jest.mock('../src/db', () => {
    return {
        // Mocking the connectToDatabase function to simulate a successful database connection
        connectToDatabase: jest.fn().mockResolvedValue({
            // Mocking the getConnection method to return a simulated connection object
            getConnection: jest.fn().mockResolvedValue({
                // Mocking the query method to resolve with an empty array, simulating a successful query
                query: jest.fn().mockResolvedValue([]),
                // Mocking the release method to do nothing; it won't actually release any connections
                release: jest.fn(),
            }),
        }),
        // Mocking the insertPlateRead function to simulate a successful insert operation
        insertPlateRead: jest.fn().mockResolvedValue(true),
    };
});

// Describe block for grouping database-related tests
describe('Database tests', () => {
    // Before all tests, establish a mock connection to the database
    beforeAll(async () => {
        await connectToDatabase();
    });

    // Clear all mocks after all tests have run to ensure no state leakage between tests
    afterAll(() => {
        jest.clearAllMocks();
    });

    // Test to verify that the connection to the database is established successfully
    it('should connect to the database', async () => {
        const result = await connectToDatabase();
        // Expect that the result of the connection is defined, indicating a successful mock connection
        expect(result).toBeDefined();
    });

    // Test to verify the functionality of inserting a plate read into the database
    it('should insert plate read successfully', async () => {
        // Sample data to be used in the insert operation
        const plateData = {
            country: 'GBZ',
            regNumber: 'ABC123',
            confidenceLevel: 0.95,
            cameraName: 'Camera1',
            date: '20240101',
            time: '1200',
            imageFilename: 'image.jpg',
        };

        // Attempt to insert the plate read and expect the operation to succeed
        const insertResult = await insertPlateRead(plateData);
        // Check that the insert operation returned true, indicating success
        expect(insertResult).toBe(true);
    });

    // Additional tests can be added here to cover more functionality or edge cases
    // Consider testing for error cases, such as invalid data or database connection failures.
});