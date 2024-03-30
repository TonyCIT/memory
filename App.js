// Import necessary modules and components
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer from @react-navigation/native
import { createStackNavigator } from '@react-navigation/stack'; // Import createStackNavigator from @react-navigation/stack
import HomePage from './HomePage'; // Import HomePage component
import GameScreen from './GameScreen'; // Import GameScreen component
import ScoreScreen from './ScoreScreen'; // Import ScoreScreen component
import HelpScreen from './HelpScreen'; // Import HelpScreen component
import SettingsScreen, { SoundContext } from './SettingsScreen'; // Import SettingsScreen component and ensure SoundContext is exported from SettingsScreen
import { initDB } from './database'; // Import initDB function from database module
import { SoundProvider } from './SoundContext'; // Import SoundProvider from SoundContext module
import CameraScreen from './CameraScreen.js'; // Import CameraScreen component

// Create a Stack navigator
const Stack = createStackNavigator();

// Main App component
export default function App() {
  // State variable to manage sound enabled/disabled
  const [soundEnabled, setSoundEnabled] = useState(true);

  // useEffect hook to initialize the database when the component mounts
  useEffect(() => {
    initDB();
  }, []);

  // Return the main app structure
  return (
    // Wrap the entire app with SoundProvider to provide sound context
    <SoundProvider>
      {/* NavigationContainer to manage navigation */}
      <NavigationContainer>
        {/* Stack navigator to handle screen navigation */}
        <Stack.Navigator initialRouteName="Home">
          {/* Define screens and their respective components */}
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
