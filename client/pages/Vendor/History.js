import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NavigationContext } from "../../NavContext";
import { RFValue } from "react-native-responsive-fontsize";
import { OrderStatusProvider, useOrderStatus } from "../../OrderStatusContext";
import { FontAwesome } from "@expo/vector-icons";

export default function OrderHistory() {
  // Import the images
  const VegLogo = require("../../assets/VegLogo.png");
  const NonVegLogo = require("../../assets/NonVegLogo.png");

  const { currentOrder, dispatch } = useOrderStatus();

  const DATA = [
    {
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      orders: [
        {
          orderId: 1,
          customerName: "John Doe",
          status: "Preparing",
        },
        {
          orderId: 2,
          customerName: "John Doe",
          status: "Delivered",
        },
        {
          orderId: 3,
          customerName: "John Doe",
          status: "Cancelled",
        },
      ],
    },
    {
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      orders: [
        {
          orderId: 4,
          customerName: "John Doe",
          status: "Delivered",
        },
        {
          orderId: 5,
          customerName: "John Doe",
          status: "Delivered",
        },
        {
          orderId: 6,
          customerName: "John Doe",
          status: "Cancelled",
        },
      ],
    },
    {
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      orders: [
        {
          orderId: 7,
          customerName: "John Doe",
          status: "Delivered",
        },
        {
          orderId: 8,
          customerName: "John Doe",
          status: "Delivered",
        },
        {
          orderId: 9,
          customerName: "John Doe",
          status: "Delivered",
        },
      ],
    },
    {
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      orders: [
        {
          orderId: 10,
          customerName: "John Doe",
          status: "Delivered",
        },
        {
          orderId: 11,
          customerName: "John Doe",
          status: "Delivered",
        },
        {
          orderId: 12,
          customerName: "John Doe",
          status: "Delivered",
        },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing":
        return "orange";
      case "Cancelled":
        return "red";
      case "Delivered":
        return "green";
      default:
        return "grey";
    }
  };

  const showOrderDetails = (item) => {
    navigation.navigate("Order Summary", { item });
  };

  const CardItem = ({ item }) => {
    return (
        <View>
       <Text>
       {item.date}
       </Text> 
      <Pressable
        style={styles.items}
        onPress={() => {
          showOrderDetails(item);
        }}
      >

      </Pressable>
        </View>
    );
  };

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <NavigationContext.Provider value={{ navigation, route }}>
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
        <FlatList
          style={styles.historyContainer}
          data={DATA}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CardItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ position: "absolute", width: "100%", bottom: 0 }}>
          <Nav />
        </View>
      </NavigationContext.Provider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    height:'100%'
  },
  items: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
  },
  item: {
    paddingVertical: 5,
    flexDirection: "row",
    fontWeight: "bold",
    fontSize: RFValue(15),
    alignItems: "center",
    justifyContent: "space-around",
    width: "40%",
  },
  itemList: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  historyContainer: {
    flex: 1,
    width: "100%",
    marginBottom: RFValue(55), // Add padding to prevent overlap with navigation bar
  },
  storename: {
    fontSize: RFValue(15),
    fontWeight: "bold",
  },
  status: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    padding: 5,
    borderRadius: 5,
    color: "white",
  },
  nav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
