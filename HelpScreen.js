import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HelpScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>How to Play</Text>
      <Text style={styles.instructions}>
        Welcome to the Memory Game! Here's how to play:
        {'\n\n'}
        - You will see a grid of face-down cards.
        {'\n'}
        - Tap a card to reveal its image.
        {'\n'}
        - Try to remember the card's location and find its matching pair.
        {'\n'}
        - Match all the card pairs to win the game.
        {'\n'}
        - Try to match all pairs in the fewest moves possible!
        {'\n\n'}
        Good luck and have fun!
      </Text>
    </ScrollView>
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
  instructions: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HelpScreen;
