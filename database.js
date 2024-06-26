// database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('game.db');

const initDB = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, score INT);",
      [],
      () => { console.log('Table created successfully'); callback?.(true); },
      (_, error) => { console.log('Error creating table: ', error); callback?.(false, error); }
    );
  });
};

const insertScore = (score, callback) => {
  db.transaction(tx => {
    // Inside insertScore function:
tx.executeSql(
  "INSERT INTO scores (score) VALUES (?);",
  [score], // 'score' should be the variable you want to save
  (_, result) => {
    console.log('Score inserted successfully', result);
    callback(true, result); // Make sure to call the callback with true and result
  },
  (_, error) => {
    console.log('Error inserting score: ', error);
    callback(false, error); // Call the callback with false and error
  }
);

  });
};

const getScores = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM scores ORDER BY score DESC;",
      [],
      (_, result) => { callback?.(true, result.rows._array); },
      (_, error) => { console.log('Error fetching scores: ', error); callback?.(false, error); }
    );
  });
};

const clearScores = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "DELETE FROM scores;",
      [],
      (_, result) => { console.log('Scores cleared successfully'); callback?.(true, result); },
      (_, error) => { console.log('Error clearing scores: ', error); callback?.(false, error); }
    );
  });
};

export { initDB, insertScore, getScores, clearScores };
