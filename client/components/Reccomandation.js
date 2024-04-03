import {
  View,
  ImageBackground,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React from "react";

export default function Reccomandation() {
  const data = [
    {
      image: require("../assets/LandingBG.png"),
      shopName: "Mio Amore",
      name: "Roll",
      price: 100,
    },
    {
      image: require("../assets/Plate.png"),
      shopName: "Urban Flavours",
      name: "Chicken Tikka Masala",
      price: 1000,
    },
    {
      image: require("../assets/Plate.png"),
      shopName: "def",
      name: "Card 3",
      price: 1200,
    },
    {
      image: require("../assets/Plate.png"),
      shopName: "abc",
      name: "Card 4",
      price: 150,
    },
    {
      image: require("../assets/Plate.png"),
      shopName: "abc",
      name: "Card 5",
      price: 130,
    },
  ];

  const CardItem = ({ item }) => {
    return (
      <View style={styles.card}>
          <Image source={item.image} resizeMode="contain" style={styles.itemImg} /> 
      </View>
    );
  };

  return (
    <View style={styles.reccomandation}>
      <Text style={styles.title}>Recommended for you</Text>
      <FlatList
        horizontal
        keyboardShouldPersistTaps="handled"
        data={data}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reccomandation: {
    overflow: "hidden",
    alignItems: "flex-start",
  },
  card: {
    width: 170,
    height: 150,
    backgroundColor: "lightgrey",
    margin: 10,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    marginLeft: 15,
    textAlign: "center",
    fontFamily: "Ubuntu_700Bold",
  },
  itemImg: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
    justifyContent: "space-between",
    alignItems: "center", // Set opacity to make the image slightly opaque
  },
});
