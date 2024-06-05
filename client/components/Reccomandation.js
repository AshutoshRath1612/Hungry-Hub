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
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../CartContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import ShopModal from "./ShopModal";
import { Host, getPopularFoodRoute } from "../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Reccomandation() {

  const { dispatch, cart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [data,setData] = useState(null)

  const image = require("../assets/images/Logo.png")

  const route = useRoute();

  useEffect(() => {
    getPopularFood();
  }, [route]);

  const getPopularFood = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));

    const response = await fetch(`${Host}${getPopularFoodRoute}/${user._id}`);
    const data = await response.json();

    console.log(data)

    setData(data);
  };

  const addToCart = (item) => {
    if (cart.length === 0) {
      dispatch({ type: "ADD_TO_CART", payload: { shopName: item.shopName,shopId:item.shopId, items: [item.itemDetails] } });
    } else {
      if (cart[0].shopName === item.shopName) {
        dispatch({ type: "ADD_TO_CART", payload: { shopName: item.shopName,shopId:item.shopId, items: [item.itemDetails] } });
      } else {
        setCurrentData({ shopName: item.shopName,shopId:item.shopId, items: [item.itemDetails] });
        setModalVisible(true);
      }
    }
  }

  const CardItem = ({ item }) => {
    return (
      <>
          <View style={[styles.card, item.itemDetails.type === "Vegetarian" ? { backgroundColor: "#127311" } : { backgroundColor: "#D31911" }]}>
            <Image source={image} resizeMode="contain" style={styles.itemImg} />
            <View style={styles.cardInfo}>
              <View style={styles.leftInfo}>
                <Text style={styles.text}>{item.itemDetails.name && item.itemDetails.name.length > 14 ? item.itemDetails.name.substring(0, 14) + "..." : item.itemDetails.name}</Text>
                <Text style={[styles.text, { fontWeight: "bold" }]}>{item.shopName && item.shopName.length > 14 ? item.shopName.substring(0, 14) + "..." : item.shopName}</Text>
              </View>
              <View style={styles.rightInfo}>
                <Text style={styles.text}>₹ {item.itemDetails.price}</Text>
                <Pressable style={styles.btn} onPress={() => addToCart(item)}>
                  <Text style={{ color: "white", fontSize: 13 }}>Add <FontAwesome color="white" name="plus" /></Text>
                </Pressable>
              </View>
            </View>
          </View>
      </>
    );
  };

  return (
    <>
    {data && data.length>0 ? (<View style={styles.recommendation}>
      <Text style={styles.title}>Recommended for You</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <ShopModal data={currentData} shopName={cart[0]?.shopName} visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>):(<></>)}
    </>
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
    paddingHorizontal: 5,
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