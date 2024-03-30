import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [imagePairs, setImagePairs] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera && imagePairs.length < 6) {
      const data = await camera.takePictureAsync(null);
      const newImagePair = {
        id1: `user-${imagePairs.length * 2}`,
        id2: `user-${imagePairs.length * 2 + 1}`,
        uri1: data.uri,
        uri2: data.uri, // Duplicate the image URI for matching
        pairId: `${imagePairs.length}`,
      };

      setImagePairs(prevPairs => {
        const updatedImagePairs = [...prevPairs, newImagePair];
        // Navigate to GameScreen with the images after capturing 6 images
        if (updatedImagePairs.length === 6) {
          const preparedImages = updatedImagePairs.flatMap(({ id1, id2, uri1, uri2, pairId }) => [
            { id: id1, backImage: { uri: uri1 }, pairId },
            { id: id2, backImage: { uri: uri2 }, pairId },
          ]);
          navigation.navigate('GameScreen', { useDefaultImages: false, userImages: preparedImages });
        }
        return updatedImagePairs;
      });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}
            disabled={imagePairs.length >= 6}
          >
            <Text style={styles.text}>
              {imagePairs.length < 6 ? 'Take Picture' : '6 Pictures Taken'}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.previewContainer}>
        {imagePairs.flatMap(({ uri1, uri2 }) => [uri1, uri2]).map((uri, index) => (
          <Image key={index} style={styles.preview} source={{ uri }} />
        ))}
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
  camera: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    color: 'white',
  },
  previewContainer: {
    flex: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default CameraScreen;
