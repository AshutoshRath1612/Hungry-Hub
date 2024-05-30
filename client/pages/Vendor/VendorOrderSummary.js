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
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { RadioButton } from "react-native-paper";
import Container , {Toast} from 'toastify-react-native'
import { Host, updateStatusRoute } from "../../Constants";

export default function VendorOrderSummary() {
  const VegLogo = require("../../assets/icons/VegLogo.png");
  const NonVegLogo = require("../../assets/icons/NonVegLogo.png");
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const summary = route.params.item

  const categories = ['Accepted', 'Preparing', 'Prepared']

  const handleChangeStatus = (status) =>{
    fetch(`${Host}${updateStatusRoute}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({orderId: summary.orderId , status: status})
    })
    .then(res=>res.json())
    .then(data => {
      if(data.isSuccess){
        setShowModal(false)
      }
      else{
        Toast.error(data.message)
      }
    })
  }

  const UpdateStatusModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}
    >
      <View style={styles.container}>
        <View style={styles.containerView}>
          <Text style={{ fontSize: RFValue(15), fontWeight: "500" }}>
            Update Order Status
          </Text>

          <View style={styles.btnView}>
            {summary.status !== "Cancelled" &&
              summary.status !== "Delivered" && (
                <RadioButton.Group
                onValueChange={(value) =>
                 handleChangeStatus(value)
                }
                value={summary.status}
              >
                {categories.map((category, index) => (
                  <RadioButton.Item
                    label={category}
                    value={category}
                    key={index}
                  />
                ))}
              </RadioButton.Group>
              )}
          </View>
          <Pressable
            style={[styles.btn, { marginHorizontal: "25%", width: "50%" }]}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.txt}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  const findPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
  console.log(summary.userId.name)
  return (
    <LinearGradient colors={["#C38888", "white"]} style={{ flex: 1 }}>
    <Container position='top' />
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
              <Text style={styles.shopName}>{summary.userId.name !== undefined ?  summary.userId.name : summary.userId.regdNo}</Text>
            </View>
            <View style={styles.line}></View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.info}>
                {summary.status !== "Cancelled" &&
                summary.status !== "Delivered"
                  ? `This Order is ${summary.status}...`
                  : `This Order was ${summary.status}...`}
              </Text>
              <Pressable style={styles.btn} onPress={() => setShowModal(true)}>
                <Text style={{color:"white"}}>Update Status</Text>
                <UpdateStatusModal />
              </Pressable>
            </View>
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
                <Text style={styles.info}>Order Number</Text>
                <Text style={styles.text}>{summary.orderNo}</Text>
              </View>
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
                <Text style={styles.text}>Paid: {summary.orderId}</Text>
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
                <Text style={styles.text}>₹ {findPrice(summary.items)}</Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles.heading}>Customer Details</Text>
              <View style={styles.line}></View>
              {summary.userId.name &&<View style={styles.details}>
                <Text style={styles.info}>Name</Text>
                <Text style={styles.text}>{summary.userId.name}</Text>
              </View>}
              <View style={styles.details}>
                <Text style={styles.info}>Regd No.</Text>
                <Text style={styles.text}>{summary.userId.regdNo}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.info}>Phone No.</Text>
                <Text style={styles.text}>{summary.userId.mobileNo}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
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
    height: "90%",
    marginVertical: "5%",
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
    color: "#6D2932",
    marginTop: 10,
    fontSize: RFValue(13),
    fontWeight: "bold",
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
    marginTop: RFValue(20),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statusinfo: {
    width: "30%",
    height: "40%",
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  containerView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "40%",
    justifyContent: "space-around",
  },
  btnView: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  btn: {
    width: "40%",
    marginHorizontal: "2.5%",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#915858",
  },
  txt: {
    color: "white",
    fontWeight: "bold",
    fontSize: RFValue(12),
  },
});
