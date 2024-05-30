import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { GetAllShopRoute, Host } from "../Constants";
import { RFValue } from "react-native-responsive-fontsize";


export default function ShopList() {
  const navigation = useNavigation();
  const [data,setData] = useState([]);

  useEffect(() => {
    fetch(`${Host}${GetAllShopRoute}`)
    .then((response) => response.json())
    .then((data) => {
      setData(data)
    })
},[])

const CardItem = ({ item }) => {
  const [visibleFoodItems, setVisibleFoodItems] = useState([]);

  useEffect(() => {
    if(visibleFoodItems.length<15){
      let foodItem =''
      item.foods.forEach((food) => {
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
      <Pressable style={styles.card} onPress={()=>navigation.navigate('Shop Menu' , {shopName: item.name, id: item._id})}>
        <Image
          style={styles.icon}
          source={require("../assets/images/Plate.png")}
        ></Image>
        <View style={styles.info}>
          <Text style={styles.shopNames}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome
              name="star"
              size={15}
              color={item.ratings > 4 ? "#006400" : item.ratings>3 ? '#90EE90' : item.ratings>2 ? '#FAD5A5' : "#FF6347"}
            />
            <Text style={styles.ratings}>{item.ratings}</Text>
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
        data={data}
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
    width:'100%'
  },
  title: {
    fontSize: RFValue(25),
    marginLeft: 10,
    fontFamily: "Ubuntu_700Bold",
  },
  card: {
    width: '95%',
    height: 150,
    backgroundColor: "white",
    margin: '2.5%',
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
    fontSize: RFValue(25),
    color: "black",
    fontFamily: "Ubuntu_700Bold",
  },
  ratings: {
    fontSize: RFValue(16),
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