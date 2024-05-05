import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Container, { Toast } from "toastify-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Clipboard from 'expo-clipboard';
import { FontAwesome } from '@expo/vector-icons';

export default function VendorUID({ navigation }) {
  const route = useRoute();
  const copyTextToClipboard = async() => {
    await Clipboard.setStringAsync(route.params.id);
    Toast.success("Text copied to clipboard");
  };

  return (
    <LinearGradient colors={["#FFFF66", "white"]} style={styles.UIDContainer}>
      <Container position="top" width="80%" />
      <View style={styles.container}>
        <Text style={styles.containerTitleText}>
          Thanks for registering with us.
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <Text style={styles.containerTitleText}>Your Unique ID is:</Text>
          <Text
            style={{
              fontSize: RFValue(20),
              fontWeight: "bold",
              color: "#254117",
            }}
          >
            {route.params.id}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={copyTextToClipboard}>
            <Text style={styles.btnText}>Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.warningContainer}>
      <FontAwesome name="warning" style={{width:'5%'}} size={20} color="green" />
        <Text style={{width:'90%' ,color:'red',fontWeight:'bold'}}>
          This is the only time you will be able to see the ID. Copy it for
          future Login.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  UIDContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#ADFFAD', // Light green color
    padding: 10,
    width: '80%',
    height: '20%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android
  },
  
  containerTitleText: {
    fontSize: RFValue(20),
    fontWeight: "500",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#228B22",
    borderRadius: 10,
    height: 50,
    width: "40%",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    fontSize: RFValue(20),
    color: "white",
  },
  warningContainer:{
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    justifyContent: "space-around",
    position:'absolute',
    bottom:'20%'
  }
});
