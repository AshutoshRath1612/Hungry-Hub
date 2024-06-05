import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native-gesture-handler";
import { Host, updateProfileRoute } from "../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Container, { Toast } from "toastify-react-native";

export default function Profile({ route, navigation }) {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(route.params.userData);
  console.log("data", data);

  const handleSubmit = () => {
    fetch(`${Host}${updateProfileRoute}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data)
        if (data.isSuccess) {
          Toast.success("Profile Updated Successfully");
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
          if(data.user.isStudent)
            navigation.navigate("Student Home", { user: data.user });
          else
            navigation.navigate("Vendor Home" , {user: data.user})
        } else {
          Toast.error(data.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Container position="top" duration={4000} width="90%" />
      <View style={styles.header}>
        <View style={styles.topic}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
            General Info
          </Text>
        </View>
        <View onTouchEnd={() => setEdit(!edit)}>
          <FontAwesome name="edit" size={24} color="black" />
        </View>
      </View>
      <View style={styles.cards}>
        <Text style={styles.title}>
          {route.params.userData.isStudent ? "Name" : "Shop Name"}
        </Text>
        {edit ? (
          <TextInput
            style={styles.input}
            value={data.isStudent ? data.name : data.shopName}
            onChangeText={(text) =>
              setData({
                ...data,
                [data.isStudent ? "name" : "shopName"]: text,
              })
            }
          />
        ) : (
          <Text style={styles.content}>
            {route.params.userData.isStudent
              ? route.params.userData.name
              : route.params.userData.shopName}
          </Text>
        )}
        <Text style={styles.title}>
          {route.params.userData.isStudent ? "Registration No" : "Username"}
        </Text>
        {edit && data.isStudent === false ? (
          <TextInput
            style={styles.input}
            value={data.username}
            onChangeText={(text) =>
              setData({
                ...data,
                "username": text,
              })
            }
          />
        ) : (
          <Text style={styles.content}>
            {route.params.userData.isStudent
              ? route.params.userData.regdNo
              : route.params.userData.username}
          </Text>
        )}
        {route.params.userData.isStudent === false ? (
          <>
            <View style={styles.marginBox}></View>
            <Text style={styles.title}>Unique Id</Text>
            <Text style={styles.content}>
              {route.params.userData.uniqueId}
            </Text>
            <View style={styles.marginBox}></View>
          </>
        ) : (
          <></>
        )}
        <Text style={styles.title}>Phone</Text>
        <Text style={styles.content}>{route.params.userData.mobileNo}</Text>
      </View>
      {edit ? (
        <View
          onTouchEnd={() => handleSubmit()}
          style={[
            styles.cards,
            {
              flexDirection: "row",
              height: "7%",
              alignItems: "center",
              paddingHorizontal: "20%",
            },
          ]}
        >
          <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
            Submit
          </Text>
        </View>
      ) : (
        <View
          onTouchEnd={() =>
            navigation.navigate("Change Password", {
              user: route.params.userData,
            })
          }
          style={[
            styles.cards,
            {
              flexDirection: "row",
              height: "7%",
              alignItems: "center",
              paddingHorizontal: "20%",
            },
          ]}
        >
          <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
            Change Password
          </Text>
        </View>
      )}
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
    color: "grey",
    fontWeight: "bold",
  },
  content: {
    fontSize: RFValue(15),
    fontWeight: "bold",
  },
  cards: {
    width: "90%",
    height: "35%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginVertical: "2.5%",
    elevation: 3,
  },
  marginBox: {
    marginVertical: "2.5%",
  },
  input: {
    width: "90%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: "auto",
    backgroundColor: "white",
    elevation: 5,
  },
});
