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

export default function SearchResults({ route,navigation }) {
  const vegLogo = require("../../assets/VegLogo.png");
  const nonVegLogo = require("../../assets/NonVegLogo.png");

  const DATA = [
    {
      shopName: "Shop 1",
      ratings: 4.5,
      ratingCount: 100,
      results: [
        {
          id: 1,
          name: "Item 1",
          rating: 4.5,
          ratingCount: 100,
          ratingCount: 100,
          type: "Vegeterian",
          price: 100,
        },
        {
          id: 2,
          name: "Item 2",
          rating: 4.0,
          ratingCount: 50,
          type: "Non-Vegeterian",
          price: 200,
        },
        {
          id: 3,
          name: "Item 3",
          rating: 4.5,
          ratingCount: 100,
          type: "Vegeterian",
          price: 100,
        },
        {
          id: 4,
          name: "Item 4",
          rating: 4.0,
          ratingCount: 50,
          type: "Non-Vegeterian",
          price: 200,
        },
      ],
    },
    {
      shopName: "Urban Flavours",
      ratings: 4.5,
      ratingCount: 100,
      results: [
        {
          id: 5,
          name: "Item 5",
          rating: 4.5,
          ratingCount: 100,
          type: "Vegeterian",
          price: 100,
        },
        {
          id: 6,
          name: "Item 6",
          rating: 4.0,
          ratingCount: 50,
          type: "Non-Vegeterian",
          price: 200,
        },
        {
          id: 7,
          name: "Item 7",
          rating: 4.5,
          ratingCount: 100,
          type: "Vegeterian",
          price: 100,
        },
        {
          id: 8,
          name: "Item 8",
          rating: 4.0,
          ratingCount: 50,
          type: "Non-Vegeterian",
          price: 200,
        },
      ],
    },
    {
      shopName: "Keventerszzzz Shop 3 and dominos",
      ratings: 1,
      ratingCount: 50,
      results: [
        {
          id: 9,
          name: "Item 9",
          rating: 4.0,
          ratingCount: 50,
          type: "Non-Vegeterian",
          price: 200,
        },
        {
          id: 10,
          name: "Item 10",
          rating: 4.0,
          ratingCount: 50,
          type: "Non-Vegeterian",
          price: 200,
        },
        {
          id: 11,
          name: "Item 11",
          rating: 4.0,
          ratingCount: 50,
          type: "Non-Vegeterian",
          price: 200,
        },
        {
          id: 12,
          name: "Item 12",
          rating: 4.0,
          ratingCount: 50,
          type: "Non-Vegeterian",
          price: 200,
        },
      ],
    },
  ];

  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    let total = 0;
    DATA.forEach((shop) => {
      total += shop.results.length;
    });
    setTotalResult(total);
  }, []);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.searchBox}>
        <Search />
      </View>
      <Text style={styles.resultText}>
        Showing results for {route.params.itemName} ({totalResult})
      </Text>
      <View style={styles.container}>
        <View style={styles.shopList}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.shopName}
            showsVerticalScrollIndicator={false}
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
                  <FontAwesome name="arrow-right" size={25} color="grey" onPress={()=> navigation.navigate('Shop Menu',{item})} />
                </View>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={item.results}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.foodItems}>
                      <View style={styles.foodItemsInfo}>
                        <Image
                          source={
                            item.type === "Vegeterian" ? vegLogo : nonVegLogo
                          }
                          style={{ width: 20, height: 20 }}
                        />
                        <Text
                          style={{ fontSize: RFValue(15), fontWeight: "bold" }}
                        >
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
                            {item.rating}
                          </Text>
                          <Text style={{ fontSize: RFValue(13) }}>
                            ({item.ratingCount})
                          </Text>
                        </View>
                        <Text
                          style={{ fontSize: RFValue(15), fontWeight: "bold" }}
                        >
                          ₹{item.price}
                        </Text>
                      </View>

                      <View style={styles.foodItemsImage}>
                        <Image
                          source={require("../../assets/pizza.jpg")}
                          style={{
                            width: "100%",
                            height: "90%",
                            borderRadius: 10,
                          }}
                        />
                        <Pressable
                          style={{
                            ...styles.addbtn,
                            borderColor:
                              item.type === "Vegeterian" ? "green" : "red",
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
                    </View>
                  )}
                />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
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
  shopList: {
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    borderBottomEndRadius: 10,
    width: "100%",
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
    paddingVertical:5
  },
});
