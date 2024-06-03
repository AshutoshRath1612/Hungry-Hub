import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Container, { Toast } from "toastify-react-native";
import { Host, changePasswordRoute } from "../Constants";
import { Line } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { Logout } from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangePassword({ route,navigation }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async() => {
    if (handleError) {
      fetch(`${Host}${changePasswordRoute}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: route.params.user._id,
          isStudent: route.params.user.isStudent,
          newPassword,
          password,
        }),
      })
        .then((res) => res.json())
        .then(async(data) => {
          if (data.isSuccess) {
            Toast.success("Password Changed Successfully");
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            navigation.navigate("Login");
          } else {
            Toast.error(data.message);
          }
        });
    }
  };

  const handleError = () => {
    if (password.length < 6) {
      Toast.error("Password must be atleast 6 characters long");
      return false;
    }
    if (newPassword.length < 6) {
      Toast.error("New Password must be atleast 6 characters long");
      return false;
    }
    if (confirmPassword.length < 6) {
      Toast.error("Confirm Password must be atleast 6 characters long");
      return false;
    }
    if (newPassword !== confirmPassword) {
      Toast.error("Password does not match");
      return false;
    }
    return true;
  };

  return (
    <LinearGradient style={styles.container} colors={["#C38888", "white"]}>
      <Container position="top" width="90%" />
      <View style={styles.card}>
      <View>
        <Text>Change Password</Text>
        <TextInput style={styles.input} onChange={(e) => setPassword(e.nativeEvent.text)} />
      </View>
        <View style={styles.marginBox} />
      <View>
        <Text>New Password</Text>
        <TextInput secureTextEntry={true} style={styles.input} onChange={(e) => setNewPassword(e.nativeEvent.text)} />
      </View>
      <View style={styles.marginBox} />
      <View>
        <Text>Confirm Password</Text>
        <TextInput style={styles.input} onChange={(e) => setConfirmPassword(e.nativeEvent.text)} />
      </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
        <Text style={styles.btnText}>Submit</Text>
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
  card:{
    backgroundColor:'white',
    padding:10,
    borderRadius:10,
    elevation:5,
    width:'90%',
    justifyContent:'space-evenly',
  },
  input:{
    width:'90%',
    padding:10,
    borderRadius:10,
    marginVertical:10,
    marginHorizontal:'auto',
    backgroundColor:'white',
    elevation:5
  },
  marginBox: {
    marginVertical: "2.5%",
  },
    btn: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        marginVertical: "2.5%",
        width:"40%",
        alignItems:'center'
    },
    btnText:{
        fontSize:RFValue(15),
        fontWeight:'bold'
    }
});
