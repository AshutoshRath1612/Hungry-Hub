import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image, Pressable } from "react-native";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NavigationContext } from "../../NavContext";
import { RFValue } from "react-native-responsive-fontsize";

export default function OrderHistory() {
  // Import the images
  const VegLogo = require("../../assets/VegLogo.png");
  const NonVegLogo = require("../../assets/NonVegLogo.png");

  const DATA = [
    {
      _id: 1,
      storeName: "Store Name 1",
      orderId: "Order Name 1",
      items: [
        { name: "Item Name 1", quantity: 1, ratings: 5.0 , ratingCount: 600,price: 10, type: "Vegeterian",
        category:'Snacks' },
        {
          name: "Item Name 2",
          quantity: 2,
          ratings: 5.0 , ratingCount: 600,price: 100,
          type: "Non-Vegeterian",
          
category:'Beverages'
        },
        { name: "Item Name 3", quantity: 3, ratings: 5.0 , ratingCount: 600,price: 10, type: "Non-Vegeterian",
        category:'Main Course' },
        { name: "Item Name 4", quantity: 4, ratings: 5.0 , ratingCount: 600,price: 100, type: "Vegeterian",
        category:'Pizza' },
      ],
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Baking",
      time: new Date().toLocaleTimeString(),
      orderType: "Dine in",
      transactionId: "AZHDGYW52S",
      paymentStatus: "Success",
    },
    {
      _id: 2,
      storeName: "Store Name 2",
      orderId: "Order Name 2",
      items: [
        { name: "Item Name 1", quantity: 1, ratings: 5.0 , ratingCount: 600,price: 10, type: "Vegeterian",
        category:'Snacks' },
        {
          name: "Item Name 2",
          quantity: 2,
          ratings: 5.0 , ratingCount: 600,price: 100,
          type: "Non-Vegeterian",
          
category:'Beverages'
        },
        { name: "Item Name 3", quantity: 3, ratings: 5.0 , ratingCount: 600,price: 10, type: "Non-Vegeterian",
        category:'Main Course' },
        { name: "Item Name 4", quantity: 4, ratings: 5.0 , ratingCount: 600,price: 100, type: "Vegeterian",
        category:'Pizza' },
      ],
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Cancelled",
      time: new Date().toLocaleTimeString(),
      orderType: "Dine in",
      transactionId: "AZHDGYW52S",
      paymentStatus: "Success",
    },
    {
      _id: 3,
      storeName: "Store Name 3",
      orderId: "Order id 3",
      items: [
        { name: "Item Name 1", quantity: 1, ratings: 5.0 , ratingCount: 600,price: 10, type: "Vegeterian",
        category:'Snacks' },
        {
          name: "Item Name 2",
          quantity: 2,
          ratings: 5.0 , ratingCount: 600,price: 100,
          type: "Non-Vegeterian",
          
category:'Beverages'
        },
        { name: "Item Name 3", quantity: 3, ratings: 5.0 , ratingCount: 600,price: 10, type: "Non-Vegeterian",
        category:'Main Course' },
        { name: "Item Name 4", quantity: 4, ratings: 5.0 , ratingCount: 600,price: 100, type: "Vegeterian",
        category:'Pizza' },
      ],
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Delivered",
      time: new Date().toLocaleTimeString(),
      orderType: "Dine in",
      transactionId: "AZHDGYW52S",
      paymentStatus: "Success",
    },
    {
      _id: 4,
      storeName: "Store Name 4",
      orderId: "Order id 4",
      items: [
        { name: "Item Name 1", quantity: 1, ratings: 5.0 , ratingCount: 600,price: 10, type: "Vegeterian",
        category:'Snacks' },
        {
          name: "Item Name 2",
          quantity: 2,
          ratings: 5.0 , ratingCount: 600,price: 100,
          type: "Non-Vegeterian",
          
category:'Beverages'
        },
        { name: "Item Name 3", quantity: 3, ratings: 5.0 , ratingCount: 600,price: 10, type: "Non-Vegeterian",
        category:'Main Course' },
        { name: "Item Name 4", quantity: 4, ratings: 5.0 , ratingCount: 600,price: 100, type: "Vegeterian",
        category:'Pizza' },
      ],
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Delivered",
      time: new Date().toLocaleTimeString(),
      orderType: "Dine in",
      transactionId: "AZHDGYW52S",
      paymentStatus: "Success",
    },
    {
      _id: 5,
      storeName: "Store Name 5",
      orderId: "Order id 5",
      items: [
        { name: "Item Name 1", quantity: 1, ratings: 5.0 , ratingCount: 600,price: 10, type: "Vegeterian",
        category:'Snacks' },
        {
          name: "Item Name 2",
          quantity: 2,
          ratings: 5.0 , ratingCount: 600,price: 100,
          type: "Non-Vegeterian",
          
category:'Beverages'
        },
        { name: "Item Name 3", quantity: 3, ratings: 5.0 , ratingCount: 600,price: 10, type: "Non-Vegeterian",
        category:'Main Course' },
        { name: "Item Name 4", quantity: 4, ratings: 5.0 , ratingCount: 600,price: 100, type: "Vegeterian",
        category:'Pizza' },
      ],
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Delivered",
      time: new Date().toLocaleTimeString(),
      orderType: "Dine in",
      transactionId: "AZHDGYW52S",
      paymentStatus: "Success",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Baking":
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
    const findPrice = (items) => {
      let price = 0;
      items.forEach((item) => {
        price += item.price * item.quantity;
      });
      return price;
    };
    return (
      <Pressable
        style={styles.items}
        onPress={() => {
          showOrderDetails(item);
        }}
      >
        <View style={styles.itemHeader}>
          <Image
            style={{ height: RFValue(50), width: RFValue(50) }}
            resizeMode="contain"
            source={require("../../assets/Logo.png")}
          />
          <View>
            <Text style={styles.storename}>{item.storeName}</Text>
          </View>
          <Text
            style={[
              styles.status,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            {item.status}
          </Text>
        </View>
        <FlatList
          data={item.items}
          style={styles.itemList}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image
                style={{ height: RFValue(15), width: RFValue(15) }}
                resizeMode="contain"
                source={item.type === "Vegeterian" ? VegLogo : NonVegLogo}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(12),
                  color: "grey",
                }}
              >
                {item.quantity}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(12),
                  color: "grey",
                }}
              >
                x
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: RFValue(12) }}>
                {item.name}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={[
            styles.item,
            {
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 5,
            },
          ]}
        >
          <Text style={{ color: "grey", fontWeight: 500 }}>
            {item.date} at {item.time}
          </Text>
          <Text style={{ fontWeight: "bold" }}>₹ {findPrice(item.items)}</Text>
        </View>
      </Pressable>
    );
  };

  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <NavigationContext.Provider value={{ navigation, route }}>
        <FlatList
          style={styles.historyContainer}
          data={DATA}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CardItem item={item} />}
          keyExtractor={(item) => item._id.toString()}
        />
        <View style={styles.nav}>
          <Nav navigation={navigation} currentRoute={route.name} />
        </View>
      </NavigationContext.Provider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
