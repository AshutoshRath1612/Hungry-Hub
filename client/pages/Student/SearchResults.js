import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from "@expo/vector-icons";

export default function SearchResults({ route }) {
  const DATA = [
    {
      shopName: "Shop 1",
      ratings: 4.5,
      results: [
        {
          id: 1,
          name: "Item 1",
          rating: 4.5,
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
      shopName: "Shop 2",
      ratings: 4.5,
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
      ],
    },
    {
      shopName: "Shop 3",
      ratings: 1,
      results: [
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
  ];

  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    let total = 0;
    DATA.forEach((shop) => {
      total += shop.results.length;
    });
    setTotalResult(total);
  }, []);
  console.log(route);
  return (
    <View style={{ width: "100%" }}>
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
            renderItem={({ item }) => (
              <View>
                <View style={styles.shopListHeader}>
                  <Image
                    source={require("../../assets/icon.png")}
                    style={{ width: RFValue(80), height: RFValue(80) }}
                  />
                  <View style={styles.shopListHeaderInfo}>
                    <Text>{item.shopName}</Text>
                    <View>
                      <FontAwesome name="star" size={20} color="orange" />
                      <Text>{item.ratings}</Text>
                    </View>
                  </View>
                </View>
                <FlatList
                  data={item.results}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <Text style={styles.resultText}>{item.name}</Text>
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
    height:'100%'
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
    backgroundColor: "white",
    borderBottomEndRadius: 10,
    width: "90%",
  },
  shopListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  shopListHeaderInfo: {
    fontSize: 20,
  },
});
