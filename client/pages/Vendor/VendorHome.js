import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Nav from "../../components/Nav";
import { NavigationContext } from "../../NavContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Host, currentOrderRoute, todayOrderRoute } from "../../Constants";

export default function VendorHome({ navigation, route }) {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [currentOrders, setCurrentOrders] = useState([]);
  const [search, setSearch] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (route.params !== undefined) {
      setData();
    }
    getUser();
    setLoading(false);
  }, []);

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    setUser(JSON.parse(user));
  };

  useEffect(() => {
    if (user.shopName) {
      startInterval();
    }
    return () => clearInterval(intervalRef.current);
  }, [user]);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      getCurrentOrders();
      getTotalOrders();
    }, 1000);
  };

  const handleSearch = (text) => {
    clearInterval(intervalRef.current);
    if (text === "") {
      getCurrentOrders();
      startInterval(); // Restart the interval when search is cleared
    } else {
      const filteredOrders = currentOrders.filter((order) =>
        order.orderNo.toString().includes(text)
      );
      setCurrentOrders(filteredOrders);
    }
    setSearch(text);
  };

  const getCurrentOrders = async () => {
    fetch(`${Host}${currentOrderRoute}/${user.shopName}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentOrders(data);
      });
  };

  const getTotalOrders = async () => {
    fetch(`${Host}${todayOrderRoute}/${user.shopName}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalOrders(data.totalOrders);
        setTotalIncome(data.totalIncome);
      });
  };

  const setData = async () => {
    const { token, ...userDetails } = route.params.user;
    await AsyncStorage.setItem("user", JSON.stringify(userDetails));
    await AsyncStorage.setItem("token", JSON.stringify(token));
  };

  return (
    <NavigationContext.Provider value={{ navigation, route }}>
      <View style={{ height: "100%" }}>
        {Loading ? (
          <View style={styles.center}>
            <LottieView
              source={require("../../assets/icons/Loading.json")}
              autoPlay
              loop
              style={{ width: 200, height: 200 }}
            />
          </View>
        ) : (
          <LinearGradient
            colors={["#C38888", "white"]}
            style={{ height: "100%", justifyContent: "center" }}
          >
            <Header />
            <Text
              style={{
                fontSize: RFValue(25),
                textAlign: "center",
                fontWeight: "bold",
                marginVertical: 20,
              }}
            >
              {user.shopName}
            </Text>
            <View style={styles.top}>
              <Text
                style={{
                  fontSize: RFValue(15),
                  fontWeight: "500",
                  marginHorizontal: 20,
                }}
              >
                Today:{" "}
                {new Date().toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <View style={styles.infoCard}>
                  <Ionicons name="fast-food" size={24} color="white" />
                  <Text style={{ fontSize: RFValue(20), color: "white" }}>
                    {totalOrders}
                  </Text>
                </View>
                <View style={styles.infoCard}>
                  <FontAwesome name="rupee" size={24} color="white" />
                  <Text style={{ fontSize: RFValue(20), color: "white" }}>
                    {totalIncome}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ borderBottomWidth: 1, height: 20 }}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: RFValue(18), fontWeight: "500" }}>
                Current Orders
              </Text>
              <View style={styles.searchBox}>
                <FontAwesome
                  name="search"
                  size={20}
                  color="orange"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Search Orders..."
                  keyboardType="numeric"
                  placeholderTextColor="gray"
                  returnKeyType="search"
                  value={search}
                  onChangeText={handleSearch}
                />
              </View>
            </View>
            <View
              style={{
                height: "49%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 1,
                marginTop: RFValue(20),
                width: "100%",
              }}
            >
              {currentOrders.length > 0 ? (
                <FlatList
                  data={currentOrders}
                  style={{ marginBottom: "2%",flex:1,width:'100%' }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2} // Display two columns
                  contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
                  renderItem={({ item }) => (
                    <LinearGradient colors={item.status === 'Pending' ? ["red","white"] : item.status === 'Accepted' ? ["#FFA500", "#FFD700"] : item.status === 'Prepared' ? ["#00FF00", "#32CD32"] : ["#FF0000", "#FF6347"]}
                      onTouchEnd={() => navigation.navigate("Vendor Order Summary", { item: item })}
                      style={styles.ordercard}
                    >
                      <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>
                        No. {item.orderNo}
                      </Text>
                      {item.userId.name !== undefined ? (
                        <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>
                          Name: {item.userId.name}
                        </Text>
                      ) : (
                        <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>
                          RegdNo: {item.userId.regdNo}
                        </Text>
                      )}
                    </LinearGradient>
                  )}
                />
              ) : (
                <Text style={{ fontSize: RFValue(20) }}>No current orders</Text>
              )}
            </View>
            <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
              <Nav />
            </View>
          </LinearGradient>
        )}
      </View>
    </NavigationContext.Provider>
  );
}

const styles = StyleSheet.create({
  top: {
    justifyContent: "space-between",
  },
  infoCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#915858",
    elevation: 5,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
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
    width: "50%",
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
  ordercard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginHorizontal:'5%',
    height: 100,
    width: "40%",
    alignItems: "flex-start",
    justifyContent: "space-around",
    elevation:5
  },
});