// need to install
// npm install @react-navigation/native
// npm install react-native-screens react-native-safe-area-context
// npm install @react-navigation/stack
// npx expo install expo-sqlite
// iOS, run-> npx pod-install
// npx expo install react-native-gesture-handler
// expo install expo-camera expo-image-picker

// Import necessary modules and components
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, ScrollView, Vibration } from 'react-native';
import FlipCard from 'react-native-flip-card'; // Import FlipCard component
import { Audio } from 'expo-av'; // Import Audio module for sound effects
import { insertScore, getScores } from './database'; // Import functions for database operations
import { useSoundContext } from './SoundContext'; // Import custom sound context for managing sound settings

// Path to the images
const frontImage = require('./assets/cover.png'); // Path to the front image of the card
const goodSound = require('./assets/r.mp3'); // Path to the sound for correct matches
const badSound = require('./assets/w.mp3'); // Path to the sound for incorrect matches

// Data for the cards
const defaultCardsData = [
  // Default card data with pairs
];

// Calculate card width based on screen size and desired layout
const screenWidth = Dimensions.get('window').width;
const cardMargin = 1.5; // Margin between cards
const cardsPerRow = 4; // Number of cards per row
const totalMargin = cardMargin * 2 * cardsPerRow; // Total margin for all cards in a row
const cardWidth = (screenWidth - totalMargin) / cardsPerRow; // Calculate individual card width

// Function to shuffle an array
const shuffleArray = (array) => {
  // Implementation of Fisher-Yates shuffle algorithm
};

// Main GameScreen component
const GameScreen = ({ route }) => {
  // State variables
  const { useDefaultImages, userImages } = route.params || { useDefaultImages: true, userImages: [] };
  const [canFlip, setCanFlip] = useState(true); // State to control flipping of cards
  const [flippedIndexes, setFlippedIndexes] = useState([]); // State to keep track of flipped card indexes
  const { soundEnabled } = useSoundContext(); // Access sound context for sound settings
  const [moves, setMoves] = useState(0); // State to track number of moves

  // Prepare card data based on user preference
  const prepareCardData = (useDefault, userImgs) => {
    // Logic to prepare card data based on user preference
  };

  // State for cards data
  const [cards, setCards] = useState(() => prepareCardData(useDefaultImages, userImages));

  // State for sound effects
  const [sounds, setSounds] = useState({ goodSound: null, badSound: null });

  // useEffect hook to load sounds on component mount
  useEffect(() => {
    loadSounds(); // Load sounds on mount
    return () => {
      sounds.goodSound?.unloadAsync(); // Unload sound on component unmount
      sounds.badSound?.unloadAsync(); // Unload sound on component unmount
    };
  }, []);

  // Function to load sounds
  const loadSounds = async () => {
    // Load sound effects for good and bad matches
  };

  // Function to play sound
  const playSound = async (sound) => {
    // Play the specified sound effect if sound is enabled
  };

  // Function to handle card press
  const onCardPress = (index) => {
    // Logic to handle card press
  };

  // Function to check for a match
  const checkForMatch = () => {
    // Logic to check for a match and handle end game
  };

  // Render the game screen
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {cards.map((card, index) => (
          <TouchableOpacity key={card.id} onPress={() => onCardPress(index)} disabled={!canFlip}>
            <FlipCard
              flipHorizontal={true}
              flipVertical={false}
              flip={card.isFlipped}
              clickable={false}
              style={styles.card}
            >
              {/* Front */}
              <View style={styles.imageContainer}>
                <Image style={styles.logo} source={frontImage} />
              </View>
              {/* Back */}
              <View style={styles.imageContainer}>
                <Image
                  style={styles.logo}
                  source={card.backImage.uri ? { uri: card.backImage.uri } : card.backImage}
                />
              </View>
            </FlipCard>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 10, // Add horizontal padding
  },
  card: {
    width: cardWidth,
    height: cardWidth * 0.40, // Maintain aspect ratio 7:10 for the cards
    margin: 2,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%', // Adjusted height to cover the card area
    resizeMode: 'cover',
  },
});

export default GameScreen;
