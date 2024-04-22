import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Search from "../../components/Search";
import { RFValue } from "react-native-responsive-fontsize";
import ShopModal from "../../components/ShopModal";
import CartCard from "../../components/CartCard";
import Nav from "../../components/Nav";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function Menu({ navigation, route }) {
  const listRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const DATA = [
    {
      shopName: "Mio Amore",
      ratings: 3.8,
      ratingCount: 600,
      foods: [
        {
          category: "Snacks",
          items: [
            {
              name: "Burger",
              price: 100,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Pizza",
              price: 600,
              type: "Non-Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Sandwich",
              price: 450,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Main Course",
          items: [
            {
              name: "Biryani",
              price: 200,
              type: "Non-Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Fried Rice",
              price: 150,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Noodles",
              price: 180,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Desserts",
          items: [
            {
              name: "Ice Cream",
              price: 50,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Cake",
              price: 300,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Pastry",
              price: 100,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Drinks",
          items: [
            {
              name: "Cold Drink",
              price: 30,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Juice",
              price: 50,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Milk Shake",
              price: 70,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Fast Food",
          items: [
            {
              name: "Momos",
              price: 50,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Pasta",
              price: 100,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "French Fries",
              price: 70,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Beverages",
          items: [
            {
              name: "Tea",
              price: 10,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Coffee",
              price: 20,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Cold Coffee",
              price: 30,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
        {
          category: "Ice Cream",
          items: [
            {
              name: "Vanilla",
              price: 20,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Chocolate",
              price: 30,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
            {
              name: "Strawberry",
              price: 40,
              type: "Vegetarian",
              ratings: 4.5,
              ratingCount: 600,
            },
          ],
        },
      ],
    },
  ];

  const [scrollY] = useState(new Animated.Value(0));
  const [expanded, setExpanded] = useState(false);

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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const scrollToCategory = (categoryIndex) => {
    const yOffset = HEADER_MAX_HEIGHT + 20 + categoryIndex * 300; // Assuming each category occupies 300 units of space
    listRef.current.scrollToOffset({ animated: true, offset: yOffset });
    setExpanded(false);
  };

  const renderCategoryButton = (item, index) => (
    <TouchableOpacity key={index} onPress={() => scrollToCategory(index)}>
      <View style={styles.categoryButton}>
        <Text style={{ flex: 1, color: "white", fontSize: RFValue(13) }}>
          {item.category}
        </Text>
        <Text style={{ fontSize: RFValue(13), color: "white" }}>
          {item.items.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
        <View key={item.category} style={styles.categoryContainer}>
          <Text style={styles.category}>{item.category}</Text>
          {item.items.map((foodItem, index) => (
            <View key={index} style={styles.menuItem}>
              <View style={styles.logoContainer}>
                {foodItem.type === "Vegetarian" ? (
                  <Image
                    source={require("../../assets/VegLogo.png")}
                    style={styles.logo}
                  />
                ) : (
                  <Image
                    source={require("../../assets/NonVegLogo.png")}
                    style={styles.logo}
                  />
                )}
              </View>
              <View style={styles.itemDetails}>
                <Text style={{ fontSize: RFValue(15) }}>{foodItem.name}</Text>
                <Text
                  style={{
                    marginVertical: RFValue(5),
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  ₹ {foodItem.price}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "50%",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="star" size={18} color="black" />
                  <Text style={{ marginHorizontal: 2 }}>
                    {foodItem.ratings} ({foodItem.ratingCount}+)
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleAddItem(item, foodItem)}
                style={[
                  styles.addButton,
                  {
                    borderColor:
                      foodItem.type === "Vegetarian" ? "green" : "red",
                    shadowColor:
                      foodItem.type === "Vegetarian" ? "green" : "red",
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: RFValue(14),
                    paddingHorizontal: 5,
                    fontWeight: "bold",
                    color: "#4ab557",
                  }}
                >
                  ADD
                </Text>
                <FontAwesome
                  style={{ alignItems: "center" }}
                  name="plus"
                  size={18}
                  color="#4ab557"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
        ]}
      >
        <Image style={{resizeMode:'contain' , width:'40%'}} source={require('../../assets/Logo.png')} />
        <View style={styles.shopInfo}>
          <FontAwesome name="star" size={20} color="black" />
          <Text style={{ fontSize: 18 }}>3.8</Text>
          <Text style={{ fontSize: 18 }}>(600+ ratings)</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.searchContainer,
        ]}
      >
        <Search />
      </Animated.View>

      <AnimatedFlatList
        ref={listRef}
        style={{marginBottom:RFValue(50)}}
        data={DATA[0].foods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem} // Add some initial padding
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
      {expanded && (
        <View style={styles.categoryButtonsContainer}>
          <FlatList
            data={DATA[0].foods}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => renderCategoryButton(item, index)}
          />
        </View>
      )}
      <TouchableOpacity
        style={[styles.floatingButton]}
        onPress={toggleExpand}
      >
        <FontAwesome
          name={expanded ? "sticky-note" : "book"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
        <View style={{position:'absolute',bottom:0,width:'100%'}}>
          <Nav />
        </View>
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
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    overflow: "hidden",
    flexDirection:'row',
  },
  shopImage: {
    width: "100%",
    height: RFValue(95),
    resizeMode: "contain",
    borderRadius: 20,
    backgroundColor: "red",
  },
  shopInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "50%",
    paddingVertical: 10,
  },
  searchContainer: {

    elevation: 2,
    backgroundColor: "white",
    paddingVertical: 5,
  },
  category: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    marginTop: RFValue(10),
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
  addButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 2,
    elevation: 5,
    width: "30%",
  },
  categoryButtonsContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 10,
    borderRadius: 20,
    zIndex: 100,
    width: "60%",
    height: "50%",
    backgroundColor: "black",
    alignItems: "center",
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  floatingButton: {
    position: "absolute",
    bottom: RFValue(70),
    right: 20,
    backgroundColor: "black",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});