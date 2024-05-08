import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { RadioButton } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import Container , {Toast} from 'toastify-react-native'
import {Host ,  AddFoodRoute } from "../../Constants";


export default function AddFood({navigation,route}) {
  const [newItem, setNewItem] = useState({
    shopName: route.params.shopName,
    name: "",
    price: "",
    category: "",
    type: "", // Set initial value to "veg"
    isAvailable: true, // Set initial value to "yes"
  });

  const handleSubmit = async() => {
    if(isValid){
    fetch(`${Host}${AddFoodRoute}` , {
      method:'POST',
      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res=> res.json())
    .then((data)=>{
      Toast.success(data.message)
    })
  }

  }

  const isValid = () => {
    if(newItem.shopName === '' || newItem.category === '' || newItem.isAvailable === undefined || newItem.name === '' || newItem.type === '' || newItem.price === 0){
      Toast.error('All fields are mandatory')
    }
    return true
  }

  const handleCancel = () => {
    setNewItem({
      name: "",
      price: "",
      category: "",
      type: "", // Set initial value to "veg"
      isAvailable: true, // Set initial value to "yes"
    })
    Toast.warn("All Fields are Reset")
  }

  return (
    <LinearGradient colors={["#FFFF66","white"]} style={styles.container}>
    <Container position='top' width='95%' height='10%' />
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
            value="Non-Vegetarian"
            status={newItem.type === "Non-Vegetarian" ? "checked" : "unchecked"}
            onPress={() => setNewItem({ ...newItem, type: "Non-Vegetarian" })}
          />
          <Text style={{ fontSize: RFValue(13), fontWeight: "bold" }}>
            Non-Vegetarian
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
              <View onTouchEnd={()=>handleSubmit()} style={styles.btn}>
                <Text style={[styles.text,{color:'white'}]}>Add</Text>
              </View>
              <View onTouchEnd={()=>handleCancel()} style={styles.btn}>
                <Text style={[styles.text,{color:'white'}]}>Cancel</Text>
              </View>
            </View>
          </View>
      </View>
      <View>
      <Entypo onPress={()=>navigation.goBack()} name="circle-with-cross" size={RFValue(60)} color="black" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  containerView: {
    backgroundColor: "#DDFFDD",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    backgroundColor: "#228B22",
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
