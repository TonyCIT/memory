import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useSoundContext } from './SoundContext'; // Import useSoundContext from SoundContext.js

const SettingsScreen = () => {
  const { soundEnabled, setSoundEnabled } = useSoundContext(); // Use the context to access sound settings
  
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <View style={styles.settingsOption}>
        <Text>Sound:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={soundEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setSoundEnabled}
          value={soundEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
    justifyContent: 'space-between',
  },
});

export default SettingsScreen;
