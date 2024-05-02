import { StyleSheet, Pressable, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function ChooseUser({ navigation }) {
  return (
    <LinearGradient style={styles.container} colors={["#FFCC66", "#FF9933"]}>
      <View style={styles.content}>
        <Text style={styles.title}>Who are you?</Text>
        <View style={styles.choice}>
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate("Vendor Signup")}
          >
            <Text style={styles.btnText}>Vendor</Text>
          </Pressable>
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate("Student Signup")}
          >
            <Text style={styles.btnText}>Student</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    width: "100%",
    height: "20%",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 30,
    color: "#003366",
    fontFamily: "Ubuntu_700Bold",
  },
  choice: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btn: {
    backgroundColor: "#663300",
    borderRadius: 20,
    height: 50,
    fontWeight: "bold",
    width: "40%",
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
});
