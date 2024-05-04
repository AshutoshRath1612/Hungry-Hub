import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Search from "../../components/Search";
import Nav from "../../components/Nav";
import { NavigationContext } from "../../NavContext";

export default function VendorHome({ navigation, route}) {
  const [totalOrders, setTotalOrders] = useState(10000);

  const [currentOrders, setCurrentOrders] = useState([
    1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);

  return (
    <NavigationContext.Provider value={{ navigation, route }}>

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
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={styles.infoCard}>
            <Ionicons name="fast-food" size={24} color="black" />
            <Text style={{ fontSize: RFValue(20) }}>10000</Text>
          </View>
          <View style={styles.infoCard}>
            <FontAwesome name="rupee" size={24} color="black" />
            <Text style={{ fontSize: RFValue(20) }}>0</Text>
          </View>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, height: 20 }}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: RFValue(15), fontWeight: "500" }}>
          Current Orders
        </Text>
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
            keyboardType="numeric"
            placeholderTextColor="gray"
            returnKeyType="search"
            onSubmitEditing={(e) => handleNavigate(e)}
          />
        </View>
      </View>
      <View
        style={{
          height: "49%",
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth:1,
          marginTop:RFValue(20),
          width:'100%'
        }}
      >
        {currentOrders.length !== 0 ? (
          <FlatList
            data={currentOrders}
            style={{marginBottom:'6%'}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Display two columns
            contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
            renderItem={({ item }) => (
              <View style={styles.ordercard}>
                <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>
                  No. {item}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text style={{ fontSize: RFValue(20) }}>No current orders</Text>
        )}
      </View>
      <View style={{ position:'absolute',bottom:0,width:'100%' }}>
      <Nav />
      </View>
    </View>
    </NavigationContext.Provider>
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
  ordercard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginHorizontal:'5%',
    height: 100,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    elevation:5
  },
});
