import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import Search from "../../components/Search";

export default function VendorHome() {
  return (
    <View style={{ height: "100%" }}>
      <Header />
      <Text
        style={{
          fontSize: RFValue(25),
          textAlign: "center",
          fontWeight: "bold",
          marginVertical: 20,
        }}
      >
        Mio Amore
      </Text>
      <View style={styles.top}>
        <Text
          style={{
            fontSize: RFValue(15),
            fontWeight: "500",
            marginHorizontal: 20,
          }}
        >
          Today:{" "}
          {new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <View style={{flexDirection:'row' , justifyContent:'space-around'}}>
        <View style={styles.infoCard}>
        <Ionicons  name="fast-food" size={24} color="black" />
          <Text style={{ fontSize: RFValue(20) }}>10000</Text>
        </View>
        <View style={styles.infoCard}>
        <FontAwesome name="rupee" size={24} color="black" />
          <Text style={{ fontSize: RFValue(20) }}>0</Text>
        </View>
        </View>
      </View>
      <View style={{borderBottomWidth:1,height:20}}></View>
      <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
      <View style={styles.searchBox}>
        <FontAwesome
          name="search"
          size={20}
          color="orange"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search Orders..."
          placeholderTextColor="gray"
          returnKeyType="search"
          onSubmitEditing={(e)=>handleNavigate(e)}
        />
      </View>
      </View>
      <View
        style={{
          height: "79%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: RFValue(20) }}>No orders yet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    justifyContent: "space-between",
  },
  infoCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    elevation: 5,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 9,
    backgroundColor: "white",
    width: "40%",
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: "black",
  },
});
