import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Nav from "../../components/Nav";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Reccomandation from "../../components/Reccomandation";
import ShopList from "../../components/ShopList";

export default function StudentHome() {
  return (
    
    <View
      style={styles.container}
    >
    <View style={styles.top}>

      <Header />
      <Search />
      <Reccomandation />
    </View>
      <ShopList />
      <Nav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
    // backgroundColor:'#001d07'
  },
  top:{
    height:'50%',
    justifyContent:'space-around',
  }
});
