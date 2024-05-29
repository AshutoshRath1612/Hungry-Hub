import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Host, getOrderByVendorRoute } from "../../Constants";
import Nav from "../../components/Nav";

export default function OrderHistory() {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${Host}${getOrderByVendorRoute}/${route.params.shopName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched Data:', data);
        setData(data);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing":
        return "orange";
      case "Cancelled":
        return "red";
      case "Delivered":
        return "green";
      default:
        return "grey";
    }
  };

  const CardItem = ({ item }) => {
    return (
      <View style={styles.CardItem}>
        <Text style={{ fontSize: RFValue(15), fontWeight: 'bold', marginVertical: 10 }}>{item.date}</Text>
        <FlatList
          data={item.orders}
          renderItem={({ item: foodItem }) => (
            <View onTouchEnd={() => navigation.navigate("Vendor Order Summary", { item: foodItem })} style={styles.itemList}>
              <Text style={styles.item}>
                Order No.: {foodItem.orderNo}
              </Text>
              <Text style={styles.item}>
                RegdNo: {foodItem.userId?.regdNo}
              </Text>
              <Text style={[styles.item, { color: getStatusColor(foodItem.status) }]}>
                {foodItem.status}
              </Text>
            </View>
          )}
          keyExtractor={(foodItem, index) => foodItem._id}
        />
      </View>
    );
  };

  return (
    <LinearGradient colors={["#C38888", "white"]} style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
        <Text style={{ fontSize: RFValue(20), fontWeight: 'bold' }}>Order History</Text>
        <View style={styles.searchBox}>
          <FontAwesome name="search" size={20} color="orange" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search Orders..."
            keyboardType="numeric"
            placeholderTextColor="gray"
            returnKeyType="search"
          />
        </View>
      </View>
      <View style={{ height: '85%', width: '95%', padding: 15 }}>
        <FlatList
          style={styles.historyContainer}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CardItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{ position: "absolute", width: "100%", bottom: 0 }}>
        <Nav />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  historyContainer: {
    flex: 1,
    width: "100%",
    marginBottom: '2%'
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 9,
    backgroundColor: "white",
    width: "40%",
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: "black",
  },
  CardItem: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingVertical: 10
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 10
  },
  item: {
    fontSize: RFValue(12)
  }
});
