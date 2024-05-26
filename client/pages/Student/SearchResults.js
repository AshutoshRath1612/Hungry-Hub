import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../../CartContext";
import CartCard from "../../components/CartCard";
import { Host, SearchRoute } from "../../Constants";
import { LinearGradient } from "expo-linear-gradient";
import ShopModal from "../../components/ShopModal";

export default function SearchResults({ route, navigation }) {
  const vegLogo = require("../../assets/icons/VegLogo.png");
  const nonVegLogo = require("../../assets/icons/NonVegLogo.png");

  const [searchResults, setSearchResults] = useState(null);
  const [totalResult, setTotalResult] = useState(0);
  const { cart,dispatch } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    if (route.params && route.params.searchItem) {
      const { searchItem } = route.params;
      console.log(searchItem)
      fetch(
        `${Host}${SearchRoute}?name=${searchItem.name}&shopName=${searchItem.shopName}&type=${searchItem.type}&category=${searchItem.category}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
        });
    }
  }, [route.params.searchItem]);

  useEffect(() => {
    let total = 0;
    if (searchResults && !searchResults.message) {
      searchResults.forEach((shop) => {
        shop.categories.forEach((category) => {
          total += category.items.length;
        });
      });
      setTotalResult(total);
    }
  }, [searchResults]);

  const addToCart = (item) => {
    if (cart.length === 0) {
     dispatch({ type: "ADD_TO_CART", payload: item });
   } else {
     if (cart[0].shopName === item.shopName) {
       dispatch({ type: "ADD_TO_CART", payload: item });
     } else {
       setCurrentData(item);
       setModalVisible(true);
     }
   }
 };

 const removeFromCart = (item) => {
   dispatch({ type: "REMOVE_FROM_CART", payload: item });
 };

  
  const handleAddItem = (item,category, foodItem) => {
    addToCart({
      items: [{...foodItem , quantity:1 , category:category.category}],
      shopName: item.shop.name,
      shopId: item.shop._id
    });
  };

  const handleRemoveItem = (foodItem)=>{
    removeFromCart(foodItem.name);
  }

  const findItem = (foodItem) => {
    if (cart.length > 0 && cart[0].items) {
    return cart[0].items.some((item) => {
        return item.name === foodItem.name;
      });
  }
  };

  return (
    <>
      {searchResults && !searchResults.message ? (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.searchBox}>
            <Search />
          </View>
          <ShopModal data={currentData} shopName={cart[0]?.shopName} visible={modalVisible} onClose={() => setModalVisible(false)} />
          <Text style={styles.resultText}>
            Showing results for {route.params.searchItem.name} ({totalResult})
          </Text>
          <FlatList
            style={{ marginBottom: cart.length !== 0 ? 80 : 0 }}
            data={searchResults}
            keyExtractor={(item, index) =>  item.shop._id+index.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.shopListHeader}>
                  <View style={styles.shopListHeaderInfo}>
                    <Text style={{ fontSize: RFValue(25), fontWeight: "bold" }}>
                      {item.shop.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "45%",
                        alignItems: "center",
                        marginVertical: 5,
                      }}
                    >
                      <FontAwesome name="star" size={18} color="orange" />
                      <Text style={{ fontSize: RFValue(13) }}>{item.shop.ratings}</Text>
                      <Text style={{ fontSize: RFValue(13) }}>({item.shop.ratingCount}+)</Text>
                    </View>
                  </View>
                  <FontAwesome
                    name="arrow-right"
                    size={25}
                    color="grey"
                    onPress={() => navigation.navigate("Shop Menu", { item })}
                  />
                </View>
                <FlatList
                  data={item.categories}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(category, index) => category._id + index.toString()}
                  renderItem={({ item:category }) => (
                    <>
                      {category.items.map((foodItem, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => console.log("Item pressed")}
                        >
                          <LinearGradient
                            colors={["#C38888", "white"]}
                            style={styles.foodItems}
                          >
                            <View style={styles.foodItemsInfo}>
                              <Image
                                source={
                                  foodItem.type === "Vegetarian"
                                    ? vegLogo
                                    : nonVegLogo
                                }
                                style={{ width: 20, height: 20 }}
                              />
                              <Text
                                style={{
                                  fontSize: RFValue(15),
                                  fontWeight: "bold",
                                }}
                              >
                                {foodItem.name}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: "50%",
                                  alignItems: "center",
                                  marginVertical: 5,
                                }}
                              >
                                <FontAwesome name="star" size={18} color="orange" />
                                <Text
                                  style={{
                                    fontSize: RFValue(13),
                                    marginHorizontal: RFValue(5),
                                  }}
                                >
                                  {foodItem.ratings}
                                </Text>
                                <Text style={{ fontSize: RFValue(13) }}>
                                  ({foodItem.ratingCount})
                                </Text>
                              </View>
                              <Text
                                style={{ fontSize: RFValue(15), fontWeight: "bold" }}
                              >
                                ₹{foodItem.price}
                              </Text>
                            </View>
                            <View style={styles.foodItemsImage}>
                              <Image
                                source={require("../../assets/images/Logo.png")}
                                style={{
                                  width: "100%",
                                  height: "90%",
                                  borderRadius: 10,
                                }}
                              />
                              {findItem(foodItem) ?
                                (
                                  <View style={[styles.addButton,{
                      borderColor:
                        foodItem.type === "Vegetarian" ? "green" : "red",
                      shadowColor:
                        foodItem.type === "Vegetarian" ? "green" : "red",
                      justifyContent:'space-between'
                    },]}>
                  <TouchableOpacity onPress={()=>handleRemoveItem(foodItem)}>
                    <FontAwesome name="minus" size={18} color='#4ab557'/>
                  </TouchableOpacity>
                  {cart[0].items.map(
                    (items) =>
                        items.name === foodItem.name && (
                        <Text key={index} style={{color:'#4ab557' , fontWeight:'bold',fontSize: RFValue(14)}}>{items.quantity}</Text>
                      )
                  )}
                  <TouchableOpacity onPress={()=>handleAddItem(item,category, foodItem)}>
                    <FontAwesome name="plus" size={18} color='#4ab557' />
                  </TouchableOpacity>
                </View>
                                )
                                :(
                                <Pressable
                                style={{
                                  ...styles.addbtn,
                                  borderColor:
                                    foodItem.type === "Vegetarian"
                                      ? "green"
                                      : "red",
                                }}
                                onPress={() => handleAddItem(item,category, foodItem)}
                              >
                                <Text
                                  style={{
                                    color: "orange",
                                    fontSize: RFValue(15),
                                    fontWeight: "bold",
                                  }}
                                >
                                  ADD
                                </Text>
                              </Pressable>)}
                            </View>
                          </LinearGradient>
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                />
              </View>
            )}
          />
        </View>
      ) : (
        <View>
          <Search />
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontSize: RFValue(15),
            }}
          >
            {searchResults ? searchResults.message : "Loading..."}
          </Text>
        </View>
      )}
      {cart.length !== 0 && <CartCard />}
    </>
  );
}
const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: "white",
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  resultText: {
    fontSize: RFValue(15),
    padding: 10,
    fontWeight: "bold",
    borderBottomColor: "grey",
  },
  card: {
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    backgroundColor: "#FDF1F1",
    marginVertical: 5,
    alignItems: "center",
  },
  shopListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  shopListHeaderInfo: {
    alignItems: "flex-start",
    width: "60%",
  },
  foodItems: {
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    width: RFValue(220),
    height: RFValue(120),
    marginHorizontal: 5,
    flexDirection: "row",
  },
  foodItemsInfo: {
    justifyContent: "space-around",
    height: "100%",
    width: "50%",
  },
  foodItemsImage: {
    width: "50%",
    height: "100%",
  },
  addbtn: {
    backgroundColor: "#FDF1F1",
    borderWidth: 2,
    borderRadius: 5,
    width: "70%",
    position: "absolute",
    bottom: 0,
    left: "12%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 5,
  },
  addButton: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: "12%",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 2,
    elevation: 5,
    width:'80%'
  },
});
