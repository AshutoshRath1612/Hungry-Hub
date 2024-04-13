import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { useCart } from "../../CartContext";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Nav from "../../components/Nav";
import { NavigationContext } from "../../NavContext";
import Reccomandation from "../../components/Reccomandation";
import { RadioButton } from "react-native-paper";

export default function Cart({ navigation, route }) {
  const vegLogo = require("../../assets/VegLogo.png");
  const nonVegLogo = require("../../assets/NonVegLogo.png");

  const { cart, dispatch } = useCart();

  const [showRecommandation, setShowRecommandation] = useState(false);
  const [deliveryType, setDeliveryType] = useState("Dine-in");

  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.foodItem.name });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const handleAddItem = (cartItem, categories, item) => {
    const newValue = {
      category: {
        name: categories.name,
        foodItem: { ...item, quantity: 1 },
      },
      shopName: cartItem.shopName,
    };
    dispatch({ type: "ADD_TO_CART", payload: newValue });
  };

  const handleRemoveItem = (foodItem) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: foodItem.name });
  };

  const findPrice = () => {
    let totalPrice = 0;
    cart.map((cartItem) => {
      cartItem.category.map((categories) => {
        categories.foodItem.map((item) => {
          totalPrice += item.quantity * item.price;
        });
      });
    });
    return totalPrice;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <NavigationContext.Provider value={{ navigation, route }}>
            {cart.length !== 0 ? (
              <View style={styles.viewContainer}>
                <View style={styles.shopName}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome name="shopping-bag" color="blue" size={20} />
                    <Text style={styles.text}>{cart[0].shopName}</Text>
                  </View>
                  <FontAwesome
                    onPress={() =>
                      navigation.navigate("Shop Menu", {
                        shopName: cart[0].shopName,
                      })
                    }
                    name="arrow-circle-right"
                    size={22}
                    color="blue"
                  />
                </View>
                <View style={styles.bigContainer}>
                  {cart.map((cartItem) =>
                    cartItem.category.map((categories) =>
                      categories.foodItem.map((item, index) => (
                        <View key={index} style={styles.item}>
                          <Image
                            source={
                              item.type === "Vegetarian" ? vegLogo : nonVegLogo
                            }
                            style={{ width: RFValue(20), height: RFValue(20) }}
                          />
                          <Text style={{ width: "30%" }}>{item.name}</Text>
                          <Text>₹ {item.price * item.quantity}</Text>
                          <View
                            style={[
                              styles.addButton,
                              {
                                borderColor:
                                  item.type === "Vegetarian" ? "green" : "red",
                                shadowColor:
                                  item.type === "Vegetarian" ? "green" : "red",
                                justifyContent: "space-between",
                              },
                            ]}
                          >
                            <TouchableOpacity
                              onPress={() => handleRemoveItem(item)}
                            >
                              <FontAwesome
                                name="minus"
                                size={18}
                                color="#4ab557"
                              />
                            </TouchableOpacity>
                            <Text
                              key={index}
                              style={{
                                color: "#4ab557",
                                fontWeight: "bold",
                                fontSize: RFValue(14),
                              }}
                            >
                              {item.quantity}
                            </Text>

                            <TouchableOpacity
                              onPress={() =>
                                handleAddItem(cartItem, categories, item)
                              }
                            >
                              <FontAwesome
                                name="plus"
                                size={18}
                                color="#4ab557"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))
                    )
                  )}
                </View>
                <Pressable style={styles.btn} onPress={()=>clearCart()}>
                  <FontAwesome name="trash" size={22} color="white" />
                  <Text
                    style={{
                      fontSize: RFValue(20),
                      color: "white",
                      fontWeight: "bold",
                      marginHorizontal: RFValue(5),
                    }}
                  >
                    Clear Cart
                  </Text>
                </Pressable>
                <View
                  style={styles.smallContainer}
                  onTouchEnd={() => setShowRecommandation(!showRecommandation)}
                >
                  <Text
                    style={{
                      color: "green",
                      fontSize: RFValue(13),
                      fontWeight: "500",
                    }}
                  >
                    Add more items
                  </Text>
                  <FontAwesome name="cart-plus" size={18} color="green" />
                </View>
                {showRecommandation && <Reccomandation />}
                <View
                  style={[
                    styles.smallContainer,
                    { marginVertical: RFValue(2) },
                  ]}
                >
                  <Text
                    style={{
                      color: "green",
                      fontSize: RFValue(13),
                      fontWeight: "500",
                    }}
                  >
                    Add cooking requests
                  </Text>
                  <FontAwesome name="sticky-note" size={18} color="green" />
                </View>
                <Text
                  style={[
                    styles.text,
                    { marginVertical: 10, marginHorizontal: 2 },
                  ]}
                >
                  Delivery Type
                </Text>
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <View style={styles.card}>
                    <RadioButton
                      value="Dine-in"
                      status={
                        deliveryType === "Dine-in" ? "checked" : "unchecked"
                      }
                      onPress={() => setDeliveryType("Dine-in")}
                    />
                    <Text style={styles.text}>Dine-in</Text>
                  </View>
                  <View style={styles.card}>
                    <RadioButton
                      value="second"
                      status={
                        deliveryType === "Pickup" ? "checked" : "unchecked"
                      }
                      onPress={() => setDeliveryType("Pickup")}
                    />
                    <Text style={styles.text}>Pickup</Text>
                  </View>
                </View>
                <Text style={[styles.text, { marginHorizontal: 2 }]}>
                  Bill Details
                </Text>
                <View
                  style={[
                    styles.bigContainer,
                    { paddingVertical: 10, marginVertical: 10 },
                  ]}
                >
                  <View style={styles.list}>
                    <Text style={styles.info}>Item Total</Text>
                    <Text style={styles.infoText}>₹ {findPrice()}</Text>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.list}>
                    <Text style={styles.info}>Delivery Fee</Text>
                    <Text style={styles.infoText}>{deliveryType === "Dine-in" ? "₹ 0" : "₹ 5"}</Text>
                  </View>
                  <View style={styles.list}>
                    <Text style={styles.info}>Platform Fee</Text>
                    <Text style={styles.infoText}>₹ 5</Text>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.list}>
                    <Text style={[styles.info , {fontWeight:'bold',fontSize:RFValue(15)}]}>To Pay</Text>
                    <Text style={[styles.infoText,{fontWeight:'bold',fontSize:RFValue(15)}]}>
                      ₹ {findPrice() + 5 + (deliveryType === "Dine-in" ? 0 : 5)}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.emptyCartView}>
                <Text style={{ fontSize: RFValue(25), fontWeight: "bold" }}>
                  No Items in Cart
                </Text>
                <View style={styles.nav}>
                  <Nav />
                </View>
              </View>
            )}
          </NavigationContext.Provider>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginVertical: 10,
  },
  viewContainer: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
  },
  shopName: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  bigContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    marginHorizontal: 10,
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
  emptyCartView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  nav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  smallContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: RFValue(10),
    height: RFValue(40),
  },
  card: {
    width: "40%",
    height: RFValue(40),
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: RFValue(10),
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    marginVertical: 5,
    borderBottomWidth: 1,
    width: "90%",
    borderColor: "grey",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C41214",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignContent:'center'
  },
  info: {
    color: "grey",
    marginTop: 10,
    fontSize: RFValue(12),
    fontWeight:'600'
  },
  infoText:{
    fontSize:RFValue(14),
    fontWeight:'600'
  }
});
