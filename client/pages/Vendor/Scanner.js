import { useNavigation, useRoute } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Host, orderDelivery, updateStatusRoute } from "../../Constants";
import Container, { Toast } from "toastify-react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState(false);
  const [data,setData] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [successModal , setSuccessModal]  = useState(false);

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
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data)
    fetch(`${Host}${orderDelivery}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: data }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
          if (data.isSuccess) {
            setModalVisible(true);
          } else {
            Toast.error(data.message);
            setScanned(false)
          }
      });
  };

  const handleScanAgain = () => {
    setScanned(false);
  };

  const toggleFlash = () => {
    setFlash(!flash);
  };

  const handleDeliver = (isDelivered) => {
    setModalVisible(false);
    if (isDelivered) {
      fetch(`${Host}${updateStatusRoute}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({orderId: data.split("|")[0] , status: "Delivered"})
      })
      .then(res=>res.json())
      .then(data => {
        if(data.isSuccess){
          setSuccessModal(true)
        }
        else{
          Toast.error(data.message)
        }
      })
    }
    setScanned(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: "base64",
      });
      const base64 = `data:image/jpeg;base64,${imageBase64}`;
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          handleBarCodeScanned({ type: "QR_CODE", data: code.data });
        } else {
          alert("No QR code found");
        }
      };
    }
  };

  return (
    <LinearGradient colors={["#C38888", "white"]} style={styles.container}>
      <Container
        width="90%"
        textStyle={{ fontSize: RFValue(15) }}
        position="top"
      />
      {modalVisible && (
        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <LottieView
                source={require("../../assets/icons/DeliveryModal.json")}
                loop
                autoPlay
                style={{ height: 200, width: 200 }}
              />
              <Text
                style={[styles.txt, { color: "black", textAlign: "center" }]}
              >
                Do you want to Deliver the order?
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleDeliver(true)}
                >
                  <Text style={styles.txt}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleDeliver(false)}
                >
                  <Text style={styles.txt}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {
        successModal && (
          <Modal visible={successModal} animationType="fade" transparent>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <LottieView
                source={require("../../assets/icons/DeliverSuccess.json")}
                loop
                autoPlay
                style={{ height: 200, width: 200 }}
              />
              <Text style={[styles.txt , {color:'black' , textAlign:'center'}]}>Order Delivered Successfully</Text>
              <View
                style={{ alignItems:'center' }}
              >
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setSuccessModal(false)}
                >
                  <Text style={styles.txt}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        )
      }
      <View style={styles.topOverlay}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.topLeftIcon}
        >
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFlash()}
          style={styles.topRightIcon}
        >
          <Ionicons name="flash" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.cameraWrapper}>
        <View style={styles.cameraContainer}>
          {flash ? (
            <CameraView
              style={styles.camera}
              facing={facing}
              enableTorch
              onBarcodeScanned={({ type, data }) =>
                scanned ? undefined : handleBarCodeScanned({ type, data })
              }
            />
          ) : (
            <CameraView
              style={styles.camera}
              facing={facing}
              onBarcodeScanned={({ type, data }) =>
                scanned ? undefined : handleBarCodeScanned({ type, data })
              }
            />
          )}
        </View>
        <View style={styles.overlay}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
        </View>
      </View>
      <TouchableOpacity style={styles.switchButton} onPress={()=>toggleCameraFacing()}>
        <Text style={styles.switchButtonText}>Switch Side</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraWrapper: {
    width: 250, // camera size + padding
    height: 250, // camera size + padding
    padding: 30, // padding between camera and borders
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 10, // Add border radius here
    overflow: "hidden", // Ensure the camera respects the border radius
  },
  camera: {
    flex: 1,
  },
  topOverlay: {
    position: "absolute",
    top: "10%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  topLeftIcon: {
    marginLeft: 10,
  },
  topRightIcon: {
    marginRight: 10,
  },
  overlay: {
    position: "absolute",
    top: 10, // offset by padding
    left: 10, // offset by padding
    right: 10, // offset by padding
    bottom: 10, // offset by padding
    justifyContent: "center",
    alignItems: "center",
  },
  cornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "20%",
    height: "20%",
    borderRadius: 10,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderTopColor: "#A33C3C",
    borderLeftColor: "#872328",
  },
  cornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "20%",
    height: "20%",
    borderRadius: 10,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopColor: "#A33C3C",
    borderRightColor: "#872328",
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "20%",
    height: "20%",
    borderRadius: 10,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomColor: "#A33C3C",
    borderLeftColor: "#872328",
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "20%",
    height: "20%",
    borderRadius: 10,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomColor: "#A33C3C",
    borderRightColor: "#872328",
  },
  switchButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#007AFF",
  },
  switchButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#A33C3C",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    fontSize: RFValue(22),
    fontWeight: "bold",
    margin: 10,
    color: "white",
  },
});
