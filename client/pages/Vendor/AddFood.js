import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { RadioButton } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

export default function AddFood({navigation}) {
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    type: "", // Set initial value to "veg"
    isAvailable: true, // Set initial value to "yes"
  });

  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: RFValue(20), fontWeight: "bold", marginBottom: 10 }}
      >
        Add Food
      </Text>
      <View style={styles.containerView}>
        <Text style={styles.text}>Food Name</Text>
        <TextInput
          onChangeText={(text) => setNewItem({ ...newItem, name: text })}
          style={styles.input}
          value={newItem.name}
        />
        <Text style={styles.text}>Price</Text>
        <TextInput
          onChangeText={(text) => setNewItem({ ...newItem, price: text })}
          style={styles.input}
          value={newItem.price}
        />
        <Text style={styles.text}>Category</Text>
        <TextInput
          onChangeText={(text) => setNewItem({ ...newItem, category: text })}
          style={styles.input}
          value={newItem.category}
        />
        <Text style={styles.text}>Type</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="Vegeterian"
            status={newItem.type === "Vegeterian" ? "checked" : "unchecked"}
            onPress={() => setNewItem({ ...newItem, type: "Vegeterian" })}
          />
          <Text style={{ fontSize: RFValue(13), fontWeight: "bold" }}>
            Vegeterian
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="Non-Vegeterian"
            status={newItem.type === "Non-Vegeterian" ? "checked" : "unchecked"}
            onPress={() => setNewItem({ ...newItem, type: "Non-Vegeterian" })}
          />
          <Text style={{ fontSize: RFValue(13), fontWeight: "bold" }}>
            Non-Vegeterian
          </Text>
        </View>
        <Text style={styles.text}>Available</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="Yes"
            status={newItem.isAvailable ? "checked" : "unchecked"}
            onPress={() => setNewItem({ ...newItem, isAvailable: true })}
          />
          <Text style={{ fontSize: RFValue(13), fontWeight: "bold" }}>Yes</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="No"
            status={!newItem.isAvailable ? "checked" : "unchecked"}
            onPress={() => setNewItem({ ...newItem, isAvailable: false })}
          />
          <Text style={{ fontSize: RFValue(13), fontWeight: "bold" }}>No</Text>
        </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={styles.btnView}>
              <View onTouchEnd={()=>console.log(newItem)} style={styles.btn}>
                <Text style={styles.text}>Add</Text>
              </View>
              <View style={styles.btn}>
                <Text style={styles.text}>Cancel</Text>
              </View>
            </View>
          </View>
      </View>
      <View>
      <Entypo onPress={()=>navigation.goBack()} name="circle-with-cross" size={RFValue(60)} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  containerView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  text: {
    color: "grey",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnView: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 10,
  },
  btn: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 5,
    marginVertical: 5,
  },
});
