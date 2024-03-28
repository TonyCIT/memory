import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { Audio } from 'expo-av';

// Path to the images
const frontImage = require('./assets/icon.png');
const goodSound = require('./assets/r.mp3');
const badSound = require('./assets/w.mp3');

// Data for the cards
const cardsData = [
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
    // Repeat for all cards...
];

const screenWidth = Dimensions.get('window').width;
const cardMargin = 2; // Assuming a margin of 2 from your styles
const cardsPerRow = 4; // Desired number of cards per row
const totalMargin = cardMargin * 2 * cardsPerRow; // Total margin for all cards in a row
const cardWidth = (screenWidth - totalMargin) / cardsPerRow;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App = () => {
  const [cards, setCards] = useState(() => shuffleArray(cardsData.map(card => ({ ...card, isFlipped: false, matched: false }))));
  const [canFlip, setCanFlip] = useState(true);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  // Sound effects
  const [sounds, setSounds] = useState({ goodSound: null, badSound: null });

  useEffect(() => {
    loadSounds();
    return () => {
      sounds.goodSound?.unloadAsync();
      sounds.badSound?.unloadAsync();
    };
  }, []);

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

  const playSound = async (sound) => {
    try {
      await sound?.replayAsync();
    } catch (error) {
      console.error("Couldn't play sound", error);
    }
  };

  const checkForMatch = () => {
    const allMatched = cards.every(card => card.matched);
    if (allMatched) {
      Alert.alert("Congratulations!", "You've matched all the cards!");
    }
  };

  const onCardPress = (index) => {
    if (!canFlip || cards[index].matched || cards[index].isFlipped) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    const flippedCards = newCards.filter(card => card.isFlipped && !card.matched);

    if (flippedCards.length === 2) {
      setCanFlip(false);
      if (flippedCards[0].pairId === flippedCards[1].pairId) {
        flippedCards[0].matched = true;
        flippedCards[1].matched = true;
        playSound(sounds.goodSound);
      } else {
        playSound(sounds.badSound);
        setTimeout(() => {
          flippedCards.forEach(card => card.isFlipped = false);
          setCards(newCards);
          setCanFlip(true);
        }, 1000);
        setCards(newCards);
        return;
      }
    }
    setCards(newCards);
    setCanFlip(true);
    checkForMatch();
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
                <Image style={styles.logo} source={card.backImage} />
              </View>
            </FlipCard>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

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

export default App;