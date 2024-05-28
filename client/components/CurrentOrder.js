import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useOrderStatus } from "../OrderStatusContext";

export default function CurrentOrder() {
  const navigation = useNavigation();
  const { currentOrder } = useOrderStatus();
  const [currentOrders, setCurrentOrders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);


  const accepticon = require("../assets/icons/acceptedicon.json");
  const preparingicon = require("../assets/icons/preparingicon.json");
  const readyicon = require("../assets/icons/readyicon.json");

  
  useEffect(() => {
    const checkCurrentOrderStatus = () => {
      const filteredOrders = currentOrder.filter((order) =>
        ["Pending", "Accepted", "Baking", "Baked"].includes(order.status)
      );
      setCurrentOrders(filteredOrders);
    };

    checkCurrentOrderStatus();
  }, [currentOrder]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the index of the next item in a cycle
      const nextIndex = (currentIndex + 1) % currentOrders.length;
      setCurrentIndex(nextIndex);

      if (isNaN(nextIndex)) {
        setCurrentIndex(0);
        return;
      }

      // Scroll to the next item
      flatListRef.current.scrollToIndex({
        animated: true,
        index: nextIndex,
      });
    }, 5000); // Change the interval time (in milliseconds) as needed

    return () => clearInterval(interval);
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
        onTouchEnd={() => navigation.navigate('Order Summary', { item: item })}
        style={styles.ordercard}
      >
        <LottieView
          source={item.status === 'Ready' ? readyicon : item.status === 'Accepted' ? accepticon : preparingicon}
          autoPlay
          loop
          speed={1.5}
          style={{ width: RFValue(80), height: RFValue(80) }}
        />
        <View style={styles.ordercarditem}>
          <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>Your Food is {item.status}</Text>
          <Text style={{ fontSize: RFValue(13), fontWeight: '500' }}>{item.shopId.name}</Text>
        </View>
        <CustomScrollIndicator
          itemCount={currentOrders.length}
          currentIndex={index}
        />
      </View>
    );
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.y / layoutMeasurement.height);
    setCurrentIndex(currentIndex);
  };

  return (
    <View style={{ height: "20%" }}>
      <FlatList
        ref={flatListRef}
        data={currentOrders}
        renderItem={({ item, index }) => <CardItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        initialScrollIndex={currentIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ordercard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    height: 100,
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
});
