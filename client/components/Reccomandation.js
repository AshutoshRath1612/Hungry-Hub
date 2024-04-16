import {
  View,
  ImageBackground,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../CartContext";
import { useNavigation } from "@react-navigation/native";
import ShopModal from "./ShopModal";


export default function Reccomandation() {

  const { dispatch, cart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const navigation = useNavigation();

  const image = require("../assets/LandingBG.png")
  const data = [
    {
      shopName: "Mio Amore",
      items:[
        {
          name: "Roll",
          price: 100,
          type:'Vegeterian',
          ratings:4.0,
          ratingCount:500,
          category:'Snacks'
        },
        {
          name: "Burger",
          price: 200,
          type:'Non-Vegeterian',
          ratings:4.5,
          ratingCount:1000,
          category:'Snacks'
        }
      ]
    },
    {
      shopName: "Urban Flavours",
      items:[
        {
          name: "Roll",
          price: 100,
          type:'Vegeterian',
          ratings:4.0,
          ratingCount:500,
          category:'Main Course'
        },
        {
          name: "Burger",
          price: 200,
          type:'Non-Vegeterian',
          ratings:4.5,
          ratingCount:1000,
          category:'Main Course'
        }
      ]
    },
    {
      shopName: "Halka Phulka",
      items:[
        {
          name: "Roll",
          price: 100,
          type:'Vegeterian',
          ratings:4.0,
          ratingCount:500,
          category:'Pizza'
        },
        {
          name: "Burger",
          price: 200,
          type:'Non-Vegeterian',
          ratings:4.5,
          ratingCount:1000,
          category:'Pizza'
        }
      ]
    },
  ];

  const addToCart = (item, shopName) => {
    if (cart.length === 0) {
      dispatch({ type: "ADD_TO_CART", payload: { shopName: shopName, items: [{...item , quantity:1}] } });
    } else {
      if (cart[0].shopName === shopName) {
        dispatch({ type: "ADD_TO_CART", payload: { shopName: shopName, items: [{...item,quantity:1}] } });
      } else {
        setCurrentData({ shopName:shopName, items: [{...item,quantity:1}] });
        setModalVisible(true);
      }
    }
  }

  const CardItem = ({ item, shopName }) => {
    return (
      <>
        {item.map((item, index) => (
          <View key={index} style={[styles.card, item.type === "Vegeterian" ? { backgroundColor: "#127311" } : { backgroundColor: "#D31911" }]}>
            <Image source={image} resizeMode="contain" style={styles.itemImg} />
            <View style={styles.cardInfo}>
              <View style={styles.leftInfo}>
                <Text style={styles.text}>{item.name && item.name.length > 14 ? item.name.substring(0, 14) + "..." : item.name}</Text>
                <Text style={[styles.text, { fontWeight: "bold" }]}>{shopName && shopName.length > 14 ? shopName.substring(0, 14) + "..." : shopName}</Text>
              </View>
              <View style={styles.rightInfo}>
                <Text style={styles.text}>₹ {item.price}</Text>
                <Pressable style={styles.btn} onPress={() => addToCart(item, shopName)}>
                  <Text style={{ color: "white", fontSize: 13 }}>Add <FontAwesome color="white" name="plus" /></Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.recommendation}>
      <Text style={styles.title}>Recommended for You</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => <CardItem item={item.items} shopName={item.shopName} />}
        keyExtractor={(item, index) => item.shopName}
        showsHorizontalScrollIndicator={false}
      />
      <ShopModal data={currentData} shopName={cart[0]?.shopName} visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}


const styles = StyleSheet.create({
  recommendation: {
    overflow: "hidden",
    alignItems: "flex-start",
  },
  card: {
    width: 190,
    height: 150,
    margin: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 25,
    marginLeft: 15,
    textAlign: "center",
    fontFamily: "Ubuntu_700Bold",
  },
  itemImg: {
    width: "100%",
    height: "60%",
    opacity: 0.8,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    width: "100%",
    height: "40%",
  },
  leftInfo: {
    justifyContent: "space-around",
    width: "65%",
    paddingHorizontal: 5,
    alignItems: "flex-start",
  },
  rightInfo: {
    justifyContent: "space-around",
    width: "35%",
    paddingHorizontal: 5,
    alignItems: "flex-end",
  },
  text: {
    fontSize: 15,
    color: "white",
    fontFamily: "Ubuntu_400Regular",
  },
  btn: {
    backgroundColor: "rgba(128,128,128,0.6)",
    padding: 4,
    marginVertical: 2,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
});