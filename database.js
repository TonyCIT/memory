// Importing SQLite library for database operations
import * as SQLite from 'expo-sqlite';

// Opening or creating a database named 'game.db'
const db = SQLite.openDatabase('game.db');

// Function to initialize the database by creating a 'scores' table if it doesn't exist
const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      // SQL query to create the 'scores' table if it doesn't exist
      "CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, score INT);",
      [], // No parameters required for this SQL query
      () => console.log('Table created successfully'), // Success callback
      (_, error) => console.log('Error creating table: ', error) // Error callback
    );
  });
};

// Function to insert a new score into the 'scores' table
const insertScore = (score, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      // SQL query to insert a score into the 'scores' table
      "INSERT INTO scores (score) values (?);",
      [score],
      (_, result) => callback(true, result), // Success callback
      (_, error) => callback(false, error) // Error callback
    );
  });
};

// Function to retrieve all scores from the 'scores' table
const getScores = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      // SQL query to select all scores from the 'scores' table
      "SELECT * FROM scores;",
      [], 
      (_, result) => callback(true, result.rows._array), // Success callback
      (_, error) => callback(false, error) // Error callback
    );
  });
};

// Exporting functions to be accessible from other modules
export { initDB, insertScore, getScores };
