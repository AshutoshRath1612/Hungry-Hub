import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Host, LoginRoute } from "../Constants";
import Container, { Toast } from "toastify-react-native";
import { RFValue } from "react-native-responsive-fontsize";

const Login = ({ navigation }) => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (inputText) => {
    setUniqueId(inputText);
  };

  const handlePasswordChange = (inputText) => {
    setPassword(inputText);
  };

  const handleSubmit = () => {
    if (isValid()) {
      const data = fetch(`${Host}auth/login`, {
        method: "POST",
        body: JSON.stringify({ uniqueId: uniqueId, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json().then((data) => {
            return { status: res.status, data: data };
          });
        })
        .then((data) => {
          if (data.status === 200) {
            navigation.navigate(
              `${data.data.isStudent ? `Student Home` : `Vendor Home`}`,
              { user: data.data }
            );
          } else {
            Toast.error(data.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const isValid = () => {
    if (uniqueId === "" || password === "") {
      Toast.error("All fields are mandatory");
      return false;
    }
    if (uniqueId.length !== 6 && uniqueId.length !== 10) {
      Toast.error("UID has to be 6 or 10 digits");
      return false;
    }
    if (password.length < 6) {
      Toast.error("Password has to be atleast 6 characters");
      return false;
    }
    return true;
  };

  return (
    <LinearGradient colors={["#FFFF66","white"]} style={styles.container}>
      <Container
        width="90%"
        textStyle={{ fontSize: RFValue(15) }}
        position="top"
      />
      <View style={styles.topic}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("../assets/images/Logo.png")}
        />
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          onChangeText={handleIdChange}
          value={uniqueId}
          keyboardType="numeric"
          placeholder="UID"
          style={styles.input}
        />
        <TextInput
          onChangeText={handlePasswordChange}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          style={styles.input}
        />
        <Pressable style={styles.btn} onPress={() => handleSubmit()}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 18 }}>
        Not a User?{" "}
        <Text
          style={styles.signup}
          onPress={() => navigation.navigate("Choose User")}
        >
          Sign up
        </Text>
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    height: "100%",
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
  },
  topic: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "20%",
  },
  title: {
    fontSize: 40,
    color: "#254117",
    fontFamily: "Ubuntu_700Bold",
  },
  logo: {
    height: "50%",
  },
  form: {
    height: "30%",
    justifyContent: "space-between",
  },
  input: {
    height: 50,
    width: 300,
    borderColor: "#808080",
    borderWidth: 1,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 5,
    textAlign: "center",
    borderRadius: 20,
  },
  btn: {
    backgroundColor: "#228B22",
    borderRadius: 20,
    height: 50,
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
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  signup: {
    color: "blue",
  },
});

export default Login;
