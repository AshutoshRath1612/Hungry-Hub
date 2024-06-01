import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import QRcode from "../../components/QRCode";
import { LinearGradient } from "expo-linear-gradient";
import { useCart } from "../../CartContext";
import io from 'socket.io-client';
import { Host } from "../../Constants";
import { Modal } from "react-native-paper";
import LottieView from "lottie-react-native";

export default function OrderSummary({ navigation }) {
  const VegLogo = require("../../assets/icons/VegLogo.png");
  const NonVegLogo = require("../../assets/icons/NonVegLogo.png");
  const route = useRoute();
  const summary = route.params.item;
  const socket = io(Host);

  const [showQR, setShowQR] = useState(false);
  const { cart, dispatch } = useCart();
  const [orderStatus, setOrderStatus] = useState(summary.status);
  const [modalVisible , setModalVisible] = useState(false)

  const findPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    socket.on("orderStatusUpdate", (data) => {
      console.log("Order status updated:", data);
      setOrderStatus(data.status);
      if(data.status === 'Delivered'){
        summary.status = data.status
        setModalVisible(true)
        setShowQR(false)
      }
    });

    return () => {
      socket.off("orderStatusUpdate");
    };
  }, []);

  const addToCart = (item) => {
    if (cart.length === 0) {
      dispatch({ type: "ADD_TO_CART", payload: item });
    } else {
      if (cart[0].shopName === item.shopName) {
        dispatch({ type: "ADD_TO_CART", payload: item });
      } else {
        dispatch({ type: "CLEAR_CART" });
        dispatch({ type: "ADD_TO_CART", payload: item });
      }
    }
  };

  const reOrder = () => {
    summary.items.forEach((item) => {
      addToCart({
        items: [item],
        shopName: summary.shopId.name,
        shopId: summary.shopId._id,
      });
    });
    navigation.navigate("Cart");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <LinearGradient colors={["#E0A2A2", "white"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.OrderSummaryContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.shopName}>{summary.shopId.name}</Text>
              {summary.status !== "Cancelled" &&
                summary.status !== "Delivered" && (
                  <Pressable
                    onPress={() => setShowQR(!showQR)}
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#4694D2",
                      borderRadius: 10,
                      padding: 10,
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      width: "30%",
                    }}
                  >
                    <FontAwesome name="qrcode" size={18} />
                    <Text style={{ fontSize: RFValue(13), fontWeight: "bold" }}>
                      {showQR ? "Hide QR" : "QR Code"}
                    </Text>
                  </Pressable>
                )}
            </View>
            <View style={styles.line}></View>
            <Text style={styles.info}>
              {orderStatus !== "Cancelled" && orderStatus !== "Delivered"
                ? `This Order is ${orderStatus}`
                : `This Order was ${orderStatus}`}
            </Text>
            {summary.status !== "Cancelled" &&
              summary.status !== "Delivered" && (
                <View style={styles.status}>
                  <View style={styles.statusinfo}>
                    <View
                      style={[
                        styles.imgOuter,
                        {
                          backgroundColor:
                            summary.status === "Accepted" ? "green" : "",
                        },
                      ]}
                    >
                      <Image
                        style={[styles.statusimg, { width: "40%" }]}
                        source={require("../../assets/icons/orderaccept.png")}
                      />
                    </View>
                    <Text style={styles.text}>Accepted</Text>
                  </View>
                  <View style={[styles.line, { width: "10%" }]}></View>
                  <View style={styles.statusinfo}>
                    <View
                      style={[
                        styles.imgOuter,
                        {
                          backgroundColor:
                            summary.status === "Preparing" ? "green" : "",
                        },
                      ]}
                    >
                      <Image
                        style={[styles.statusimg, { width: 90 }]}
                        source={require("../../assets/icons/orderpreparing.png")}
                      />
                    </View>
                    <Text style={styles.text}>Preparing</Text>
                  </View>
                  <View style={[styles.line, { width: "10%" }]}></View>
                  <View style={styles.statusinfo}>
                    <View
                      style={[
                        styles.imgOuter,
                        {
                          backgroundColor:
                            summary.status === "Ready" ? "green" : "",
                        },
                      ]}
                    >
                      <Image
                        style={styles.statusimg}
                        source={require("../../assets/icons/orderprepared.png")}
                      />
                    </View>
                    <Text style={styles.text}>Ready</Text>
                  </View>
                </View>
              )}
            <Text style={styles.heading}>Your Order</Text>
            <View style={styles.line}></View>
            <View style={styles.itemList}>
              {summary.items.map((item, index) => (
                <View style={styles.item} key={index}>
                  <View style={styles.itemnameinfo}>
                    <Image
                      style={styles.typeImg}
                      source={item.type === "Vegeterian" ? VegLogo : NonVegLogo}
                    />
                    <Text style={styles.itemname}>{item.name}</Text>
                  </View>
                  <View style={styles.iteminfo}>
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 2,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          borderWidth: 0.5,
                          fontWeight: "500",
                          backgroundColor: "#D3D3D3",
                          paddingVertical: 3,
                          paddingHorizontal: 5,
                          borderRadius: 2,
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          marginHorizontal: RFValue(5),
                        }}
                      >
                        {" "}
                        X{" "}
                      </Text>
                      <Text style={styles.text}>₹{item.price}</Text>
                    </View>
                    <Text style={styles.text}>
                      ₹ {item.price * item.quantity}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.line}></View>
            <View style={styles.details}>
              <Text style={[styles.text, { fontSize: 15 }]}>Item Total</Text>
              <Text style={[styles.text, { fontSize: 15 }]}>
                ₹ {findPrice(summary.items)}
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles.heading}>Order Details</Text>
              <View style={styles.line}></View>
              <View style={styles.details}>
                <Text style={styles.info}>Order ID</Text>
                <Text style={styles.text}>{summary.orderId}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.info}>Date</Text>
                <Text style={styles.text}>
                  {new Date(summary.createdDate).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {new Date(summary.createdDate).toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.info}>Order Type</Text>
                <Text style={styles.text}>{summary.orderType}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.info}>Phone Number</Text>
                <Text style={styles.text}>{summary.userId.mobileNo}</Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles.heading}>Payment Info</Text>
              <View style={styles.line}></View>
              <View style={styles.details}>
                <Text style={styles.info}>Payment</Text>
                <Text style={styles.text}>
                  {summary.paymentId.status}: {summary.orderId}
                </Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.info}>Transaction Id</Text>
                <Text style={styles.text}>{summary.paymentId.paymentId}</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.info}>Status</Text>
                <Text style={styles.text}>{summary.paymentId.status}</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.info}>Amount</Text>
                <Text style={styles.text}>{findPrice(summary.items)}</Text>
              </View>
            </View>
          </View>
          <Pressable onPress={() => reOrder()} style={styles.btn}>
            <FontAwesome name="undo" size={20} color="white" />
            <Text
              style={{
                fontSize: RFValue(20),
                color: "white",
                fontWeight: "bold",
                marginHorizontal: RFValue(5),
              }}
            >
              Reorder
            </Text>
          </Pressable>
        </ScrollView>
        {summary.status !== "Delivered" &&
          summary.status !== "Cancelled" &&
          showQR && (
            <View style={styles.qrcontainer}>
              <QRcode
                data={`${summary.orderId}|${summary.paymentId.paymentId}|${summary.paymentId.signature}`}
              />
              <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
                Scan it to get your item delivered
              </Text>
            </View>
          )}
      {
        modalVisible &&
        <Modal visible={modalVisible} onDismiss={()=> setModalVisible(false)} animationType="fade">
        <View style={styles.modalBackground}>
    
            <View style={styles.modalContent}>
              <LottieView
                source={require("../../assets/icons/DeliverSuccess.json")}
                loop
                autoPlay
                style={{ height: 200, width: 200 }}
              />
              <Text
                style={[styles.txt, { color: "black", textAlign: "center" }]}
              >
                Happy Eating...
              </Text>
            </View>
        </View>
        </Modal>
      }
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
  },
  OrderSummaryContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  line: {
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: RFValue(5),
    borderColor: "grey",
  },
  shopName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  itemList: {
    marginVertical: 5,
    width: "100%",
  },
  item: {
    alignItems: "center",
    marginBottom: 10,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  itemnameinfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  itemname: {
    fontSize: 15,
    fontWeight: "bold",
  },
  iteminfo: {
    flexDirection: "row",
    marginVertical: RFValue(5),
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  info: {
    color: "grey",
    marginTop: 10,
    fontSize: RFValue(12),
  },
  typeImg: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C41214",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  text: {
    fontSize: RFValue(12),
    fontWeight: "500",
  },
  qrcontainer: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    padding: RFValue(20),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  status: {
    width: "100%",
    marginTop: RFValue(20),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statusinfo: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  statusimg: {
    height: RFValue(90),
    width: RFValue(50),
    resizeMode: "contain",
  },
  imgOuter: {
    borderWidth: 1,
    borderRadius: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#A33C3C",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    fontSize: RFValue(22),
    fontWeight: "bold",
    margin: 10,
    color: "white",
  },
});
