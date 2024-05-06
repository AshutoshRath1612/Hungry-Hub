import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CartProvider, useCart } from "../CartContext";
import { NavigationContext } from "../NavContext";
import { RFValue } from "react-native-responsive-fontsize";
import { OrderStatusProvider } from "../OrderStatusContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Nav() {
  const [user, setUser] = useState("Student");
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    setUserNav();
  }, []);

  const setUserNav = async () => {
    const currentUserJson = await AsyncStorage.getItem("user");
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      setUser(currentUser.isStudent ? "Student" : "Vendor");
      if (!currentUser.isStudent) {
        setShopName(currentUser.shopName);
      }
    } else {
      // Handle the case when there is no user data in AsyncStorage
      console.log("No user data found in AsyncStorage");
    }
  };

  const { route } = useContext(NavigationContext);
  const navigation = useNavigation();

  const navigateToScreen = (screenName, data) => {
    if (data !== undefined) navigation.navigate(screenName, { shopName: data });
    else navigation.navigate(screenName);
  };
  if (user !== "Vendor") {
    const { cart } = useCart();

    return (
      <View style={styles.navContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.tab,
              route.name === "Student Home" && styles.selectedTab,
            ]}
            onPress={() => navigateToScreen("Student Home")}
          >
            <FontAwesome name="home" style={styles.tabText}></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, route.name === "History" && styles.selectedTab]}
            onPress={() => navigateToScreen("History")}
          >
            <FontAwesome name="clock-o" style={styles.tabText}></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, route.name === "Cart" && styles.selectedTab]}
            onPress={() => navigateToScreen("Cart")}
          >
            {cart.length !== 0 ? (
              <View
                style={{
                  position: "absolute",
                  left: "15%",
                  zIndex: 10,
                  top: 0,
                  padding: 5,
                  paddingHorizontal: 13,
                  backgroundColor: "red",
                  borderRadius: 50,
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(12),
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {cart[0].items.length}
                </Text>
              </View>
            ) : (
              <></>
            )}
            <FontAwesome
              name="shopping-basket"
              style={styles.tabText}
            ></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.navContainer}>
        <View style={[styles.container, { borderRadius: 0 }]}>
          <TouchableOpacity
            style={[
              styles.tab,
              route.name === "Vendor Home" && styles.selectedTab,
            ]}
            onPress={() => navigateToScreen("Vendor Home")}
          >
            <FontAwesome name="home" style={styles.tabText}></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, route.name === "Scanner" && styles.selectedTab]}
            onPress={() => navigateToScreen("Scanner")}
          >
            <MaterialCommunityIcons
              name="qrcode-scan"
              style={styles.tabText}
              size={24}
              color="#333333"
            />
          </TouchableOpacity>
          <View style={{ marginHorizontal: "5%" }}></View>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                position: "absolute",
                bottom: "30%",
                left: "35%",
                width: "20%",
              },
              route.name === "Add Food" && styles.selectedTab,
            ]}
            onPress={() => navigateToScreen("Add Food", shopName)}
          >
            <FontAwesome
              name="plus"
              size={25}
              style={[
                styles.tabText,
                {
                  backgroundColor: "#228B22",
                  padding: RFValue(12),
                  paddingHorizontal: RFValue(15),
                  borderRadius: 30,
                  zIndex: 10,
                },
              ]}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              route.name === "Vendor Menu" && styles.selectedTab,
            ]}
            onPress={() => navigateToScreen("Vendor Menu", shopName)}
          >
            <FontAwesome name="book" style={styles.tabText}></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              route.name === "Vendor History" && styles.selectedTab,
            ]}
            onPress={() => navigateToScreen("Vendor History")}
          >
            <FontAwesome name="history" style={styles.tabText}></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderRadius: 10,
    padding: 5,
  },
  tabText: {
    fontSize: 30,
  },
  selectedTab: {
    backgroundColor: "lightgray",
  },
});

export default Nav;
