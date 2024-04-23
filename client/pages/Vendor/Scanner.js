import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Animated, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {RNQRCode} from 'react-native-qrcode-svg';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [animation] = useState(new Animated.Value(0));
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (scanned) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [scanned]);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopAnimation = () => {
    animation.stopAnimation();
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    startAnimation(); // Start the animation when an item is scanned
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedData(null);
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
        decodeQRCode(result.assets[0].uri);
      }
    }
  };

  const decodeQRCode = (uri) => {
    RNQRCode.detect(uri)
      .then((decodedData) => {
        if (decodedData && decodedData.length > 0) {
          setScanned(true);
          setScannedData(decodedData[0].data);
          startAnimation();
        } else {
          alert('No QR code found in the selected image.');
        }
      })
      .catch((error) => {
        console.error('Failed to decode QR code from image.', error);
      });
  };

  const toggleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            ref={(ref) => setCameraRef(ref)}
            flashMode={flashMode}
          />
        )}
        <Animated.View
          style={[
            styles.scanner,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-200, 200],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      {!selectedImage && (
        <TouchableOpacity style={styles.button} onPress={handlePickImage}>
          <Text style={styles.buttonText}>Select Image from Gallery</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
        <Text style={styles.buttonText}>
          {flashMode === Camera.Constants.FlashMode.off ? 'Flash On' : 'Flash Off'}
        </Text>
      </TouchableOpacity>
      {scanned && (
        <View style={styles.scanResult}>
          <Text>Scanned Data: {scannedData}</Text>
          <Button title="Scan Again" onPress={handleScanAgain} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  selectedImage: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  scanner: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'red',
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  scanResult: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
