import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import QRcode from "../../components/QRCode";

export default function OrderSummary() {
  const VegLogo = require("../../assets/VegLogo.png");
  const NonVegLogo = require("../../assets/NonVegLogo.png");
  const route = useRoute();
  const summary = route.params.item;

  const [showQR, setShowQR] = useState(false);

  const findPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
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
            <Text style={styles.shopName}>{summary.storeName}</Text>
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
            {summary.status !== "Cancelled" && summary.status !== "Delivered"
              ? `This Order is ${summary.status}`
              : `This Order was ${summary.status}`}
          </Text>
         {summary.status !== 'Cancelled' && summary.status!=='Delivered' && <View style={styles.status}>
            <View style={styles.statusinfo}>
              <View style={[styles.imgOuter,{backgroundColor: summary.status === 'Accepted' ? 'green' : ''}]}>
                <Image
                  style={[styles.statusimg, { width: "40%" }]}
                  source={require("../../assets/orderaccept.png")}
                />
              </View>
              <Text style={styles.text}>Accepted</Text>
            </View>
            <View style={[styles.line, { width: "10%" }]}></View>
            <View style={styles.statusinfo}>
              <View style={[styles.imgOuter,{backgroundColor: summary.status === 'Preparing' ? 'green' : ''}]}>
                <Image
                  style={[styles.statusimg, { width: 90 }]}
                  source={require("../../assets/orderpreparing.png")}
                />
              </View>
              <Text style={styles.text}>Preparing</Text>
            </View>
            <View style={[styles.line, { width: "10%" }]}></View>
            <View style={styles.statusinfo}>
              <View style={[styles.imgOuter,{backgroundColor: summary.status === 'Ready' ? 'green' : ''}]}>
                <Image
                  style={styles.statusimg}
                  source={require("../../assets/orderprepared.png")}
                />
              </View>
              <Text style={styles.text}>Ready</Text>
            </View>
          </View>}
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
                {summary.date} at {summary.time}
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.info}>Order Type</Text>
              <Text style={styles.text}>{summary.orderType}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.info}>Phone Number</Text>
              <Text style={styles.text}>9348183XXX</Text>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <Text style={styles.heading}>Payment Info</Text>
            <View style={styles.line}></View>
            <View style={styles.details}>
              <Text style={styles.info}>Payment</Text>
              <Text style={styles.text}>Paid: {summary.orderId}</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.info}>Transaction Id</Text>
              <Text style={styles.text}>{summary.transactionId}</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.info}>Status</Text>
              <Text style={styles.text}>{summary.paymentStatus}</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.info}>Amount</Text>
              <Text style={styles.text}>{findPrice(summary.items)}</Text>
            </View>
          </View>
        </View>
        <Pressable style={styles.btn}>
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
            <QRcode data={summary} />
            <Text style={{ fontSize: RFValue(15), fontWeight: "bold" }}>
              Scan it to get your item delivered
            </Text>
          </View>
        )}
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
    position: "relative",
    backgroundColor: "white",
    bottom: 0,
    height: "35%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    paddingVertical: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  status: {
    width: "100%",
    marginTop:RFValue(20),
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
});
