import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import GameScreen from './GameScreen'; // Import the new screen
import ScoresScreen from './ScoresScreen'; // Repeat for each screen
import SettingsScreen from './SettingsScreen';
import HelpScreen from './HelpScreen';
import { initDB } from './database';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ title: 'Welcome' }} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Game' }} />
        <Stack.Screen name="ScoresScreen" component={ScoresScreen} options={{ title: 'Scores' }} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ title: 'Help' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

