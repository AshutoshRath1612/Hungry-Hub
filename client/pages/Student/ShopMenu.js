import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Search from "../../components/Search";

export default function ShopMenu({ route }) {
  const DATA = [
    {
      shopName: "Mio Amore",
      shopImage: require("../../assets/LandingBG.png"),
      rating: 3.8,
      ratingCount: 600,
      food: [
        {
          category: "Roll",
          items: [
            { name: "Roll", price: 100, type: "Vegetarian" },
            { name: "Roll", price: 10, type: "Non-Vegetarian" },
            { name: "Roll", price: 1000, type: "Vegetarian" },
          ],
        },
        {
          category: "Cake",
          items: [
            { name: "Strawberry Cake", price: 500, type: "Vegetarian" },
            { name: "Vanilla Cake", price: 200, type: "Vegetarian" },
            { name: "Chocolate Cake", price: 400, type: "Non-Vegetarian" },
          ],
        },
        {
          category: "Beverages",
          items: [
            { name: "Tea", price: 100, type: "Vegetarian" },
            { name: "Coffee", price: 600, type: "Vegetarian" },
            { name: "Milk", price: 450, type: "Vegetarian" },
          ],
        },
        {
          category: "Beverages",
          items: [
            { name: "Tea", price: 100, type: "Vegetarian" },
            { name: "Coffee", price: 600, type: "Vegetarian" },
            { name: "Milk", price: 450, type: "Vegetarian" },
          ],
        },
        {
          category: "Beverages",
          items: [
            { name: "Tea", price: 100, type: "Vegetarian" },
            { name: "Coffee", price: 600, type: "Vegetarian" },
            { name: "Milk", price: 450, type: "Vegetarian" },
          ],
        },
        {
          category: "Beverages",
          items: [
            { name: "Tea", price: 100, type: "Vegetarian" },
            { name: "Coffee", price: 600, type: "Vegetarian" },
            { name: "Milk", price: 450, type: "Vegetarian" },
          ],
        },
      ],
    },
  ];
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const HEADER_MAX_HEIGHT = 150;
  const HEADER_MIN_HEIGHT = 0;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "extend", // Changed from "clamp" to "extend"
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Image source={DATA[0].shopImage} style={styles.shopImage} />
        <View style={styles.shopInfo}>
          <FontAwesome name="star" size={24} color="black" />
          <Text>3.8</Text>
          <Text>(600+ ratings)</Text>
        </View>
      </Animated.View>
      <View style={styles.searchContainer}>
        <Search />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {DATA[0].food.map((category) => (
          <View key={category.category}>
            <Text style={styles.category}>{category.category}</Text>
            {category.items.map((item, index) => (
              <View key={index} style={styles.menuItem}>
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
                <TouchableOpacity>
                  <Text>Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",

    zIndex: 100,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    overflow: "hidden",
  },
  shopImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  shopInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 20,
    zIndex: 1,
    elevation: 2,
    backgroundColor: "#fff",
  },
  category: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
