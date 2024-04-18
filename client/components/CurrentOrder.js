import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";

export default function CurrentOrder() {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const data = [
      {
        _id: 1,
        storeName: "Store Name 1",
        orderId: "Order Name 1",
        items: [
          {
            name: "Item Name 1",
            quantity: 1,
            ratings: 5.0,
            ratingCount: 600,
            price: 10,
            type: "Vegeterian",
            category: "Snacks",
          },
          {
            name: "Item Name 2",
            quantity: 2,
            ratings: 5.0,
            ratingCount: 600,
            price: 100,
            type: "Non-Vegeterian",

            category: "Beverages",
          },
          {
            name: "Item Name 3",
            quantity: 3,
            ratings: 5.0,
            ratingCount: 600,
            price: 10,
            type: "Non-Vegeterian",
            category: "Main Course",
          },
          {
            name: "Item Name 4",
            quantity: 4,
            ratings: 5.0,
            ratingCount: 600,
            price: 100,
            type: "Vegeterian",
            category: "Pizza",
          },
        ],
        date: new Date().toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: "Preparing",
        time: new Date().toLocaleTimeString(),
        orderType: "Dine in",
        transactionId: "AZHDGYW52S",
        paymentStatus: "Success",
      },
    ];
    setCurrentOrders(data);
    checkCurrentOrderStatus();
  }, []);

  const checkCurrentOrderStatus = () => {
    setInterval(() => {
      const data = [
        {
          _id: 5,
          storeName: "Store Name 5",
          orderId: "Order id 5",
          items: [
            {
              name: "Item Name 1",
              quantity: 1,
              ratings: 5.0,
              ratingCount: 600,
              price: 10,
              type: "Vegeterian",
              category: "Snacks",
            },
            {
              name: "Item Name 2",
              quantity: 2,
              ratings: 5.0,
              ratingCount: 600,
              price: 100,
              type: "Non-Vegeterian",

              category: "Beverages",
            },
            {
              name: "Item Name 3",
              quantity: 3,
              ratings: 5.0,
              ratingCount: 600,
              price: 10,
              type: "Non-Vegeterian",
              category: "Main Course",
            },
            {
              name: "Item Name 4",
              quantity: 4,
              ratings: 5.0,
              ratingCount: 600,
              price: 100,
              type: "Vegeterian",
              category: "Pizza",
            },
          ],
          date: new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          status: "Accepted",
          time: new Date().toLocaleTimeString(),
          orderType: "Dine in",
          transactionId: "AZHDGYW52S",
          paymentStatus: "Success",
        },
        {
          _id: 1,
          storeName: "Store Name 1",
          orderId: "Order Name 1",
          items: [
            {
              name: "Item Name 1",
              quantity: 1,
              ratings: 5.0,
              ratingCount: 600,
              price: 10,
              type: "Vegeterian",
              category: "Snacks",
            },
            {
              name: "Item Name 2",
              quantity: 2,
              ratings: 5.0,
              ratingCount: 600,
              price: 100,
              type: "Non-Vegeterian",

              category: "Beverages",
            },
            {
              name: "Item Name 3",
              quantity: 3,
              ratings: 5.0,
              ratingCount: 600,
              price: 10,
              type: "Non-Vegeterian",
              category: "Main Course",
            },
            {
              name: "Item Name 4",
              quantity: 4,
              ratings: 5.0,
              ratingCount: 600,
              price: 100,
              type: "Vegeterian",
              category: "Pizza",
            },
          ],
          date: new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          status: "Preparing",
          time: new Date().toLocaleTimeString(),
          orderType: "Dine in",
          transactionId: "AZHDGYW52S",
          paymentStatus: "Success",
        },
      ];
      setCurrentOrders(data);
      console.log(data);
    }, 60 * 1000);
  };

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
      <View style={styles.ordercard}>
        <Image
          style={{ height: "40%", width: "40%", resizeMode: "contain" }}
          source={require("../assets/Plate.png")}
        />
        <View style={styles.ordercarditem}>
          <Text>Your Food is {item.status}</Text>
          <Text>{item.storeName}</Text>
        </View>
        <CustomScrollIndicator
          itemCount={currentOrders.length}
          currentIndex={index}
        />
      </View>
    );
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.y / layoutMeasurement.height);
    setCurrentIndex(currentIndex);
  };

  return (
    <View style={{ height: "20%" }}>
      <FlatList
        data={currentOrders}
        renderItem={({ item, index }) => <CardItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
    justifyContent: "center",
  },
  ordercarditem: {},
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
