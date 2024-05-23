import {
  View,
  StyleSheet,
  Animated,
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
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient colors={["#C38888","white"]} style={styles.container}>
      <NavigationContext.Provider value={{ navigation, route }}>
        <Animated.View style={styles.top}>
          <Header />
          <Search />
        </Animated.View>
        <View style={styles.bottom}>
          <Reccomandation />
          <CurrentOrder />
          <ShopList />
        </View>

        <View style={styles.nav}>
          <Nav />
        </View>
      </NavigationContext.Provider>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  top: {
    height: "20%",
    justifyContent: "space-evenly",
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