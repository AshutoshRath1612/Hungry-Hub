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

const Login = ({ navigation }) => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const handleIdChange = (inputText) => {
    setUniqueId(inputText);
    console.log(uniqueId);
  };

  const handlePasswordChange = (inputText) => {
    setPassword(inputText);
    console.log(password);
  };

  const changeFocus = () => {
    setFocus(!focus);
  };

  const changeFocusPass = () => {
    setFocusPass(!focusPass);
  };

  const handleSubmit = () => {
    // const isValid = verifyCred(uniqueId, password)
    if (true) {
      const data = fetch(`${Host}auth/login`, {
        method: "POST",
        body: JSON.stringify({ uniqueId: uniqueId, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      console.log(data);
    }
    navigation.navigate("Vendor Home");
  };
  return (
    <LinearGradient colors={["#FFCC66", "#FF9933"]} style={styles.container}>
      <View style={styles.topic}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("../assets/Logo.png")}
        />
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          onChangeText={handleIdChange}
          value={uniqueId}
          keyboardType="numeric"
          placeholder={focus ? "" : "UID"}
          style={styles.input}
          onFocus={changeFocus}
          onBlur={changeFocus}
        />
        <TextInput
          onChangeText={handlePasswordChange}
          placeholder={focusPass ? "" : "Password"}
          onFocus={changeFocusPass}
          onBlur={changeFocusPass}
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
  },
  topic: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "20%",
  },
  title: {
    fontSize: 40,
    color: "#FFFFFF",
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
    borderColor: "#666666",
    borderWidth: 1,
    fontWeight:'bold',
    marginBottom: 10,
    padding: 5,
    textAlign: "center",
    borderRadius: 20,
  },
  btn: {
    backgroundColor: "#663300",
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
