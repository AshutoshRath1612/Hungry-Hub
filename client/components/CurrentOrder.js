import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useOrderStatus } from "../OrderStatusContext";
import { GetOrderByUserRoute, Host } from "../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CurrentOrder() {
  const navigation = useNavigation();
  const { currentOrder } = useOrderStatus();
  const [currentOrders, setCurrentOrders] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { dispatch } = useOrderStatus();

  const accepticon = require("../assets/icons/acceptedicon.json");
  const preparingicon = require("../assets/icons/preparingicon.json");
  const readyicon = require("../assets/icons/readyicon.json");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const userObj = JSON.parse(user);
        const id = userObj._id;

        const response = await fetch(`${Host}${GetOrderByUserRoute}/${id}`);
        const data = await response.json();

        setCurrentOrders(data);
        checkCurrentOrderStatus(data);
        dispatch({ type: "ORDERS", payload: data });
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrder();
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, [currentOrder]);

  const checkCurrentOrderStatus = (orders) => {
    if (!orders) return;
    const filteredOrders = orders.filter((order) =>
      ["Pending", "Accepted", "Prepared", "Preparing"].includes(order.status)
    );
    setCurrentOrders(filteredOrders);
  };

  useEffect(() => {
    if (currentOrders && currentOrders.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % currentOrders.length;
        setCurrentIndex(nextIndex);

        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            animated: true,
            index: nextIndex,
          });
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentIndex, currentOrders]);

  const CustomScrollIndicator = ({ itemCount, currentIndex }) => {
    const dots = Array.from({ length: itemCount }, (_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          { backgroundColor: index === currentIndex ? "blue" : "gray" },
        ]}
      />
    ));

    return <View style={styles.scrollIndicator}>{dots}</View>;
  };

  const CardItem = ({ item, index }) => {
    return (
      <View
        onTouchEnd={() => navigation.navigate("Order Summary", { item })}
        style={styles.ordercard}
      >
        <LottieView
          source={
            item.status === "Ready"
              ? readyicon
              : item.status === "Accepted"
              ? accepticon
              : preparingicon
          }
          autoPlay
          loop
          speed={1.5}
          style={{ width: RFValue(80), height: RFValue(80) }}
        />
        <View style={styles.ordercarditem}>
          <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>
            Your Food is {item.status}
          </Text>
          <Text style={{ fontSize: RFValue(13), fontWeight: "500" }}>
            {item.shopId.name}
          </Text>
        </View>
      </View>
    );
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.y / layoutMeasurement.height);
    setCurrentIndex(currentIndex);
  };

  return (
    <>
      {currentOrders && currentOrders.length > 0 ? (
        <View style={{ height: "22%" }}>
        <FlatList
          ref={flatListRef}
          data={currentOrders}
          renderItem={({ item, index }) => <CardItem item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          initialScrollIndex={currentIndex}
          getItemLayout={(data, index) => ({
            length: RFValue(110), // height of each card (adjust if necessary)
            offset: RFValue(110) * index, // height of each card * index
            index,
          })}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />
        </View>
      ) : (
        <Text style={styles.noOrdersText}>No current orders</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  ordercard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    height: RFValue(90),
    alignItems: "center",
    justifyContent: "space-around",
  },
  ordercarditem: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  scrollIndicator: {
    marginHorizontal: 10,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginVertical: 2,
  },
  noOrdersText: {
    fontSize: RFValue(16),
    textAlign: "center",
    marginTop: RFValue(20),
  },
});
