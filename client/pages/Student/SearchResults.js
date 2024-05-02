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

export default function SearchResults({ route, navigation }) {
  const vegLogo = require("../../assets/icons/VegLogo.png");
  const nonVegLogo = require("../../assets/icons/NonVegLogo.png");

  const DATA = [
    {
      shopName: "Shop 1",
      ratings: 4.5,
      ratingCount: 100,
      results: [
        {
          category: 'Pizza',
          items: [
            {
              name: "Item 1",
              ratings: 4.5,
              ratingCount: 100,
              type: "Vegeterian",
              price: 100,
            },
            {
              name: "Item 2",
              ratings: 4.0,
              ratingCount: 50,
              type: "Non-Vegeterian",
              price: 200,
            },
            {
              name: "Item 3",
              ratings: 4.5,
              ratingCount: 100,
              type: "Vegeterian",
              price: 100,
            },
            {
              name: "Item 4",
              ratings: 4.0,
              ratingCount: 50,
              type: "Non-Vegeterian",
              price: 200,
            },
          ]
        },
        {
          category: 'Beverages',
          items: [
            {
              name: "Item 1",
              ratings: 4.5,
              ratingCount: 100,
              type: "Vegeterian",
              price: 100,
            },
            {
              name: "Item 2",
              ratings: 4.0,
              ratingCount: 50,
              type: "Non-Vegeterian",
              price: 200,
            },
            {
              name: "Item 3",
              ratings: 4.5,
              ratingCount: 100,
              type: "Vegeterian",
              price: 100,
            },
            {
              name: "Item 4",
              ratings: 4.0,
              ratingCount: 50,
              type: "Non-Vegeterian",
              price: 200,
            },
          ]
        }
      ],
    },
    {
      shopName: "Urban Flavours",
      ratings: 4.5,
      ratingCount: 100,
      results: [
        {
          category: 'Main Course',
          items: [
            {
              name: "Item 5",
              ratings: 4.5,
              ratingCount: 100,
              type: "Vegeterian",
              price: 100,
            },
            {
              name: "Item 6",
              ratings: 4.0,
              ratingCount: 50,
              type: "Non-Vegeterian",
              price: 200,
            },
          ]
        },
        {
          category: 'Desserts',
          items: [
            {
              name: "Item 7",
              ratings: 4.5,
              ratingCount: 100,
              type: "Vegeterian",
              price: 100,
            },
            {
              name: "Item 8",
              ratings: 4.0,
              ratingCount: 50,
              type: "Non-Vegeterian",
              price: 200,
            },
          ]
        }
      ],
    },
    {
      shopName: "dominos",
      ratings: 1,
      ratingCount: 50,
      results: [
        {
          category: 'Pizza',
          items: [
            {
              name: "Item 9",
              ratings: 4.0,
              ratingCount: 50,
              type: "Non-Vegeterian",
              price: 200,
            },
            {
              name: "Item 10",
              ratings: 4.0,
              ratingCount: 50,
              type: "Non-Vegeterian",
              price: 200,
            },
          ]
        },
        {
          category: 'Beverages',
          items: [
            {
              name: "Item 11",
              ratings: 4.0,
              ratingCount: 50,
              type: "Non-Vegeterian",
              price: 200,
            },
            {
              name: "Item 12",
              ratings: 4.0,
              ratingCount: 50,
              type: "Non-Vegeterian",
              price: 200,
            },
          ]
        }
      ],
    },
  ];

  const [totalResult, setTotalResult] = useState(0);
  const {cart} = useCart()

  useEffect(() => {
    let total = 0;
    DATA.forEach((shop) => {
      shop.results.forEach((category) => {
        total += category.items.length;
      });
    });
    setTotalResult(total);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor:'white' }}>
      <View style={styles.searchBox}>
        <Search />
      </View>
      <Text style={styles.resultText}>
        Showing results for {route.params.itemName} ({totalResult})
      </Text>
      <FlatList
      style={{marginBottom: cart.length !== 0 ? 80 : 0}}
        data={DATA}
        keyExtractor={(item, index) => item.shopName + index}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.shopListHeader}>
              <View style={styles.shopListHeaderInfo}>
                <Text style={{ fontSize: RFValue(25), fontWeight: "bold" }}>
                  {item.shopName}
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
                  <Text style={{ fontSize: RFValue(13) }}>
                    {item.ratings}
                  </Text>
                  <Text style={{ fontSize: RFValue(13) }}>
                    ({item.ratingCount}+)
                  </Text>
                </View>
              </View>
              <FontAwesome name="arrow-right" size={25} color="grey" onPress={() => navigation.navigate('Shop Menu', { item })} />
            </View>
            <FlatList
              data={item.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(category, index) => category.category + index}
              renderItem={({ item: category }) => (
                <>
                  {category.items.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.foodItems} onPress={() => console.log("Item pressed")}>
                      <View style={styles.foodItemsInfo}>
                        <Image
                          source={
                            item.type === "Vegeterian" ? vegLogo : nonVegLogo
                          }
                          style={{ width: 20, height: 20 }}
                        />
                        <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
                          {item.name}
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
                            {item.ratings}
                          </Text>
                          <Text style={{ fontSize: RFValue(13) }}>
                            ({item.ratingCount})
                          </Text>
                        </View>
                        <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
                          ₹{item.price}
                        </Text>
                      </View>
                      <View style={styles.foodItemsImage}>
                        <Image
                          source={require("../../assets/images/pizza.jpg")}
                          style={{
                            width: "100%",
                            height: "90%",
                            borderRadius: 10,
                          }}
                        />
                        <Pressable
                          style={{
                            ...styles.addbtn,
                            borderColor: item.type === "Vegeterian" ? "green" : "red",
                          }}
                          onPress={() => console.log("Add")}
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
                        </Pressable>
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            />
          </View>
        )}
      />
      {cart.length !== 0 && <CartCard />}
    </View>
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
    backgroundColor: "white",
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
    width: 150,
    alignItems: "center",
    width: RFValue(250),
    height: RFValue(150),
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
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    width: "70%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: "15%",
    elevation: 5,
    zIndex: 5,
    paddingVertical: 5
  },
});
