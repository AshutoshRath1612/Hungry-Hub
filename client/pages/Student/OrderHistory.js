import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { NavigationContext } from "../../NavContext";
import { RFValue } from "react-native-responsive-fontsize";
import { OrderStatusProvider, useOrderStatus } from "../../OrderStatusContext";
import { LinearGradient } from "expo-linear-gradient";
import { GetOrderByUserRoute, Host, ratingRoute } from "../../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { FontAwesome } from "@expo/vector-icons";
import Container  , {Toast} from 'toastify-react-native'
import { StatusBar } from "react-native";

export default function OrderHistory() {
  const VegLogo = require("../../assets/icons/VegLogo.png");
  const NonVegLogo = require("../../assets/icons/NonVegLogo.png");
  
  const navigation = useNavigation();
  const route = useRoute();
  const { dispatch } = useOrderStatus();
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    
    getUserAndFetchOrders();
  }, [dispatch, route]);

  useFocusEffect(
    useCallback(() => {
      getUserAndFetchOrders();
    }, [])
  );
  
  const getUserAndFetchOrders = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const userObj = JSON.parse(user);
        const id = userObj._id;

        const response = await fetch(`${Host}${GetOrderByUserRoute}/${id}`);
        const data = await response.json();

        setOrders(data);
        dispatch({ type: 'ORDERS', payload: data });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  
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

  const showOrderDetails = (item) => {
    navigation.navigate("Order Summary", { item:item });
  };

  
  const CardItem = ({ item }) => {
    const [rating, setRating] = useState(0);
    const findPrice = (items) => {
      let price = 0;
      items.forEach((item) => {
        price += item.price * item.quantity;
      });
      return price;
    };
    
    const handleRating = (item , value) => {
      setRating(value);
      console.log(item)
      fetch(`${Host}${ratingRoute}` , {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id : item._id , foods: item.items , shopId: item.shopId , ratings: value})
      })
      .then(res=> res.json())
      .then(data => {
        if(data.isSuccess){
          Toast.success(data.message)
          getUserAndFetchOrders();
        }
      })
    }
    
    const Rating = ({ value, onChange }) => {
      const stars = [1, 2, 3, 4, 5];
    
      return (
        <View style={{ flexDirection: "row", marginTop: 5, justifyContent:'space-around',width:'40%' }}>
          {stars.map((star) => (
            <Pressable key={star} onPress={() => onChange(star)}>
              <FontAwesome
                name={value >= star ? "star" : value >= (star - 0.5) ? "star-half-o" : "star-o"}
                size={20}
                color="#FFD700"
              />
            </Pressable>
          ))}
        </View>
      );
    };
    

    return (
      <LinearGradient colors={["#C0A2A2", "white"]} style={styles.items}>
      <StatusBar backgroundColor='white'  barStyle='dark-content' showHideTransition='fade' />
        <Pressable
          onPress={() => {
            showOrderDetails(item);
          }}
        >
          <View style={styles.itemHeader}>
            <Image
              style={{ height: RFValue(50), width: RFValue(50) }}
              resizeMode="contain"
              source={require("../../assets/images/Logo.png")}
            />
            <View>
              <Text style={styles.storename}>{item.shopId.name}</Text>
            </View>
            <Text
              style={[
                styles.status,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            >
              {item.status}
            </Text>
          </View>
          <FlatList
            data={item.items}
            style={styles.itemList}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image
                  style={{ height: RFValue(15), width: RFValue(15) }}
                  resizeMode="contain"
                  source={item.orderType === "Vegeterian" ? VegLogo : NonVegLogo}
                />
                <View style={{justifyContent:'space-around',flexDirection:'row' , width:'20%'}}>

                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: RFValue(12),
                    color: "grey",
                  }}
                >
                  {item.quantity}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: RFValue(12),
                    color: "grey",
                  }}
                >
                  x
                </Text>
                </View>
                <View style={{flexDirection:'row' , width:'60%'}}>

                <Text style={{ fontWeight: "bold", fontSize: RFValue(12) }}>
                  {item.name}
                </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <View
            style={[
              styles.item,
              {
                width: "100%",
                justifyContent: "space-between",
                paddingHorizontal: 5,
              },
            ]}
          >
            <Text style={{ color: "grey", fontWeight: 500 }}>
              {new Date(item.createdDate).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {new Date(item.createdDate).toLocaleTimeString()}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              ₹ {findPrice(item.items)}
            </Text>
          </View>
          <View style={{ marginTop: 10, flexDirection:"row",justifyContent:'space-between',alignItems:'center' }}>
          <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
            Rate this order:
          </Text>
          <Rating value={rating == 0 && item.rating !== null ? item.ratings : rating} onChange={(value) => handleRating(item,value)} />
        </View>
        </Pressable>
      </LinearGradient>
    );
  };

  return (
    <>
      {isLoading ? (
        <LottieView
          source={require("../../assets/icons/Loading.json")}
          autoPlay
          loop
          style={{ flex: 1 }}
        />
       ) : (
    <OrderStatusProvider>
    <Container position='top' width='90%' />
          <View style={styles.container}>
            <NavigationContext.Provider value={{ navigation, route }}>
              {orders && orders.length> 0 ? <FlatList
                style={styles.historyContainer}
                data={orders}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <CardItem item={item} />}
                keyExtractor={(item) => item._id.toString()}
              />
              : 
              <LottieView source={require('../../assets/icons/NoOrder.json')} autoPlay loop style={{width:RFValue(200),height:RFValue(200),marginBottom:RFValue(20)}} />
              }
              <View style={styles.nav}>
                <Nav navigation={navigation} currentRoute={route.name} />
              </View>
            </NavigationContext.Provider>
          </View>
    </OrderStatusProvider>
        )
      }
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  items: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: "#E0A2A2",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  item: {
    paddingVertical: 5,
    flexDirection: "row",
    fontWeight: "bold",
    fontSize: RFValue(15),
    alignItems: "center",
    justifyContent: "space-around",
    width: "60%",
  },
  itemList: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  historyContainer: {
    flex: 1,
    width: "100%",
    marginBottom: RFValue(55), // Add padding to prevent overlap with navigation bar
  },
  storename: {
    fontSize: RFValue(15),
    fontWeight: "bold",
  },
  status: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    padding: 5,
    borderRadius: 5,
    color: "white",
  },
  nav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
