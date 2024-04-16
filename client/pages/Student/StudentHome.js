import {
  View,
  StyleSheet,
} from "react-native";
import React from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Reccomandation from "../../components/Reccomandation";
import ShopList from "../../components/ShopList";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationContext } from "../../NavContext";

export default function StudentHome() {

  const route = useRoute();
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
