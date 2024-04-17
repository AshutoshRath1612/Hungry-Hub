import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";


export default function ShopList() {
  const navigation = useNavigation();
  const DATA = [
    {
      shopName: "Roll Shop",
      rating: 2.1,
      ratingCount: 200,
      food: [{ name: "Roll 1" }, { name: "Roll 2" }, { name: "Roll 3" }],
    },
    {
      shopName: "Burger King",
      rating: 4.3,
      ratingCount: 300,
      food: [{ name: "Burger 1" }, { name: "Burger 2" }, { name: "Burger 3" }],
    },
    {
      shopName: "Halka Fhulka",
      rating: 4.5,
      ratingCount: 400,
      food: [
        { name: "Pani Puri" },
        { name: "Dahi Puri" },
        { name: "Sev Puri" },
      ],
    },
    {
      shopName: "Urban Flavour",
      rating: 1,
      ratingCount: 500,
      food: [
        { name: "Chicken Tikka Masala" },
        { name: "Chicken Biryani" },
        { name: "Chicken Korma" },
      ],
    },
    {
      shopName: "Maggi Center",
      rating: 2.5,
      ratingCount: 100,
      food: [{ name: "Maggi" }, { name: "Maggi" }, { name: "Maggi" }],
    },
    {
      shopName: "Mio Amore",
      rating: 3.8,
      ratingCount: 600,
      food: [{ name: "Roll" }, { name: "Roll" }, { name: "Roll" }],
    },
  ];

const CardItem = ({ item }) => {
  const [visibleFoodItems, setVisibleFoodItems] = useState([]);


  useEffect(() => {
    if(visibleFoodItems.length<15){
      let foodItem =''
      item.food.forEach((food) => {
        for (let i = 0; i < food.name.length; i++) {
          if (foodItem.length < 20) {
            foodItem += food.name[i];
          } else {
            if(foodItem[foodItem.length-1] === ' ')
              foodItem += '...';
            break;
          }
        }
        foodItem += ',';

      })
      foodItem[foodItem.length-1] = ''
      foodItem += '...'
      while(true){
        if(foodItem[foodItem.lastIndexOf('...')-1] === ','){
          foodItem = foodItem.substring(0,foodItem.lastIndexOf('...')-1) + "..."
      }
      else{
        break
      }
    }
      setVisibleFoodItems(foodItem)
    }
  }, []);
  
    return (
      <Pressable style={styles.card} onPress={()=>navigation.navigate('Shop Menu' , {shopName: item.shopName})}>
        <Image
          style={styles.icon}
          source={require("../assets/Plate.png")}
        ></Image>
        <View style={styles.info}>
          <Text style={styles.shopNames}>{item.shopName}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome
              name="star"
              size={15}
              color={item.rating > 4 ? "#006400" : item.rating>3 ? '#90EE90' : item.rating>2 ? '#FAD5A5' : "#FF6347"}
            />
            <Text style={styles.ratings}>{item.rating}</Text>
            <Text>({item.ratingCount})</Text>
          </View>
          <View style={styles.foodContainer}>
            <Text>

            {visibleFoodItems}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shops</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <CardItem item={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingHorizontal: 10,
    marginBottom: 0,
    flex: 1,
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    fontFamily: "Ubuntu_700Bold",
  },
  card: {
    width: 350,
    height: 150,
    backgroundColor: "white",
    margin: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  icon: {
    height: 150,
    width: 150,
    resizeMode: "contain",
    width: "40%",
  },
  info: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "60%",
  },
  shopNames: {
    fontSize: 25,
    color: "black",
    fontFamily: "Ubuntu_700Bold",
  },
  ratings: {
    fontSize: 16,
    color: "grey",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "50%",
  },
  foodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 10,
  },
  foodItem: {
    marginRight: 5,
  },
});