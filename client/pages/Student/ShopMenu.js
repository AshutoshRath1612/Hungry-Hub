import React, { useState } from "react";
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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Search from "../../components/Search";
import { RFValue } from "react-native-responsive-fontsize";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function ShopMenu({ route }) {
  const DATA = [
    {
      shopName: "Mio Amore",
      rating: 3.8,
      ratingCount: 600,
      food: [
        {
          category: "Snacks",
          items: [
            { name: "Burger", price: 100, type: "Vegetarian", raitng: 4.5, ratingCount: 600 },
            { name: "Pizza", price: 600, type: "Non-Vegetarian", raitng: 4.5, ratingCount: 600 },
            { name: "Sandwich", price: 450, type: "Vegetarian", raitng: 4.5, ratingCount: 600 },
          ],
        },
        // Add other categories
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

  const renderCategoryButton = (category, index) => (
    <TouchableOpacity key={index} onPress={() => scrollToCategory(index)}>
      <Text style={styles.categoryButton}>{category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}
      >
        <ImageBackground source={require('../../assets/foodsbg.jpg')} style={styles.shopImage} />
        <View style={styles.shopInfo}>
          <FontAwesome name="star" size={20} color="black" />
          <Text style={{ fontSize: 18 }}>3.8</Text>
          <Text style={{ fontSize: 18 }}>(600+ ratings)</Text>
        </View>
      </Animated.View>
      <Animated.View style={[styles.searchContainer, { transform: [{ translateY: searchTranslateY }] }]}>
        <Search />
      </Animated.View>
      <AnimatedFlatList
        ref={listRef}
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
      {expanded && (
        <View style={styles.categoryButtonsContainer}>
          {DATA[0].food.map((category, index) => renderCategoryButton(category.category, index))}
        </View>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleExpand}>
        <FontAwesome name={expanded ? "chevron-down" : "chevron-up"} size={24} color="white" />
      </TouchableOpacity>
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
    width: '100%',
    height: RFValue(95),
    resizeMode: 'contain',
    borderRadius: 20,
    backgroundColor: 'red'
  },
  shopInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    width: '50%',
    paddingVertical: 10,
  },
  searchContainer: {
    position: "relative",
    top: RFValue(7),
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 2,
    backgroundColor: 'white',
    paddingVertical: 5,
  },
  categoryButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderTopLeftRadius: 20,
    alignItems: 'flex-end',
  },
  categoryButton: {
    color: 'white',
    fontSize: 16,
    padding: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

