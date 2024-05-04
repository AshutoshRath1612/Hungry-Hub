import {
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Reccomandation from "../../components/Reccomandation";
import ShopList from "../../components/ShopList";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationContext } from "../../NavContext";
import CurrentOrder from "../../components/CurrentOrder";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StudentHome() {
  const route = useRoute();
  useEffect(()=>{
    if(route.params !== undefined)
    setData()
  },[])

  const setData = async() => {
    const {token,...userDetails} = route.params.user
    console.log(userDetails)
    await AsyncStorage.setItem('user' , JSON.stringify(userDetails))
    await AsyncStorage.setItem('token' , JSON.stringify(token))
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <NavigationContext.Provider value={{ navigation, route }}>
        <View style={styles.top}>
          <Header />
          <Search />
        </View>
        <View style={styles.bottom}>
          <Reccomandation />
          <CurrentOrder />
          <ShopList />
        </View>

        <View style={styles.nav}>
          <Nav />
        </View>
      </NavigationContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // justifyContent: "space-between",
    // backgroundColor:'#001d07'
  },
  top: {
    height: "20%",
    justifyContent: "space-between",
  },
  bottom: {
    height: "73%",
    paddingVertical: 10,
  },
  nav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
