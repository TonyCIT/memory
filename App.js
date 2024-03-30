import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import GameScreen from './GameScreen';
import ScoreScreen from './ScoreScreen';
import HelpScreen from './HelpScreen';
import SettingsScreen, { SoundContext } from './SettingsScreen'; // Ensure SoundContext is exported from SettingsScreen
import { initDB } from './database';
import { SoundProvider } from './SoundContext';
import CameraScreen from './CameraScreen.js';


const Stack = createStackNavigator();

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    initDB();
  }, []);

  return (
    <SoundProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} options={{ title: 'Welcome' }} />
          <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Game' }} />
          <Stack.Screen name="ScoreScreen" component={ScoreScreen} options={{ title: 'Scores' }} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
          <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ title: 'Help' }} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ title: 'Take Pictures' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SoundProvider>
  );
}
