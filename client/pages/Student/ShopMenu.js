import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Search from "../../components/Search";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
          category: "Snacks",
          items: [
            { name: "Burger", price: 100, type: "Vegetarian" },
            { name: "Pizza", price: 600, type: "Non-Vegetarian" },
            { name: "Sandwich", price: 450, type: "Vegetarian" },
          ],
        },
        {
          category: "Desert",
          items: [
            { name: "Ice Cream", price: 100, type: "Vegetarian" },
            { name: "Gulab Jamun", price: 600, type: "Vegetarian" },
            { name: "Rasgulla", price: 450, type: "Vegetarian" },
          ],
        }
      ],
    },
  ];

  const [scrollY] = useState(new Animated.Value(0));

  const HEADER_MAX_HEIGHT = 150;
  const HEADER_MIN_HEIGHT = 0;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, 0],
    extrapolate: "clamp",
  });

  const renderItem = ({ item }) => {
    return (
      <View key={item.category}>
        <Text style={styles.category}>{item.category}</Text>
        {item.items.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
            <TouchableOpacity>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}
      >
        <Image source={DATA[0].shopImage} style={styles.shopImage} />
        <View style={styles.shopInfo}>
          <FontAwesome name="star" size={24} color="black" />
          <Text>3.8</Text>
          <Text>(600+ ratings)</Text>
        </View>
      </Animated.View>
      <Animated.View style={[styles.searchContainer, { transform: [{ translateY: searchTranslateY }] }]}>
        <Search />
      </Animated.View>
      <AnimatedFlatList
        data={DATA[0].food}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT + 20 }} // Add some initial padding
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
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
