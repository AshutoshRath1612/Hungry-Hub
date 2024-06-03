import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export default function Profile({ route }) {
  console.log(route.params);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topic}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
            General Info
          </Text>
        </View>
        <View>
          <FontAwesome name="edit" size={24} color="black" />
        </View>
      </View>
      <View style={styles.cards}>
        <Text style={styles.title}>Shop Name</Text>
        <Text style={styles.content}>{route.params.userData.shopName}</Text>
        <View style={styles.marginBox}></View>
        <Text style={styles.title}>username</Text>
        <Text style={styles.content}>{route.params.userData.username}</Text>
        <View style={styles.marginBox}></View>
        <Text style={styles.title}>Unique Id</Text>
        <Text style={styles.content}>{route.params.userData.uniqueId}</Text>
        <View style={styles.marginBox}></View>
        <Text style={styles.title}>Phone</Text>
        <Text style={styles.content}>{route.params.userData.mobileNo}</Text>
      </View>
      <View style={[styles.cards , {flexDirection:'row' , height:'7%' , alignItems:'center' , paddingHorizontal:'20%'}]}>
        <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
        Change Password
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "85%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "40%",
  },
  title: {
    fontSize: RFValue(12),
    color:'grey',
    fontWeight: "bold",
  },
  content:{
    fontSize:RFValue(15),
    fontWeight:'bold'
  },
  cards: {
    width: "90%",
    height: "35%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding:10,
    borderRadius:15,
    marginVertical:'2.5%',
    elevation:3,
  },
  marginBox: {
    marginVertical: "2.5%",
  },
});
