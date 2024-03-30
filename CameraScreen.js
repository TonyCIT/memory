import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera && images.length < 6) { // Ensure we don't exceed 6 images
      const data = await camera.takePictureAsync(null);
      const newImages = [...images, data.uri];
      setImages(newImages);

      // Check if we now have 6 images after updating the state.
      if (newImages.length === 6) {
        // Navigate to GameScreen with the images
        navigation.navigate('GameScreen', { useDefaultImages: false, userImages: [...newImages, ...newImages] });
      }
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
      <Camera style={styles.camera} ref={setCamera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture} disabled={images.length >= 6}>
            <Text style={styles.text}>{images.length < 6 ? 'Take Picture' : '6 Pictures Taken'}</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.previewContainer}>
        {images.map((imageUri, index) => (
          <Image key={index} style={styles.preview} source={{ uri: imageUri }} />
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
