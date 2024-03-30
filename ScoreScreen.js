//ScoreScreen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getScores } from './database';

const ScoreScreen = () => {
  // State variable to store fetched scores
  const [scores, setScores] = useState([]);

  // useEffect hook to fetch scores when the component mounts
  useEffect(() => {
    getScores((success, fetchedScores) => {
      if (success) {
        console.log('Fetched scores:', fetchedScores); // Debugging line
        setScores(fetchedScores); // Update state with fetched scores
      } else {
        console.error('Failed to fetch scores');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>High Scores</Text>
      {/* Display fetched scores or a message if no scores available */}
      {scores.length > 0 ? (
        scores.map((score, index) => (
          <Text key={index} style={styles.scoreText}>
            Score {index + 1}: {score.score}
          </Text>
        ))
      ) : (
        <Text style={styles.scoreText}>No scores available.</Text>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    margin: 5,
  },
});

export default ScoreScreen;
