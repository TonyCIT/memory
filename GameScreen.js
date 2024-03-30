// need to install
// npm install @react-navigation/native
// npm install react-native-screens react-native-safe-area-context
// npm install @react-navigation/stack
// npx expo install expo-sqlite
// iOS, run-> npx pod-install
// npx expo install react-native-gesture-handler
// expo install expo-camera expo-image-picker

import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, ScrollView, Vibration } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { Audio } from 'expo-av';
import { insertScore, getScores } from './database';
import { useSoundContext } from './SoundContext';


// Path to the images
const frontImage = require('./assets/cover.png'); // Path to the front image of the card
const goodSound = require('./assets/r.mp3'); // Path to the sound for correct matches
const badSound = require('./assets/w.mp3'); // Path to the sound for incorrect matches


// Data for the cards
const defaultCardsData = [
  { id: '1', backImage: require('./assets/1.png'), pairId: '1' },
  { id: '2', backImage: require('./assets/11.png'), pairId: '1' },
  { id: '3', backImage: require('./assets/2.png'), pairId: '2' },
  { id: '4', backImage: require('./assets/22.png'), pairId: '2' },
  { id: '5', backImage: require('./assets/3.png'), pairId: '3' },
  { id: '6', backImage: require('./assets/33.png'), pairId: '3' },
  { id: '7', backImage: require('./assets/4.png'), pairId: '4' },
  { id: '8', backImage: require('./assets/44.png'), pairId: '4' },
  { id: '9', backImage: require('./assets/5.png'), pairId: '5' },
  { id: '10', backImage: require('./assets/55.png'), pairId: '5' },
  { id: '11', backImage: require('./assets/6.png'), pairId: '6' },
  { id: '12', backImage: require('./assets/66.png'), pairId: '6' },
];

// Calculate card width based on screen size and desired layout
const screenWidth = Dimensions.get('window').width;
const cardMargin = 1.5; // Margin between cards
const cardsPerRow = 4; // Number of cards per row
const totalMargin = cardMargin * 2 * cardsPerRow; // Total margin for all cards in a row
const cardWidth = (screenWidth - totalMargin) / cardsPerRow; // Calculate individual card width

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Main App component
const GameScreen = ({ route }) => {
  // State variables
  const { useDefaultImages, userImages } = route.params || { useDefaultImages: true, userImages: [] };
  // const [cards, setCards] = useState(() => shuffleArray(defaultCardsData .map(card => ({ ...card, isFlipped: false, matched: false })))); // State for cards data
  const [canFlip, setCanFlip] = useState(true); // State to control flipping of cards
  const [flippedIndexes, setFlippedIndexes] = useState([]); // State to keep track of flipped card indexes
  const { soundEnabled } = useSoundContext();
  const [moves, setMoves] = useState(0);

  const prepareCardData = (useDefault, userImgs) => {
    let cardsArray = [];
    if (useDefault) {
      cardsArray = defaultCardsData.map((card, index) => ({
        id: `default-${index}`,
        backImage: card.backImage, // This works because it's a required local image
        pairId: card.pairId,
        isFlipped: false,
        matched: false,
      }));
    } else {
      // We make sure to create pairs and assign the correct uri for dynamic images
      cardsArray = userImgs.map((img, index) => ({
        id: `user-${index}`,
        backImage: { uri: img.uri }, // Make sure to access the uri property of the img object
        pairId: `${Math.floor(index / 2)}`,
        isFlipped: false,
        matched: false,
      }));
    }
    return shuffleArray(cardsArray);
  };

  const [cards, setCards] = useState(() => prepareCardData(useDefaultImages, userImages));


  // State for sound effects
  const [sounds, setSounds] = useState({ goodSound: null, badSound: null });

  // useEffect hook to load sounds on component mount
  useEffect(() => {
    loadSounds();
    return () => {
      sounds.goodSound?.unloadAsync();
      sounds.badSound?.unloadAsync();
    };
  }, []);

  // Function to load sounds
  const loadSounds = async () => {
    try {
      const goodEffect = new Audio.Sound();
      const badEffect = new Audio.Sound();
      await goodEffect.loadAsync(goodSound);
      await badEffect.loadAsync(badSound);
      setSounds({ goodSound: goodEffect, badSound: badEffect });
    } catch (error) {
      console.error("Couldn't load sound", error);
    }
  };

  // Function to play sound
  const playSound = async (sound) => {
    if (soundEnabled) { // Check if sound is enabled
      try {
        await sound?.replayAsync();
      } catch (error) {
        console.error("Couldn't play sound", error);
      }
    }
  };


  // Adjust the `onCardPress` function to fix the matching logic
  const onCardPress = (index) => {
    if (!canFlip || cards[index].matched || cards[index].isFlipped) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;

    // Use setState callback to correctly increment moves
    setMoves((prevMoves) => prevMoves + 1);

    const flippedCards = newCards.filter((card) => card.isFlipped && !card.matched);

    if (flippedCards.length === 2) {
      // Wait for state to update before checking for a match
      setTimeout(() => {
        // Determine if the two flipped cards are a match
        if (flippedCards[0].pairId === flippedCards[1].pairId) {
          // Mark cards as matched
          flippedCards[0].matched = true;
          flippedCards[1].matched = true;
          playSound(sounds.goodSound);
          Vibration.vibrate(100);
          checkForMatch(); // Check if all cards are matched
        } else {
          playSound(sounds.badSound);
          // Flip cards back over
          flippedCards[0].isFlipped = false;
          flippedCards[1].isFlipped = false;
        }

        // Update cards state
        setCards(newCards);
        setCanFlip(true);
      }, 500);
    } else {
      // Allow flipping another card
      setCanFlip(true);
    }
  };

  // This function checks if all cards are matched and handles the end game logic
  const checkForMatch = () => {
    // Check if all cards are matched
    const allMatched = cards.every((card) => card.matched);
    if (allMatched) {
      // Game finished logic here
      Vibration.vibrate([500, 200, 500]);
      Alert.alert("Congratulations", `You've completed the game in ${moves} moves!`);

      // Save the score
      insertScore(moves, (success, result) => {
        if (success) {
          console.log('Score saved successfully', result);
        } else {
          console.error('Failed to save score');
        }
      });
    }
  };

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