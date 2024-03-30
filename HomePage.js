import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Memory Game</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start Game" onPress={() => navigation.navigate('GameScreen')} />
        <Button title="View Scores" onPress={() => navigation.navigate('ScoreScreen')} />
        <Button title="Settings" onPress={() => navigation.navigate('SettingsScreen')} />
        <Button title="How to Play" onPress={() => navigation.navigate('HelpScreen')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-between',
    maxHeight: 200, // Adjust the spacing between buttons
  },
});

export default HomePage;
