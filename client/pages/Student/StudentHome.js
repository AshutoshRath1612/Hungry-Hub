import {
  View,
  StyleSheet,
  StatusBar,
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
    await AsyncStorage.setItem('user' , JSON.stringify(userDetails))
    await AsyncStorage.setItem('token' , JSON.stringify(token))
  }

  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#C38888","white"]} style={styles.container}>
    <StatusBar backgroundColor='#C38888'  barStyle='dark-content' showHideTransition='fade' />
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  top: {
    height: "18%",
    justifyContent: "space-around",
  },
  bottom: {
    height: "74%",
    paddingVertical: 10,
  },
  nav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});