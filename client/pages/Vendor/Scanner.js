import { useNavigation, useRoute } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // for icons
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import jsQR from 'jsqr';
import ImageBase64 from 'react-native-image-base64';

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState('back')
  const [flash, setFlash] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

  };

  const handleScanAgain = () => {
    setScanned(false);
  };

  const toggleFlash = () => {
    setFlash(!flash);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const imageBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
      const base64 = `data:image/jpeg;base64,${imageBase64}`;
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          handleBarCodeScanned({ type: 'QR_CODE', data: code.data });
        } else {
          alert('No QR code found');
        }
      };
    }
  };

  return (
    <LinearGradient colors={["#C38888","white"]} style={styles.container}>
        <View style={styles.topOverlay}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topLeftIcon}>
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>toggleFlash()} style={styles.topRightIcon}>
              <Ionicons name="flash" size={30} color="white" />
            </TouchableOpacity>
          </View>
      <View style={styles.cameraWrapper}>
      <View style={styles.cameraContainer}>
       {flash ?  <CameraView
          style={styles.camera}
          facing={facing}
          enableTorch
          onBarcodeScanned={({type,data})=> scanned ? undefined : handleBarCodeScanned({type,data})}
        />
      :
      <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={({type,data})=> scanned ? undefined : handleBarCodeScanned({type,data})}
        />
      }
        </View>
        <View style={styles.overlay}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
        </View>
      </View>
      {scanned && <Button title={'Tap to Scan Again'} onPress={handleScanAgain} />}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Upload from Gallery</Text>
      </TouchableOpacity>
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraWrapper: {
    width: 250, // camera size + padding
    height: 250, // camera size + padding
    padding: 30, // padding between camera and borders
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 10, // Add border radius here
    overflow: 'hidden', // Ensure the camera respects the border radius
  },
  camera: {
    flex: 1,
  },
  topOverlay: {
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  topLeftIcon: {
    marginLeft: 10,
  },
  topRightIcon: {
    marginRight: 10,
  },
  overlay: {
    position: 'absolute',
    top: 10, // offset by padding
    left: 10, // offset by padding
    right: 10, // offset by padding
    bottom: 10, // offset by padding
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '20%',
    height: '20%',
    borderRadius:10,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderTopColor:'#A33C3C',
    borderLeftColor:'#872328'
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '20%',
    height: '20%',
    borderRadius:10,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopColor:'#A33C3C',
    borderRightColor:'#872328'
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '20%',
    height: '20%',
    borderRadius:10,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomColor:'#A33C3C',
    borderLeftColor:'#872328'
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '20%',
    height: '20%',
    borderRadius:10,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomColor:'#A33C3C',
    borderRightColor:'#872328'
  },
  uploadButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
  },
});