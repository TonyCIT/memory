import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getScores } from './database';

const ScoreScreen = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getScores((success, scores) => {
      if (success) {
        setScores(scores);
      } else {
        console.error('Failed to fetch scores');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>High Scores</Text>
      {scores.map((score, index) => (
        <Text key={index} style={styles.scoreText}>
          Score {index + 1}: {score.score}
        </Text>
      ))}
    </View>
  );
};

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

